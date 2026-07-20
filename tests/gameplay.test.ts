import assert from "node:assert/strict";
import test from "node:test";
import { events, testSequence } from "../data/gameContent.ts";
import { createGame, reduceGame, validateGameState } from "../engine/game.ts";
import { generatePopulation } from "../engine/genetics.ts";
import { importSave } from "../lib/save.ts";

test("the same cross and run seed produce the same population", () => {
  const first = generatePopulation("KEEP-TEST-001", "electric-mango", "cathedral-haze", "aroma", 12);
  const replay = generatePopulation("KEEP-TEST-001", "electric-mango", "cathedral-haze", "aroma", 12);
  assert.deepEqual(first, replay);
  assert.equal(first.length, 12);
  assert.equal(new Set(first.map((plant) => plant.id)).size, 12);
});

test("F2 populations segregate differently from F1 populations", () => {
  const first = generatePopulation("KEEP-SEGREGATE", "violet-static", "roadkill-wizard", "novelty", 12, "F1");
  const second = generatePopulation("KEEP-SEGREGATE", "violet-static", "roadkill-wizard", "novelty", 12, "F2");
  assert.notDeepEqual(first.map((plant) => plant.traits), second.map((plant) => plant.traits));
  const spread = (values: number[]) => Math.max(...values) - Math.min(...values);
  const f1Spread = spread(first.map((plant) => plant.traits.color));
  const f2Spread = spread(second.map((plant) => plant.traits.color));
  assert.ok(f2Spread >= f1Spread * 0.75, "F2 color segregation should remain meaningfully broad");
});

test("a complete Quick Hunt can reach a named next generation", () => {
  let state = createGame("electric-mango", "cathedral-haze", "aroma", "KEEP-FULL-LOOP");
  state = reduceGame(state, { type:"CULL", plantId:"P-01" });
  state = reduceGame(state, { type:"ADVANCE" });
  assert.equal(state.phase, "vegetative");
  state = reduceGame(state, { type:"CLONE", plantId:"P-02" });
  assert.equal(state.plants.find((plant) => plant.id === "P-02")?.cloned, true);
  state = reduceGame(state, { type:"ADVANCE" });
  assert.equal(state.phase, "flower");

  state = reduceGame(state, { type:"ADVANCE" });
  assert.equal(state.week, 2);
  assert.ok(state.activeEventId);
  const event = events.find((item) => item.id === state.activeEventId)!;
  state = reduceGame(state, { type:"RESOLVE_EVENT", eventId:event.id, choiceId:event.choices[0].id });
  assert.equal(state.activeEventId, null);
  while (state.phase === "flower") state = reduceGame(state, { type:"ADVANCE" });
  assert.equal(state.phase, "harvest");

  state = reduceGame(state, { type:"CHOOSE_HARVEST", choice:"balanced" });
  state = reduceGame(state, { type:"CHOOSE_CURE", choice:"slow" });
  assert.equal(state.phase, "testing");
  for (let index = 0; index < testSequence.length; index += 1) state = reduceGame(state, { type:"RUN_TEST" });
  assert.equal(state.phase, "keeper");
  state = reduceGame(state, { type:"SELECT_KEEPER", plantId:"P-02" });
  state = reduceGame(state, { type:"NAME_KEEPER", name:"Voltage Cathedral" });
  state = reduceGame(state, { type:"COMPLETE_LINE", method:"F2" });

  assert.equal(state.phase, "complete");
  assert.equal(state.generation, 2);
  assert.equal(state.nextGenerationMethod, "F2");
  assert.equal(state.hallOfFame[0]?.name, "Voltage Cathedral");
  assert.ok(state.achievements.includes("First Keeper"));
  assert.ok(validateGameState(state));
});

test("failure guards prevent impossible progression and the last cull", () => {
  let state = createGame("lunar-glue", "temple-fuel", "resin", "KEEP-GUARDS");
  const blocked = reduceGame(state, { type:"ADVANCE" });
  assert.equal(blocked.phase, "seedling");
  assert.match(blocked.notice, /Cull at least one/);
  for (const plant of state.plants.slice(0, -1)) state = reduceGame(state, { type:"CULL", plantId:plant.id });
  const survivor = state.plants.find((plant) => plant.status === "active")!;
  state = reduceGame(state, { type:"CULL", plantId:survivor.id });
  assert.equal(state.plants.filter((plant) => plant.status === "active").length, 1);
  assert.match(state.notice, /last active plant cannot be culled/i);
});

test("invalid save shapes are rejected", () => {
  assert.equal(validateGameState(null), false);
  assert.equal(validateGameState({ schemaVersion:1, runSeed:"x", plants:[] }), false);
  assert.equal(validateGameState(createGame("blue-funeral", "tangerine-machine", "color", "KEEP-SAVE")), true);
  assert.throws(() => importSave("not-json"), /not valid JSON/);
  assert.throws(() => importSave(JSON.stringify({ schemaVersion:99, plants:[] })), /corrupted|unsupported/);
});

test("resource, repeat-action, and keeper-name failures recover safely", () => {
  let state = createGame("plasma-peach", "cedar-signal", "balanced", "KEEP-FAILURE-MATRIX");
  state = reduceGame(state, { type:"CULL", plantId:"P-01" });
  state = reduceGame(state, { type:"ADVANCE" });
  state = { ...state, resources:{ ...state.resources, funds:0 } };
  state = reduceGame(state, { type:"CLONE", plantId:"P-02" });
  assert.equal(state.plants.find((plant) => plant.id === "P-02")?.cloned, false);
  assert.match(state.notice, /funds are too low/i);

  const afterFirstCull = state.plants.filter((plant) => plant.status === "culled").length;
  state = reduceGame(state, { type:"CULL", plantId:"P-01" });
  assert.equal(state.plants.filter((plant) => plant.status === "culled").length, afterFirstCull);

  state = { ...state, phase:"keeper", testsCompleted:[...testSequence], resources:{...state.resources,funds:200} };
  state = reduceGame(state, { type:"SELECT_KEEPER", plantId:"P-02" });
  state = reduceGame(state, { type:"COMPLETE_LINE", method:"Backcross" });
  assert.equal(state.phase, "keeper");
  assert.match(state.notice, /needs a name/i);
  state = reduceGame(state, { type:"NAME_KEEPER", name:"X".repeat(200) });
  assert.equal(state.keeperName.length, 48);
  state = reduceGame(state, { type:"COMPLETE_LINE", method:"Backcross" });
  assert.equal(state.phase, "complete");
});
