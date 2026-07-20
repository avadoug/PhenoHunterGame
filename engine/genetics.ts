import { goals } from "@/data/gameContent";
import { getParent } from "@/data/parents";
import { clamp, pick, seededRandom } from "@/engine/random";
import type { GoalId, ParentGenetic, Plant, TraitKey, TraitSet } from "@/types/game";

const traitKeys: TraitKey[] = ["vigor","height","branching","stemStrength","resin","yield","flowerSpeed","aroma","flavor","effect","clarity","body","color","stability","breeding","stress","moldResistance","clonePerformance"];
const aromaFamilies = ["citrus voltage","fermented fruit","forest resin","cold mineral","dessert spice","rubber funk","incense haze","cola botanical","tropical static","floral metal"];
const rareNotes = ["green mango skin","hot vinyl","cedar smoke","violet rind","aluminum lunchbox","burnt caramel","pink pepper","chalk dust","wintergreen foam","coffee cherry","melon rind","carrot seed"];
const effectProfiles = ["lucid acceleration","warm gravitational calm","social sparkle","creative tunnel vision","dreamlike clarity","body-first stillness","patient euphoria","playful time dilation"];
const colors = ["electric lime","midnight violet","amber frost","blue-green","wine petiole","silver sage","near-black plum","radioactive chartreuse"];
const mutations = ["spiral phyllotaxy","variegated first leaf","double serration","fasciated branch","velvet petiole"];
const linkages = ["extreme aroma ↔ softer stems","fast finish ↔ lighter yield","high resin ↔ slower vigor","deep color ↔ stress sensitivity","soaring clarity ↔ longer flower","dense flower ↔ lower mold resistance"];

function weightedGoalScore(traits: TraitSet, goalId: GoalId): number {
  const goal = goals.find((item) => item.id === goalId) ?? goals[0];
  let total = 0;
  let weightTotal = 0;
  for (const [key, weight] of Object.entries(goal.weights) as [TraitKey, number][]) {
    total += traits[key] * weight;
    weightTotal += Math.abs(weight);
  }
  return clamp(total / Math.max(1, weightTotal), 0, 10);
}

export function classifyRarity(plant: Pick<Plant, "traits" | "mutation" | "linkage" | "goalScore">): string {
  const coherent = plant.goalScore + plant.traits.breeding / 3 + (plant.mutation ? 0.7 : 0) - (plant.traits.stability < 3 ? 0.8 : 0);
  if (coherent >= 12.4) return "Legendary Expression";
  if (coherent >= 11.6) return "Genetic Outlier";
  if (coherent >= 10.8) return "Breeding Cornerstone";
  if (coherent >= 10.0) return "Elite Keeper";
  if (coherent >= 9.1) return "Rare Recombinant";
  if (coherent >= 8.2) return "Strong Candidate";
  if (coherent >= 7.2) return "Useful Expression";
  return "Common Expression";
}

function inheritTrait(random: () => number, female: ParentGenetic, pollen: ParentGenetic, key: TraitKey, segregation: number): number {
  const parentBias = 0.38 + random() * 0.24;
  const midpoint = female.traits[key] * parentBias + pollen.traits[key] * (1 - parentBias);
  const stability = (female.stability + pollen.stability) / 20;
  const noise = (random() - 0.5) * segregation * (1.25 - stability * 0.45);
  const hybridVigor = key === "vigor" || key === "branching" ? random() * 0.7 : 0;
  return clamp(midpoint + noise + hybridVigor);
}

