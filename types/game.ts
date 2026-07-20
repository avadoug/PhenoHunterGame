export type Phase =
  | "seedling"
  | "vegetative"
  | "flower"
  | "harvest"
  | "cure"
  | "testing"
  | "keeper"
  | "complete";

export type GoalId =
  | "aroma"
  | "energy"
  | "body"
  | "speed"
  | "resin"
  | "structure"
  | "yield"
  | "color"
  | "stress"
  | "balanced"
  | "novelty";

export type TraitKey =
  | "vigor"
  | "height"
  | "branching"
  | "stemStrength"
  | "resin"
  | "yield"
  | "flowerSpeed"
  | "aroma"
  | "flavor"
  | "effect"
  | "clarity"
  | "body"
  | "color"
  | "stability"
  | "breeding"
  | "stress"
  | "moldResistance"
  | "clonePerformance";

export type TraitSet = Record<TraitKey, number>;

export interface ParentGenetic {
  id: string;
  name: string;
  breeder: string;
  lineage: string;
  generation: string;
  stability: number;
  sex: "Female" | "Pollen" | "Reversed";
  growth: string;
  aroma: string[];
  effect: string;
  strengths: string[];
  weakness: string;
  recessive: string;
  breedingValue: number;
  color: string;
  traits: TraitSet;
}

export type PlantStatus = "active" | "culled" | "keeper";

export interface Plant {
  id: string;
  index: number;
  status: PlantStatus;
  tagged: boolean;
  cloned: boolean;
  notes: string;
  traits: TraitSet;
  aromaFamily: string;
  rareNote: string;
  effectProfile: string;
  colorName: string;
  mutation: string | null;
  linkage: string | null;
  rarity: string;
  goalScore: number;
  seedOffset: number;
}

export interface Resources {
  funds: number;
  research: number;
  reputation: number;
  cloneCapacity: number;
}

export interface EventChoice {
  id: string;
  label: string;
  detail: string;
  cost?: string;
  funds?: number;
  research?: number;
  reputation?: number;
  plantEffect?: Partial<TraitSet>;
}

export interface GameEvent {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  choices: EventChoice[];
}

export interface HallOfFameEntry {
  id: string;
  name: string;
  parentage: string;
  generation: number;
  discoveryDate: string;
  goal: string;
  aroma: string;
  flavor: string;
  effects: string;
  growth: string;
  awards: string[];
  notes: string;
  descendants: string;
  seed: string;
  color: string;
  plantId: string;
}

export interface GameState {
  schemaVersion: 1;
  phase: Phase;
  generation: number;
  week: number;
  runSeed: string;
  femaleParentId: string;
  pollenParentId: string;
  goalId: GoalId;
  plants: Plant[];
  selectedPlantId: string;
  compareIds: string[];
  resources: Resources;
  testsCompleted: string[];
  activeEventId: string | null;
  resolvedEvents: string[];
  harvestChoice: string | null;
  cureChoice: string | null;
  keeperId: string | null;
  keeperName: string;
  nextGenerationMethod: "F2" | "Backcross" | null;
  achievements: string[];
  hallOfFame: HallOfFameEntry[];
  lastCulledId: string | null;
  actionLog: string[];
  notice: string;
  startedAt: string;
  updatedAt: string;
}
