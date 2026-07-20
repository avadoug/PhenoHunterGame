import type { GameEvent, GoalId, TraitKey } from "@/types/game";

export interface Goal {
  id: GoalId;
  name: string;
  description: string;
  target: string;
  weights: Partial<Record<TraitKey, number>>;
}

export const goals: Goal[] = [
  { id:"aroma", name:"Extreme aroma", description:"Hunt volatile intensity without losing flavor persistence.", target:"Aroma ≥ 8.5", weights:{aroma:3,flavor:2,stability:0.5} },
  { id:"energy", name:"Euphoric energy", description:"Select a bright, creative effect with a clean landing.", target:"Clarity + effect", weights:{effect:2,clarity:3,body:-0.5} },
  { id:"body", name:"Heavy body effect", description:"Build depth and duration while watching anxiety risk.", target:"Body ≥ 8", weights:{body:3,effect:2,stability:0.5} },
  { id:"speed", name:"Fast flowering", description:"Finish quickly without surrendering character.", target:"Speed ≥ 8", weights:{flowerSpeed:3,yield:1,aroma:1} },
  { id:"resin", name:"High resin", description:"Seek early, dense resin with workable vigor.", target:"Resin ≥ 9", weights:{resin:3,vigor:1,moldResistance:1} },
  { id:"structure", name:"Strong structure", description:"Create a durable, clone-friendly branching frame.", target:"Stem + branching", weights:{stemStrength:3,branching:2,clonePerformance:1} },
  { id:"yield", name:"Large yield", description:"Push output without creating fragile density.", target:"Yield ≥ 8.5", weights:{yield:3,stemStrength:1,moldResistance:1} },
  { id:"color", name:"Unique coloration", description:"Recover unusual color without dragging sensitivity.", target:"Color ≥ 9", weights:{color:3,stress:1,stability:1} },
  { id:"stress", name:"Stress tolerance", description:"Select resilient plants that keep their identity under pressure.", target:"Stress ≥ 9", weights:{stress:3,moldResistance:2,vigor:1} },
  { id:"balanced", name:"Balanced cultivar", description:"No glaring weakness; every trait earns its place.", target:"Broad quality", weights:{vigor:1,aroma:1,flavor:1,effect:1,stability:1,breeding:1} },
  { id:"novelty", name:"Experimental novelty", description:"Embrace strange recombinants and memorable contradictions.", target:"Rare expression", weights:{breeding:2,aroma:1.5,color:1.5,effect:1.5,stability:-0.3} },
];

export const events: GameEvent[] = [
  { id:"heat-event", title:"The chamber runs hot", eyebrow:"Week 2 · Garden event", description:"A cooling relay gives out during peak stretch. Sensitive plants are already folding their leaves.", choices:[
    { id:"spend", label:"Replace the relay", detail:"Protect the population and keep clean records.", cost:"−$260", funds:-260, plantEffect:{stress:0.3} },
    { id:"improvise", label:"Improvise a cooling loop", detail:"Spend research for an elegant temporary fix.", cost:"−2 research", research:-2, plantEffect:{vigor:0.2} },
    { id:"risk", label:"Ride out the heat", detail:"No resource cost, but every plant takes a resilience test.", cost:"Stress test", plantEffect:{stress:-0.8,resin:-0.2} },
  ]},
  { id:"lost-label", title:"Two labels go dark", eyebrow:"Week 2 · Garden event", description:"Condensation erased two plant tags. Your notebook can narrow the possibilities, but certainty has a cost.", choices:[
    { id:"test", label:"Run genetic verification", detail:"Recover the records with high confidence.", cost:"−2 research", research:-2, reputation:1 },
    { id:"compare", label:"Compare growth records", detail:"Trust your notes and accept a little uncertainty.", cost:"No cost", plantEffect:{stability:-0.2} },
    { id:"mystery", label:"Preserve the mystery", detail:"Mark both uncertain; novelty value rises.", cost:"+1 reputation", reputation:1, plantEffect:{breeding:0.4} },
  ]},
  { id:"ugly-duckling", title:"The ugly duckling speaks", eyebrow:"Week 2 · Garden event", description:"A crooked plant throws a stem rub far beyond anything else in the room.", choices:[
    { id:"clone", label:"Reserve a backup clone", detail:"Spend capacity to protect the outlier.", cost:"−$90", funds:-90, plantEffect:{aroma:0.4} },
    { id:"flower", label:"Let the room decide", detail:"Keep it in flower and reveal the truth at cure.", cost:"No cost", plantEffect:{breeding:0.3} },
    { id:"stress", label:"Stress-test the claim", detail:"Risk vigor to gain more confidence.", cost:"−1 research", research:-1, plantEffect:{vigor:-0.3,aroma:0.5} },
  ]},
];

export const testSequence = ["Stem rub", "Jar aroma", "Grind aroma", "Flavor evaluation", "Effect timeline"] as const;

export const phaseCopy = {
  seedling: { label:"Seedling selection", objective:"Cull at least one weak start to free a grow slot.", action:"Review the early vigor clues. Adult traits remain sealed." },
  vegetative: { label:"Vegetative evaluation", objective:"Clone at least one candidate before flower.", action:"Branching, structure, stem rub and clone odds are now visible." },
  flower: { label:"Flower chamber", objective:"Advance through five weeks and resolve the garden event.", action:"Each week reveals more resin, color and structural truth." },
  harvest: { label:"Harvest window", objective:"Choose the timing that fits your original goal.", action:"Timing shifts aroma, yield and effect tone across the population." },
  cure: { label:"Cure strategy", objective:"Commit to a cure path.", action:"This is abstract game strategy—not cultivation guidance." },
  testing: { label:"Sensory lab", objective:"Complete all five staged evaluations.", action:"The best-looking plant can still collapse under flavor or effect testing." },
  keeper: { label:"Keeper decision", objective:"Select the plant whose tradeoffs best serve the project.", action:"Scores inform the decision; they do not make it for you." },
  complete: { label:"Line secured", objective:"Your keeper has entered the Hall of Fame.", action:"Replay with a new seed or carry this line into its recorded next generation." },
};

export const achievements = [
  "First Keeper", "Stem Rub Prophet", "Broke the Linkage", "Recessive Recovered", "Clone Saved", "Ten-Generation Project", "Preservation Complete", "Legendary Outlier", "Cult Classic", "No Plant Left Unlabeled", "The One I Almost Culled", "Bag Appeal Is Not Everything", "Smoke Test Redemption", "Chaos Stabilized",
];

export const glossary = [
  ["Phenotype", "The observable expression of a plant's inherited traits in this fictional simulation."],
  ["Keeper", "A selected plant preserved for its memorable combination of traits and project fit."],
  ["F2", "A second filial generation with wider simulated segregation and more recombination."],
  ["Backcross", "A next generation paired back toward one parent to recover its defining traits."],
  ["Linkage drag", "A useful trait traveling with an unwanted one, creating a breeding tradeoff."],
  ["Confidence", "How much the current growth stage allows the notebook to know about a trait."],
];
