import type { ParentGenetic, TraitSet } from "@/types/game";

const base: TraitSet = {
  vigor: 6,
  height: 6,
  branching: 6,
  stemStrength: 6,
  resin: 6,
  yield: 6,
  flowerSpeed: 6,
  aroma: 6,
  flavor: 6,
  effect: 6,
  clarity: 6,
  body: 6,
  color: 5,
  stability: 6,
  breeding: 6,
  stress: 6,
  moldResistance: 6,
  clonePerformance: 6,
};

function traits(overrides: Partial<TraitSet>): TraitSet {
  return { ...base, ...overrides };
}

type ParentInput = Omit<ParentGenetic, "breeder" | "traits"> & {
  traits: Partial<TraitSet>;
};

function parent(input: ParentInput): ParentGenetic {
  return { breeder: "Lost Keeper Collective", ...input, traits: traits(input.traits) };
}

export const parents: ParentGenetic[] = [
  parent({ id:"apollo-afterburner", name:"Apollo Afterburner", lineage:"Solar Flare F3 × Temple Fuel", generation:"F4", stability:8, sex:"Female", growth:"Tall, fast lateral launch", aroma:["charred citrus","rocket fuel"], effect:"Bright acceleration with a clean landing", strengths:["vigor","clarity"], weakness:"Long finish", recessive:"violet petiole flare", breedingValue:8, color:"#f5a623", traits:{vigor:9,height:8,aroma:8,effect:8,clarity:9,flowerSpeed:4} }),
  parent({ id:"electric-mango", name:"Electric Mango", lineage:"Tangerine Machine × Ghost Cola", generation:"F3", stability:7, sex:"Female", growth:"Compact with elastic branches", aroma:["green mango","ozone"], effect:"Social, sparkling and quick", strengths:["aroma","flavor"], weakness:"soft stems", recessive:"metallic haze finish", breedingValue:9, color:"#ffd54a", traits:{aroma:10,flavor:9,clarity:8,stemStrength:4,color:7} }),
  parent({ id:"roadkill-wizard", name:"Roadkill Wizard", lineage:"Pine Tar Oracle × Rubber Halo", generation:"IBL", stability:9, sex:"Pollen", growth:"Stocky, wide-leaf frame", aroma:["hot rubber","forest floor"], effect:"Heavy, peculiar body calm", strengths:["stability","body"], weakness:"polarizing aroma", recessive:"sweet fennel", breedingValue:8, color:"#748c3b", traits:{stability:10,body:9,stemStrength:9,aroma:8,clarity:3} }),
  parent({ id:"violet-static", name:"Violet Static", lineage:"Blue Funeral × Neon Rootbeer", generation:"F2", stability:5, sex:"Reversed", growth:"Medium height, sharp branching", aroma:["violet candy","cold metal"], effect:"Dreamy but articulate", strengths:["color","outliers"], weakness:"segregates widely", recessive:"blackberry skin", breedingValue:9, color:"#a765ff", traits:{color:10,aroma:8,clarity:7,stability:4,breeding:9} }),
  parent({ id:"lunar-glue", name:"Lunar Glue", lineage:"Rubber Halo × Rotten Stardust", generation:"BX2", stability:8, sex:"Female", growth:"Dense, low-slung canopy", aroma:["mineral glue","burnt sugar"], effect:"Deep orbital body drift", strengths:["resin","density"], weakness:"mold sensitivity", recessive:"lime peel", breedingValue:8, color:"#c8d1df", traits:{resin:10,yield:8,body:10,moldResistance:3,clarity:3} }),
  parent({ id:"cathedral-haze", name:"Cathedral Haze", lineage:"Temple Fuel × Pine Tar Oracle", generation:"F5", stability:7, sex:"Pollen", growth:"Tall candelabra architecture", aroma:["incense","lemon pith"], effect:"Expansive, soaring contemplation", strengths:["effect","branching"], weakness:"slow flower", recessive:"cedar smoke", breedingValue:9, color:"#b7d36b", traits:{height:10,branching:9,effect:10,clarity:9,flowerSpeed:3} }),
  parent({ id:"cherry-brake-fluid", name:"Cherry Brake Fluid", lineage:"Ghost Cola × Rubber Halo", generation:"F3", stability:6, sex:"Female", growth:"Vigorous with stout rails", aroma:["black cherry","brake fluid"], effect:"Warm euphoria with weight", strengths:["flavor","stem strength"], weakness:"nutrient fussy", recessive:"cocoa husk", breedingValue:8, color:"#cc3f57", traits:{flavor:10,aroma:9,stemStrength:9,body:7,stress:4} }),
  parent({ id:"neon-rootbeer", name:"Neon Rootbeer", lineage:"Ghost Cola × Lime Television", generation:"F4", stability:7, sex:"Reversed", growth:"Even, medium-height spears", aroma:["root beer foam","lime zest"], effect:"Buoyant and conversational", strengths:["complexity","consistency"], weakness:"average yield", recessive:"wintergreen", breedingValue:8, color:"#77ffbd", traits:{aroma:9,flavor:9,stability:8,clarity:8,yield:5} }),
  parent({ id:"pine-tar-oracle", name:"Pine Tar Oracle", lineage:"Cathedral Haze × Velvet Chainsaw", generation:"IBL", stability:9, sex:"Pollen", growth:"Rugged open-frame branches", aroma:["pine tar","old books"], effect:"Focused, prophetic stillness", strengths:["resilience","breeding value"], weakness:"plain bag appeal", recessive:"aniseed", breedingValue:10, color:"#5b8f54", traits:{stress:10,moldResistance:9,breeding:10,color:3,clarity:9} }),
  parent({ id:"solar-flare-f3", name:"Solar Flare F3", lineage:"Apollo Afterburner × Electric Mango", generation:"F3", stability:6, sex:"Female", growth:"Explosive early vigor", aroma:["hot tangerine","sun-warmed vinyl"], effect:"Fast creative ignition", strengths:["vigor","energy"], weakness:"stretch", recessive:"pink grapefruit", breedingValue:9, color:"#ff814a", traits:{vigor:10,height:9,aroma:9,effect:9,body:3} }),
  parent({ id:"blue-funeral", name:"Blue Funeral", lineage:"Violet Static × Pine Tar Oracle", generation:"F4", stability:8, sex:"Female", growth:"Compact, solemn columns", aroma:["blueberry skin","church incense"], effect:"Quiet emotional warmth", strengths:["color","smoothness"], weakness:"slow rooting", recessive:"blue latex", breedingValue:8, color:"#5975d9", traits:{color:10,flavor:8,body:8,clonePerformance:3,stability:8} }),
  parent({ id:"tangerine-machine", name:"Tangerine Machine", lineage:"Electric Mango × Solar Flare F3", generation:"F5", stability:8, sex:"Pollen", growth:"Uniform racing-green towers", aroma:["tangerine oil","machine shop"], effect:"Precise daytime momentum", strengths:["aroma","speed"], weakness:"light body", recessive:"carrot seed", breedingValue:9, color:"#ef8f29", traits:{aroma:10,flowerSpeed:8,clarity:10,body:2,stability:8} }),
  parent({ id:"rubber-halo", name:"Rubber Halo", lineage:"Roadkill Wizard × Lunar Glue", generation:"BX1", stability:7, sex:"Reversed", growth:"Thick stems, halo branching", aroma:["new tire","vanilla dust"], effect:"Centered physical ease", strengths:["resin","stems"], weakness:"slow germination", recessive:"marshmallow root", breedingValue:8, color:"#b6b1a5", traits:{resin:9,stemStrength:10,body:8,vigor:4,breeding:8} }),
  parent({ id:"temple-fuel", name:"Temple Fuel", lineage:"Cathedral Haze × Apollo Afterburner", generation:"F4", stability:7, sex:"Pollen", growth:"Tall with disciplined spacing", aroma:["sandalwood","aviation fuel"], effect:"Clear ceremonial lift", strengths:["clarity","structure"], weakness:"long flower", recessive:"candied ginger", breedingValue:9, color:"#d6ab58", traits:{clarity:10,branching:8,stemStrength:8,flowerSpeed:3,effect:9} }),
  parent({ id:"rotten-stardust", name:"Rotten Stardust", lineage:"Cosmic Lunchbox × Blue Funeral", generation:"F2", stability:4, sex:"Female", growth:"Erratic, often spectacular", aroma:["overripe fruit","cold stone"], effect:"Strange time dilation", strengths:["novelty","outliers"], weakness:"unstable", recessive:"fermented papaya", breedingValue:9, color:"#df5d9b", traits:{aroma:9,effect:9,breeding:10,stability:2,vigor:5} }),
  parent({ id:"ghost-cola", name:"Ghost Cola", lineage:"Neon Rootbeer × Blue Funeral", generation:"F5", stability:8, sex:"Reversed", growth:"Pale, symmetrical bushes", aroma:["cola syrup","chalk dust"], effect:"Soft-focus social ease", strengths:["symmetry","flavor"], weakness:"moderate resin", recessive:"lemon mineral water", breedingValue:7, color:"#b6e3dd", traits:{branching:9,flavor:9,clarity:7,resin:5,stability:9} }),
  parent({ id:"cosmic-lunchbox", name:"Cosmic Lunchbox", lineage:"Lime Television × Burnt Sugar Comet", generation:"F3", stability:5, sex:"Female", growth:"Compact with oversized fans", aroma:["fruit snack","aluminum"], effect:"Goofy creative drift", strengths:["novel aroma","yield"], weakness:"weak stems", recessive:"peanut shell", breedingValue:8, color:"#72d4d0", traits:{yield:9,aroma:9,effect:8,stemStrength:3,stability:5} }),
  parent({ id:"burnt-sugar-comet", name:"Burnt Sugar Comet", lineage:"Lunar Glue × Solar Flare F3", generation:"F4", stability:7, sex:"Pollen", growth:"Fast, resinous spears", aroma:["torched caramel","orange peel"], effect:"Warm rush into soft gravity", strengths:["resin","flower speed"], weakness:"average mold resistance", recessive:"coffee cherry", breedingValue:8, color:"#cf6f35", traits:{resin:10,flowerSpeed:8,aroma:8,body:8,moldResistance:4} }),
  parent({ id:"lime-television", name:"Lime Television", lineage:"Electric Mango × Cathedral Haze", generation:"F3", stability:6, sex:"Reversed", growth:"Angular satellite branches", aroma:["lime static","warm circuitry"], effect:"High-definition focus", strengths:["clarity","rare notes"], weakness:"low yield", recessive:"green peppercorn", breedingValue:9, color:"#a9ef45", traits:{clarity:10,aroma:9,breeding:9,yield:3,branching:8} }),
  parent({ id:"velvet-chainsaw", name:"Velvet Chainsaw", lineage:"Roadkill Wizard × Cherry Brake Fluid", generation:"F4", stability:7, sex:"Pollen", growth:"Aggressive branching, soft finish", aroma:["red velvet","two-stroke exhaust"], effect:"Powerful body calm without fog", strengths:["effect","stems"], weakness:"stretch under stress", recessive:"rosewood", breedingValue:9, color:"#b83c63", traits:{body:9,clarity:7,stemStrength:9,stress:5,flavor:8} }),
  parent({ id:"amber-antenna", name:"Amber Antenna", lineage:"Temple Fuel × Ghost Cola", generation:"F6", stability:9, sex:"Female", growth:"Ordered antenna-like laterals", aroma:["amber resin","cola spice"], effect:"Patient, lucid calm", strengths:["stability","structure"], weakness:"restrained aroma", recessive:"dried apricot", breedingValue:8, color:"#e3a43b", traits:{stability:10,branching:10,stemStrength:8,aroma:5,clarity:9} }),
  parent({ id:"pepper-moon", name:"Pepper Moon", lineage:"Lime Television × Violet Static", generation:"F2", stability:4, sex:"Reversed", growth:"Thin-leaf crescent canopy", aroma:["pink pepper","violet rind"], effect:"Electric lateral thinking", strengths:["novelty","color"], weakness:"temperamental clones", recessive:"melon rind", breedingValue:9, color:"#db8be8", traits:{color:9,aroma:9,effect:9,clonePerformance:3,stability:3} }),
  parent({ id:"cedar-signal", name:"Cedar Signal", lineage:"Pine Tar Oracle × Neon Rootbeer", generation:"F5", stability:8, sex:"Pollen", growth:"Balanced open Christmas-tree form", aroma:["cedar box","radio ozone"], effect:"Signal-clear composure", strengths:["resilience","clarity"], weakness:"modest color", recessive:"juniper soda", breedingValue:8, color:"#6daa6a", traits:{stress:9,moldResistance:9,clarity:9,color:3,branching:8} }),
  parent({ id:"plasma-peach", name:"Plasma Peach", lineage:"Electric Mango × Violet Static", generation:"F3", stability:6, sex:"Female", growth:"Bright petioles, medium frame", aroma:["white peach","hot plasma"], effect:"Playful euphoric lift", strengths:["flavor","color"], weakness:"soft finish", recessive:"peach pit", breedingValue:8, color:"#ff9c91", traits:{flavor:10,color:9,effect:9,stemStrength:4,aroma:9} }),
];

export const femaleParents = parents.filter((item) => item.sex !== "Pollen");
export const pollenParents = parents.filter((item) => item.sex !== "Female");

export function getParent(id: string): ParentGenetic {
  return parents.find((item) => item.id === id) ?? parents[0];
}