export function generatePopulation(seed: string, femaleId: string, pollenId: string, goalId: GoalId, count = 12, generationType: "F1" | "F2" = "F1"): Plant[] {
  const female = getParent(femaleId);
  const pollen = getParent(pollenId);
  const random = seededRandom(`${seed}:${female.id}:${pollen.id}:${generationType}`);
  const segregation = generationType === "F2" ? 5.2 : 3.2;

  return Array.from({ length: count }, (_, index) => {
    const traits = Object.fromEntries(traitKeys.map((key) => [key, inheritTrait(random, female, pollen, key, segregation)])) as TraitSet;
    const mutation = random() < (generationType === "F2" ? 0.13 : 0.07) ? pick(random, mutations) : null;
    const linkage = random() < 0.32 ? pick(random, linkages) : null;
    if (linkage?.startsWith("extreme aroma")) traits.stemStrength = clamp(traits.stemStrength - 0.8);
    if (linkage?.startsWith("fast finish")) traits.yield = clamp(traits.yield - 0.7);
    if (linkage?.startsWith("high resin")) traits.vigor = clamp(traits.vigor - 0.7);
    if (linkage?.startsWith("deep color")) traits.stress = clamp(traits.stress - 0.8);
    if (linkage?.startsWith("soaring clarity")) traits.flowerSpeed = clamp(traits.flowerSpeed - 0.8);
    if (linkage?.startsWith("dense flower")) traits.moldResistance = clamp(traits.moldResistance - 0.9);

    const plant: Plant = {
      id: `P-${String(index + 1).padStart(2, "0")}`,
      index,
      status: "active",
      tagged: false,
      cloned: false,
      notes: "",
      traits,
      aromaFamily: random() < 0.32 ? pick(random, female.aroma) : random() < 0.48 ? pick(random, pollen.aroma) : pick(random, aromaFamilies),
      rareNote: random() < 0.4 ? pick(random, rareNotes) : "not yet resolved",
      effectProfile: pick(random, effectProfiles),
      colorName: pick(random, colors),
      mutation,
      linkage,
      rarity: "Common Expression",
      goalScore: weightedGoalScore(traits, goalId),
      seedOffset: Math.floor(random() * 100000),
    };
    plant.rarity = classifyRarity(plant);
    return plant;
  });
}

export function visibleTraitKeys(phase: string, flowerWeek: number, testsCompleted: string[]): TraitKey[] {
  const early: TraitKey[] = ["vigor", "height", "stress"];
  if (phase === "seedling") return early;
  const vegetative: TraitKey[] = [...early, "branching", "stemStrength", "clonePerformance"];
  if (phase === "vegetative") return vegetative;
  const flower: TraitKey[] = [...vegetative, "flowerSpeed", "yield", "color"];
  if (phase === "flower") return flowerWeek >= 4 ? [...flower, "resin", "moldResistance"] : flower;
  const harvest: TraitKey[] = [...flower, "resin", "moldResistance"];
  if (phase === "harvest" || phase === "cure") return harvest;
  const testing: TraitKey[] = [...harvest];
  if (testsCompleted.includes("Stem rub") || testsCompleted.includes("Jar aroma")) testing.push("aroma");
  if (testsCompleted.includes("Flavor evaluation")) testing.push("flavor");
  if (testsCompleted.includes("Effect timeline")) testing.push("effect", "clarity", "body", "stability", "breeding");
  return phase === "keeper" || phase === "complete" ? traitKeys : testing;
}

export function traitConfidence(phase: string, key: TraitKey, flowerWeek: number): "known" | "estimated" | "unknown" {
  const visible = visibleTraitKeys(phase, flowerWeek, []);
  if (visible.includes(key)) return phase === "seedling" || (phase === "flower" && flowerWeek < 4) ? "estimated" : "known";
  return "unknown";
}

export function makeNameSuggestions(plant: Plant, femaleName: string, pollenName: string): string[] {
  const first = femaleName.split(" ")[0];
  const second = pollenName.split(" ").at(-1) ?? "Signal";
  const note = plant.rareNote === "not yet resolved" ? plant.aromaFamily.split(" ")[0] : plant.rareNote.split(" ")[0];
  return [
    `${note} Meridian`,
    `${first} Lunchbreak`,
    `${second} Reserve`,
    `Static ${plant.colorName.split(" ").at(-1)}`,
    `Unlicensed Weather`,
    `${first} × ${second} No. ${plant.index + 1}`,
  ];
}
