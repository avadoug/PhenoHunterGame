import { events, goals, testSequence } from "@/data/gameContent";
import { getParent } from "@/data/parents";
import { generatePopulation } from "@/engine/genetics";
import { clamp, hashSeed } from "@/engine/random";
import type { GameState, GoalId, HallOfFameEntry, Plant, TraitKey } from "@/types/game";

const now = () => new Date().toISOString();

export function randomRunSeed(): string {
  const left = Date.now().toString(36).slice(-5).toUpperCase();
  const right = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KEEP-${left}-${right}`;
}

export function createGame(femaleParentId: string, pollenParentId: string, goalId: GoalId, runSeed: string, hallOfFame: HallOfFameEntry[] = []): GameState {
  const cleanSeed = runSeed.trim().slice(0, 40) || randomRunSeed();
  const plants = generatePopulation(cleanSeed, femaleParentId, pollenParentId, goalId, 12);
  return {
    schemaVersion: 1,
    phase: "seedling",
    generation: 1,
    week: 0,
    runSeed: cleanSeed,
    femaleParentId,
    pollenParentId,
    goalId,
    plants,
    selectedPlantId: plants[0]?.id ?? "",
    compareIds: [],
    resources: { funds: 2400, research: 5, reputation: 0, cloneCapacity: 3 },
    testsCompleted: [],
    activeEventId: null,
    resolvedEvents: [],
    harvestChoice: null,
    cureChoice: null,
    keeperId: null,
    keeperName: "",
    nextGenerationMethod: null,
    achievements: [],
    hallOfFame,
    lastCulledId: null,
    actionLog: [`Cross initiated: ${getParent(femaleParentId).name} × ${getParent(pollenParentId).name}.`, `Run seed ${cleanSeed} locked.`],
    notice: "Twelve seeds broke the surface. Early vigor is visible; the traits that make a keeper are not.",
    startedAt: now(),
    updatedAt: now(),
  };
}

export type GameAction =
  | { type:"SELECT_PLANT"; plantId:string }
  | { type:"TOGGLE_COMPARE"; plantId:string }
  | { type:"TOGGLE_TAG"; plantId:string }
  | { type:"SET_NOTES"; plantId:string; notes:string }
  | { type:"CULL"; plantId:string }
  | { type:"UNDO_CULL" }
  | { type:"CLONE"; plantId:string }
  | { type:"ADVANCE" }
  | { type:"RESOLVE_EVENT"; eventId:string; choiceId:string }
  | { type:"CHOOSE_HARVEST"; choice:"early"|"balanced"|"late" }
  | { type:"CHOOSE_CURE"; choice:"fast"|"balanced"|"slow" }
  | { type:"RUN_TEST" }
  | { type:"SELECT_KEEPER"; plantId:string }
  | { type:"NAME_KEEPER"; name:string }
  | { type:"COMPLETE_LINE"; method:"F2"|"Backcross" }
  | { type:"CLEAR_NOTICE" };

function updatePlant(state: GameState, plantId: string, updater: (plant: Plant) => Plant): Plant[] {
  return state.plants.map((plant) => plant.id === plantId ? updater(plant) : plant);
}

function withUpdate(state: GameState, patch: Partial<GameState>, log?: string): GameState {
  return {
    ...state,
    ...patch,
    actionLog: log ? [log, ...state.actionLog].slice(0, 30) : state.actionLog,
    updatedAt: now(),
  };
}

function activeCount(state: GameState): number {
  return state.plants.filter((plant) => plant.status === "active" || plant.status === "keeper").length;
}

function adjustAll(state: GameState, changes: Partial<Record<TraitKey, number>>): Plant[] {
  return state.plants.map((plant) => {
    if (plant.status === "culled") return plant;
    const traits = { ...plant.traits };
    for (const [key, change] of Object.entries(changes) as [TraitKey, number][]) traits[key] = clamp(traits[key] + change);
    return { ...plant, traits };
  });
}

export function canAdvance(state: GameState): { allowed: boolean; reason: string } {
  if (state.phase === "seedling" && !state.plants.some((plant) => plant.status === "culled")) return { allowed:false, reason:"Cull at least one seedling to prove the first selection." };
  if (state.phase === "vegetative" && !state.plants.some((plant) => plant.cloned && plant.status !== "culled")) return { allowed:false, reason:"Take at least one backup clone before flower." };
  if (state.phase === "flower" && state.activeEventId) return { allowed:false, reason:"Resolve the active garden event before advancing." };
  if (activeCount(state) === 0) return { allowed:false, reason:"No active plants remain. Undo the last cull or start a new hunt." };
  return { allowed:true, reason:"Ready." };
}

export function reduceGame(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_PLANT":
      return withUpdate(state, { selectedPlantId: action.plantId });
    case "TOGGLE_COMPARE": {
      const exists = state.compareIds.includes(action.plantId);
      const next = exists ? state.compareIds.filter((id) => id !== action.plantId) : state.compareIds.length < 4 ? [...state.compareIds, action.plantId] : state.compareIds;
      return withUpdate(state, { compareIds: next, notice: !exists && state.compareIds.length >= 4 ? "Comparison is limited to four plants." : state.notice });
    }
    case "TOGGLE_TAG":
      return withUpdate(state, { plants:updatePlant(state, action.plantId, (plant) => ({...plant, tagged:!plant.tagged})) }, `Tag ${action.plantId} updated.`);
    case "SET_NOTES":
      return withUpdate(state, { plants:updatePlant(state, action.plantId, (plant) => ({...plant, notes:action.notes.slice(0, 280)})) });
    case "CULL": {
      const target = state.plants.find((plant) => plant.id === action.plantId);
      if (!target || target.status !== "active") return state;
      if (activeCount(state) <= 1) return withUpdate(state, { notice:"The last active plant cannot be culled. Every hunt needs a survivor." });
      const nextSelected = state.plants.find((plant) => plant.id !== action.plantId && plant.status === "active")?.id ?? state.selectedPlantId;
      return withUpdate(state, { plants:updatePlant(state, action.plantId, (plant)=>({...plant,status:"culled"})), selectedPlantId:nextSelected, compareIds:state.compareIds.filter((id)=>id!==action.plantId), lastCulledId:action.plantId, notice:`${action.plantId} moved to the cull archive. Undo remains available until another cull.` }, `${action.plantId} culled during ${state.phase}.`);
    }
    case "UNDO_CULL": {
      if (!state.lastCulledId) return withUpdate(state, {notice:"There is no recent cull to undo."});
      const id = state.lastCulledId;
      return withUpdate(state, {plants:updatePlant(state,id,(plant)=>({...plant,status:"active"})),selectedPlantId:id,lastCulledId:null,notice:`${id} returned to the active population.`}, `${id} restored from the cull archive.`);
    }
    case "CLONE": {
      const target = state.plants.find((plant)=>plant.id===action.plantId);
      if (!target || target.status !== "active" || target.cloned) return state;
      if (state.phase !== "vegetative" && state.phase !== "flower") return withUpdate(state,{notice:"Clones can only be reserved during vegetative growth or early flower."});
      const used = state.plants.filter((plant)=>plant.cloned && plant.status!=="culled").length;
      if (used >= state.resources.cloneCapacity) return withUpdate(state,{notice:"Clone library is full. Cull another backup or continue with the existing library."});
      if (state.resources.funds < 90) return withUpdate(state,{notice:"A clone reservation costs $90; funds are too low."});
      return withUpdate(state,{plants:updatePlant(state,action.plantId,(plant)=>({...plant,cloned:true})),resources:{...state.resources,funds:state.resources.funds-90},notice:`Backup clone ${action.plantId}-C1 rooted successfully.`}, `${action.plantId} cloned for $90.`);
    }
    case "ADVANCE": {
      const permission = canAdvance(state);
      if (!permission.allowed) return withUpdate(state,{notice:permission.reason});
      if (state.phase === "seedling") return withUpdate(state,{phase:"vegetative",week:2,notice:"Vegetative structure is now legible. Find one plant worth backing up before the flip."},"Population advanced to vegetative evaluation.");
      if (state.phase === "vegetative") return withUpdate(state,{phase:"flower",week:1,notice:"Flower week 1. Stretch is beginning; the final sensory identity remains hidden."},"Selected population entered flower.");
      if (state.phase === "flower") {
        if (state.week >= 5) return withUpdate(state,{phase:"harvest",notice:"The harvest window is open. Choose timing according to the original project—not appearance alone."},"Flower cycle completed.");
        const nextWeek = state.week + 1;
        const shouldEvent = nextWeek === 2 && state.resolvedEvents.length === 0;
        const event = events[hashSeed(state.runSeed) % events.length];
        return withUpdate(state,{week:nextWeek,activeEventId:shouldEvent ? event.id : null,notice:shouldEvent ? `${event.title}: a decision is required.` : `Flower week ${nextWeek}. New traits have resolved in the notebook.`},`Advanced to flower week ${nextWeek}.`);
      }
      return state;
    }
    case "RESOLVE_EVENT": {
      if (state.activeEventId !== action.eventId) return state;
      const event = events.find((item)=>item.id===action.eventId);
      const choice = event?.choices.find((item)=>item.id===action.choiceId);
      if (!event || !choice) return state;
      if ((choice.funds ?? 0) < 0 && state.resources.funds + (choice.funds ?? 0) < 0) return withUpdate(state,{notice:"That response costs more funds than the project has available."});
      if ((choice.research ?? 0) < 0 && state.resources.research + (choice.research ?? 0) < 0) return withUpdate(state,{notice:"That response needs more research points."});
      const plants = choice.plantEffect ? adjustAll(state,choice.plantEffect) : state.plants;
      return withUpdate(state,{plants,activeEventId:null,resolvedEvents:[...state.resolvedEvents,event.id],resources:{...state.resources,funds:state.resources.funds+(choice.funds??0),research:state.resources.research+(choice.research??0),reputation:state.resources.reputation+(choice.reputation??0)},notice:`Decision recorded: ${choice.label}. The room moves on.`},`${event.title}: ${choice.label}.`);
    }
    case "CHOOSE_HARVEST": {
      if (state.phase !== "harvest") return state;
      const modifiers = action.choice === "early" ? {aroma:0.3,yield:-0.5,clarity:0.4} : action.choice === "late" ? {yield:0.5,body:0.5,clarity:-0.3} : {flavor:0.3,stability:0.2};
      return withUpdate(state,{plants:adjustAll(state,modifiers),harvestChoice:action.choice,phase:"cure",notice:`${action.choice[0].toUpperCase()+action.choice.slice(1)} harvest locked. Choose a cure strategy to reveal the final sensory field.`},`${action.choice} harvest selected.`);
    }
    case "CHOOSE_CURE": {
      if (state.phase !== "cure") return state;
      const modifiers = action.choice === "fast" ? {flavor:-0.4,aroma:0.1} : action.choice === "slow" ? {flavor:0.6,aroma:0.3,stability:-0.1} : {flavor:0.3,aroma:0.2};
      return withUpdate(state,{plants:adjustAll(state,modifiers),cureChoice:action.choice,phase:"testing",testsCompleted:[],notice:"Cure complete. Begin with the stem rub and move through the sensory sequence."},`${action.choice} cure completed.`);
    }
    case "RUN_TEST": {
      if (state.phase !== "testing") return state;
      const next = testSequence[state.testsCompleted.length];
      if (!next) return state;
      const completed = [...state.testsCompleted,next];
      const finished = completed.length === testSequence.length;
      return withUpdate(state,{testsCompleted:completed,phase:finished?"keeper":"testing",notice:finished?"Every report is in. Appearance has lost its monopoly—choose the keeper you will remember.":`${next} complete. ${testSequence[completed.length]} is next.`},`${next} completed across ${activeCount(state)} candidates.`);
    }
    case "SELECT_KEEPER": {
      if (state.phase !== "keeper") return state;
      const target = state.plants.find((plant)=>plant.id===action.plantId && plant.status==="active");
      if (!target) return state;
      return withUpdate(state,{plants:state.plants.map((plant)=>({...plant,status:plant.id===action.plantId?"keeper":plant.status})),keeperId:action.plantId,selectedPlantId:action.plantId,notice:`${action.plantId} is marked as keeper. Give the cultivar a name and choose its next breeding step.`},`${action.plantId} selected as keeper.`);
    }
    case "NAME_KEEPER":
      return withUpdate(state,{keeperName:action.name.slice(0,48)});
    case "COMPLETE_LINE": {
      if (!state.keeperId) return withUpdate(state,{notice:"Select a keeper before continuing the line."});
      const cleanName = state.keeperName.trim();
      if (!cleanName) return withUpdate(state,{notice:"The keeper needs a name before it can enter the archive."});
      const keeper = state.plants.find((plant)=>plant.id===state.keeperId);
      if (!keeper) return state;
      const goal = goals.find((item)=>item.id===state.goalId)?.name ?? state.goalId;
      const entry: HallOfFameEntry = {id:`${state.runSeed}-${keeper.id}`,name:cleanName,parentage:`${getParent(state.femaleParentId).name} × ${getParent(state.pollenParentId).name}`,generation:state.generation,discoveryDate:new Date().toISOString(),goal,aroma:`${keeper.aromaFamily}; ${keeper.rareNote}`,flavor:`${keeper.traits.flavor}/10 persistence`,effects:keeper.effectProfile,growth:`${keeper.colorName}, branching ${keeper.traits.branching}/10`,awards:[keeper.rarity,keeper.goalScore>=8.5?"Project target hit":"Breeder's choice"],notes:keeper.notes||"Selected after the complete Quick Hunt evaluation.",descendants:`${action.method} population queued`,seed:state.runSeed,color:getParent(state.femaleParentId).color,plantId:keeper.id};
      const achievements = state.achievements.includes("First Keeper") ? state.achievements : [...state.achievements,"First Keeper"];
      return withUpdate(state,{phase:"complete",generation:2,nextGenerationMethod:action.method,keeperName:cleanName,hallOfFame:[entry,...state.hallOfFame.filter((item)=>item.id!==entry.id)],achievements,resources:{...state.resources,reputation:state.resources.reputation+3},notice:`${cleanName} is secured. A ${action.method} record now begins Generation 2.`},`${cleanName} archived; ${action.method} selected for Generation 2.`);
    }
    case "CLEAR_NOTICE":
      return withUpdate(state,{notice:""});
    default:
      return state;
  }
}

export function validateGameState(value: unknown): value is GameState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<GameState>;
  return state.schemaVersion === 1 && typeof state.runSeed === "string" && Array.isArray(state.plants) && state.plants.length > 0 && typeof state.phase === "string" && Array.isArray(state.hallOfFame);
}
