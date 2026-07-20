import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region data/gameContent.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var goals = [
	{
		id: "aroma",
		name: "Extreme aroma",
		description: "Hunt volatile intensity without losing flavor persistence.",
		target: "Aroma ≥ 8.5",
		weights: {
			aroma: 3,
			flavor: 2,
			stability: .5
		}
	},
	{
		id: "energy",
		name: "Euphoric energy",
		description: "Select a bright, creative effect with a clean landing.",
		target: "Clarity + effect",
		weights: {
			effect: 2,
			clarity: 3,
			body: -.5
		}
	},
	{
		id: "body",
		name: "Heavy body effect",
		description: "Build depth and duration while watching anxiety risk.",
		target: "Body ≥ 8",
		weights: {
			body: 3,
			effect: 2,
			stability: .5
		}
	},
	{
		id: "speed",
		name: "Fast flowering",
		description: "Finish quickly without surrendering character.",
		target: "Speed ≥ 8",
		weights: {
			flowerSpeed: 3,
			yield: 1,
			aroma: 1
		}
	},
	{
		id: "resin",
		name: "High resin",
		description: "Seek early, dense resin with workable vigor.",
		target: "Resin ≥ 9",
		weights: {
			resin: 3,
			vigor: 1,
			moldResistance: 1
		}
	},
	{
		id: "structure",
		name: "Strong structure",
		description: "Create a durable, clone-friendly branching frame.",
		target: "Stem + branching",
		weights: {
			stemStrength: 3,
			branching: 2,
			clonePerformance: 1
		}
	},
	{
		id: "yield",
		name: "Large yield",
		description: "Push output without creating fragile density.",
		target: "Yield ≥ 8.5",
		weights: {
			yield: 3,
			stemStrength: 1,
			moldResistance: 1
		}
	},
	{
		id: "color",
		name: "Unique coloration",
		description: "Recover unusual color without dragging sensitivity.",
		target: "Color ≥ 9",
		weights: {
			color: 3,
			stress: 1,
			stability: 1
		}
	},
	{
		id: "stress",
		name: "Stress tolerance",
		description: "Select resilient plants that keep their identity under pressure.",
		target: "Stress ≥ 9",
		weights: {
			stress: 3,
			moldResistance: 2,
			vigor: 1
		}
	},
	{
		id: "balanced",
		name: "Balanced cultivar",
		description: "No glaring weakness; every trait earns its place.",
		target: "Broad quality",
		weights: {
			vigor: 1,
			aroma: 1,
			flavor: 1,
			effect: 1,
			stability: 1,
			breeding: 1
		}
	},
	{
		id: "novelty",
		name: "Experimental novelty",
		description: "Embrace strange recombinants and memorable contradictions.",
		target: "Rare expression",
		weights: {
			breeding: 2,
			aroma: 1.5,
			color: 1.5,
			effect: 1.5,
			stability: -.3
		}
	}
];
var events = [
	{
		id: "heat-event",
		title: "The chamber runs hot",
		eyebrow: "Week 2 · Garden event",
		description: "A cooling relay gives out during peak stretch. Sensitive plants are already folding their leaves.",
		choices: [
			{
				id: "spend",
				label: "Replace the relay",
				detail: "Protect the population and keep clean records.",
				cost: "−$260",
				funds: -260,
				plantEffect: { stress: .3 }
			},
			{
				id: "improvise",
				label: "Improvise a cooling loop",
				detail: "Spend research for an elegant temporary fix.",
				cost: "−2 research",
				research: -2,
				plantEffect: { vigor: .2 }
			},
			{
				id: "risk",
				label: "Ride out the heat",
				detail: "No resource cost, but every plant takes a resilience test.",
				cost: "Stress test",
				plantEffect: {
					stress: -.8,
					resin: -.2
				}
			}
		]
	},
	{
		id: "lost-label",
		title: "Two labels go dark",
		eyebrow: "Week 2 · Garden event",
		description: "Condensation erased two plant tags. Your notebook can narrow the possibilities, but certainty has a cost.",
		choices: [
			{
				id: "test",
				label: "Run genetic verification",
				detail: "Recover the records with high confidence.",
				cost: "−2 research",
				research: -2,
				reputation: 1
			},
			{
				id: "compare",
				label: "Compare growth records",
				detail: "Trust your notes and accept a little uncertainty.",
				cost: "No cost",
				plantEffect: { stability: -.2 }
			},
			{
				id: "mystery",
				label: "Preserve the mystery",
				detail: "Mark both uncertain; novelty value rises.",
				cost: "+1 reputation",
				reputation: 1,
				plantEffect: { breeding: .4 }
			}
		]
	},
	{
		id: "ugly-duckling",
		title: "The ugly duckling speaks",
		eyebrow: "Week 2 · Garden event",
		description: "A crooked plant throws a stem rub far beyond anything else in the room.",
		choices: [
			{
				id: "clone",
				label: "Reserve a backup clone",
				detail: "Spend capacity to protect the outlier.",
				cost: "−$90",
				funds: -90,
				plantEffect: { aroma: .4 }
			},
			{
				id: "flower",
				label: "Let the room decide",
				detail: "Keep it in flower and reveal the truth at cure.",
				cost: "No cost",
				plantEffect: { breeding: .3 }
			},
			{
				id: "stress",
				label: "Stress-test the claim",
				detail: "Risk vigor to gain more confidence.",
				cost: "−1 research",
				research: -1,
				plantEffect: {
					vigor: -.3,
					aroma: .5
				}
			}
		]
	}
];
var testSequence = [
	"Stem rub",
	"Jar aroma",
	"Grind aroma",
	"Flavor evaluation",
	"Effect timeline"
];
var phaseCopy = {
	seedling: {
		label: "Seedling selection",
		objective: "Cull at least one weak start to free a grow slot.",
		action: "Review the early vigor clues. Adult traits remain sealed."
	},
	vegetative: {
		label: "Vegetative evaluation",
		objective: "Clone at least one candidate before flower.",
		action: "Branching, structure, stem rub and clone odds are now visible."
	},
	flower: {
		label: "Flower chamber",
		objective: "Advance through five weeks and resolve the garden event.",
		action: "Each week reveals more resin, color and structural truth."
	},
	harvest: {
		label: "Harvest window",
		objective: "Choose the timing that fits your original goal.",
		action: "Timing shifts aroma, yield and effect tone across the population."
	},
	cure: {
		label: "Cure strategy",
		objective: "Commit to a cure path.",
		action: "This is abstract game strategy—not cultivation guidance."
	},
	testing: {
		label: "Sensory lab",
		objective: "Complete all five staged evaluations.",
		action: "The best-looking plant can still collapse under flavor or effect testing."
	},
	keeper: {
		label: "Keeper decision",
		objective: "Select the plant whose tradeoffs best serve the project.",
		action: "Scores inform the decision; they do not make it for you."
	},
	complete: {
		label: "Line secured",
		objective: "Your keeper has entered the Hall of Fame.",
		action: "Replay with a new seed or carry this line into its recorded next generation."
	}
};
var glossary = [
	["Phenotype", "The observable expression of a plant's inherited traits in this fictional simulation."],
	["Keeper", "A selected plant preserved for its memorable combination of traits and project fit."],
	["F2", "A second filial generation with wider simulated segregation and more recombination."],
	["Backcross", "A next generation paired back toward one parent to recover its defining traits."],
	["Linkage drag", "A useful trait traveling with an unwanted one, creating a breeding tradeoff."],
	["Confidence", "How much the current growth stage allows the notebook to know about a trait."]
];
//#endregion
//#region data/parents.ts
var base = {
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
	clonePerformance: 6
};
function traits(overrides) {
	return {
		...base,
		...overrides
	};
}
function parent(input) {
	return {
		breeder: "Lost Keeper Collective",
		...input,
		traits: traits(input.traits)
	};
}
var parents = [
	parent({
		id: "apollo-afterburner",
		name: "Apollo Afterburner",
		lineage: "Solar Flare F3 × Temple Fuel",
		generation: "F4",
		stability: 8,
		sex: "Female",
		growth: "Tall, fast lateral launch",
		aroma: ["charred citrus", "rocket fuel"],
		effect: "Bright acceleration with a clean landing",
		strengths: ["vigor", "clarity"],
		weakness: "Long finish",
		recessive: "violet petiole flare",
		breedingValue: 8,
		color: "#f5a623",
		traits: {
			vigor: 9,
			height: 8,
			aroma: 8,
			effect: 8,
			clarity: 9,
			flowerSpeed: 4
		}
	}),
	parent({
		id: "electric-mango",
		name: "Electric Mango",
		lineage: "Tangerine Machine × Ghost Cola",
		generation: "F3",
		stability: 7,
		sex: "Female",
		growth: "Compact with elastic branches",
		aroma: ["green mango", "ozone"],
		effect: "Social, sparkling and quick",
		strengths: ["aroma", "flavor"],
		weakness: "soft stems",
		recessive: "metallic haze finish",
		breedingValue: 9,
		color: "#ffd54a",
		traits: {
			aroma: 10,
			flavor: 9,
			clarity: 8,
			stemStrength: 4,
			color: 7
		}
	}),
	parent({
		id: "roadkill-wizard",
		name: "Roadkill Wizard",
		lineage: "Pine Tar Oracle × Rubber Halo",
		generation: "IBL",
		stability: 9,
		sex: "Pollen",
		growth: "Stocky, wide-leaf frame",
		aroma: ["hot rubber", "forest floor"],
		effect: "Heavy, peculiar body calm",
		strengths: ["stability", "body"],
		weakness: "polarizing aroma",
		recessive: "sweet fennel",
		breedingValue: 8,
		color: "#748c3b",
		traits: {
			stability: 10,
			body: 9,
			stemStrength: 9,
			aroma: 8,
			clarity: 3
		}
	}),
	parent({
		id: "violet-static",
		name: "Violet Static",
		lineage: "Blue Funeral × Neon Rootbeer",
		generation: "F2",
		stability: 5,
		sex: "Reversed",
		growth: "Medium height, sharp branching",
		aroma: ["violet candy", "cold metal"],
		effect: "Dreamy but articulate",
		strengths: ["color", "outliers"],
		weakness: "segregates widely",
		recessive: "blackberry skin",
		breedingValue: 9,
		color: "#a765ff",
		traits: {
			color: 10,
			aroma: 8,
			clarity: 7,
			stability: 4,
			breeding: 9
		}
	}),
	parent({
		id: "lunar-glue",
		name: "Lunar Glue",
		lineage: "Rubber Halo × Rotten Stardust",
		generation: "BX2",
		stability: 8,
		sex: "Female",
		growth: "Dense, low-slung canopy",
		aroma: ["mineral glue", "burnt sugar"],
		effect: "Deep orbital body drift",
		strengths: ["resin", "density"],
		weakness: "mold sensitivity",
		recessive: "lime peel",
		breedingValue: 8,
		color: "#c8d1df",
		traits: {
			resin: 10,
			yield: 8,
			body: 10,
			moldResistance: 3,
			clarity: 3
		}
	}),
	parent({
		id: "cathedral-haze",
		name: "Cathedral Haze",
		lineage: "Temple Fuel × Pine Tar Oracle",
		generation: "F5",
		stability: 7,
		sex: "Pollen",
		growth: "Tall candelabra architecture",
		aroma: ["incense", "lemon pith"],
		effect: "Expansive, soaring contemplation",
		strengths: ["effect", "branching"],
		weakness: "slow flower",
		recessive: "cedar smoke",
		breedingValue: 9,
		color: "#b7d36b",
		traits: {
			height: 10,
			branching: 9,
			effect: 10,
			clarity: 9,
			flowerSpeed: 3
		}
	}),
	parent({
		id: "cherry-brake-fluid",
		name: "Cherry Brake Fluid",
		lineage: "Ghost Cola × Rubber Halo",
		generation: "F3",
		stability: 6,
		sex: "Female",
		growth: "Vigorous with stout rails",
		aroma: ["black cherry", "brake fluid"],
		effect: "Warm euphoria with weight",
		strengths: ["flavor", "stem strength"],
		weakness: "nutrient fussy",
		recessive: "cocoa husk",
		breedingValue: 8,
		color: "#cc3f57",
		traits: {
			flavor: 10,
			aroma: 9,
			stemStrength: 9,
			body: 7,
			stress: 4
		}
	}),
	parent({
		id: "neon-rootbeer",
		name: "Neon Rootbeer",
		lineage: "Ghost Cola × Lime Television",
		generation: "F4",
		stability: 7,
		sex: "Reversed",
		growth: "Even, medium-height spears",
		aroma: ["root beer foam", "lime zest"],
		effect: "Buoyant and conversational",
		strengths: ["complexity", "consistency"],
		weakness: "average yield",
		recessive: "wintergreen",
		breedingValue: 8,
		color: "#77ffbd",
		traits: {
			aroma: 9,
			flavor: 9,
			stability: 8,
			clarity: 8,
			yield: 5
		}
	}),
	parent({
		id: "pine-tar-oracle",
		name: "Pine Tar Oracle",
		lineage: "Cathedral Haze × Velvet Chainsaw",
		generation: "IBL",
		stability: 9,
		sex: "Pollen",
		growth: "Rugged open-frame branches",
		aroma: ["pine tar", "old books"],
		effect: "Focused, prophetic stillness",
		strengths: ["resilience", "breeding value"],
		weakness: "plain bag appeal",
		recessive: "aniseed",
		breedingValue: 10,
		color: "#5b8f54",
		traits: {
			stress: 10,
			moldResistance: 9,
			breeding: 10,
			color: 3,
			clarity: 9
		}
	}),
	parent({
		id: "solar-flare-f3",
		name: "Solar Flare F3",
		lineage: "Apollo Afterburner × Electric Mango",
		generation: "F3",
		stability: 6,
		sex: "Female",
		growth: "Explosive early vigor",
		aroma: ["hot tangerine", "sun-warmed vinyl"],
		effect: "Fast creative ignition",
		strengths: ["vigor", "energy"],
		weakness: "stretch",
		recessive: "pink grapefruit",
		breedingValue: 9,
		color: "#ff814a",
		traits: {
			vigor: 10,
			height: 9,
			aroma: 9,
			effect: 9,
			body: 3
		}
	}),
	parent({
		id: "blue-funeral",
		name: "Blue Funeral",
		lineage: "Violet Static × Pine Tar Oracle",
		generation: "F4",
		stability: 8,
		sex: "Female",
		growth: "Compact, solemn columns",
		aroma: ["blueberry skin", "church incense"],
		effect: "Quiet emotional warmth",
		strengths: ["color", "smoothness"],
		weakness: "slow rooting",
		recessive: "blue latex",
		breedingValue: 8,
		color: "#5975d9",
		traits: {
			color: 10,
			flavor: 8,
			body: 8,
			clonePerformance: 3,
			stability: 8
		}
	}),
	parent({
		id: "tangerine-machine",
		name: "Tangerine Machine",
		lineage: "Electric Mango × Solar Flare F3",
		generation: "F5",
		stability: 8,
		sex: "Pollen",
		growth: "Uniform racing-green towers",
		aroma: ["tangerine oil", "machine shop"],
		effect: "Precise daytime momentum",
		strengths: ["aroma", "speed"],
		weakness: "light body",
		recessive: "carrot seed",
		breedingValue: 9,
		color: "#ef8f29",
		traits: {
			aroma: 10,
			flowerSpeed: 8,
			clarity: 10,
			body: 2,
			stability: 8
		}
	}),
	parent({
		id: "rubber-halo",
		name: "Rubber Halo",
		lineage: "Roadkill Wizard × Lunar Glue",
		generation: "BX1",
		stability: 7,
		sex: "Reversed",
		growth: "Thick stems, halo branching",
		aroma: ["new tire", "vanilla dust"],
		effect: "Centered physical ease",
		strengths: ["resin", "stems"],
		weakness: "slow germination",
		recessive: "marshmallow root",
		breedingValue: 8,
		color: "#b6b1a5",
		traits: {
			resin: 9,
			stemStrength: 10,
			body: 8,
			vigor: 4,
			breeding: 8
		}
	}),
	parent({
		id: "temple-fuel",
		name: "Temple Fuel",
		lineage: "Cathedral Haze × Apollo Afterburner",
		generation: "F4",
		stability: 7,
		sex: "Pollen",
		growth: "Tall with disciplined spacing",
		aroma: ["sandalwood", "aviation fuel"],
		effect: "Clear ceremonial lift",
		strengths: ["clarity", "structure"],
		weakness: "long flower",
		recessive: "candied ginger",
		breedingValue: 9,
		color: "#d6ab58",
		traits: {
			clarity: 10,
			branching: 8,
			stemStrength: 8,
			flowerSpeed: 3,
			effect: 9
		}
	}),
	parent({
		id: "rotten-stardust",
		name: "Rotten Stardust",
		lineage: "Cosmic Lunchbox × Blue Funeral",
		generation: "F2",
		stability: 4,
		sex: "Female",
		growth: "Erratic, often spectacular",
		aroma: ["overripe fruit", "cold stone"],
		effect: "Strange time dilation",
		strengths: ["novelty", "outliers"],
		weakness: "unstable",
		recessive: "fermented papaya",
		breedingValue: 9,
		color: "#df5d9b",
		traits: {
			aroma: 9,
			effect: 9,
			breeding: 10,
			stability: 2,
			vigor: 5
		}
	}),
	parent({
		id: "ghost-cola",
		name: "Ghost Cola",
		lineage: "Neon Rootbeer × Blue Funeral",
		generation: "F5",
		stability: 8,
		sex: "Reversed",
		growth: "Pale, symmetrical bushes",
		aroma: ["cola syrup", "chalk dust"],
		effect: "Soft-focus social ease",
		strengths: ["symmetry", "flavor"],
		weakness: "moderate resin",
		recessive: "lemon mineral water",
		breedingValue: 7,
		color: "#b6e3dd",
		traits: {
			branching: 9,
			flavor: 9,
			clarity: 7,
			resin: 5,
			stability: 9
		}
	}),
	parent({
		id: "cosmic-lunchbox",
		name: "Cosmic Lunchbox",
		lineage: "Lime Television × Burnt Sugar Comet",
		generation: "F3",
		stability: 5,
		sex: "Female",
		growth: "Compact with oversized fans",
		aroma: ["fruit snack", "aluminum"],
		effect: "Goofy creative drift",
		strengths: ["novel aroma", "yield"],
		weakness: "weak stems",
		recessive: "peanut shell",
		breedingValue: 8,
		color: "#72d4d0",
		traits: {
			yield: 9,
			aroma: 9,
			effect: 8,
			stemStrength: 3,
			stability: 5
		}
	}),
	parent({
		id: "burnt-sugar-comet",
		name: "Burnt Sugar Comet",
		lineage: "Lunar Glue × Solar Flare F3",
		generation: "F4",
		stability: 7,
		sex: "Pollen",
		growth: "Fast, resinous spears",
		aroma: ["torched caramel", "orange peel"],
		effect: "Warm rush into soft gravity",
		strengths: ["resin", "flower speed"],
		weakness: "average mold resistance",
		recessive: "coffee cherry",
		breedingValue: 8,
		color: "#cf6f35",
		traits: {
			resin: 10,
			flowerSpeed: 8,
			aroma: 8,
			body: 8,
			moldResistance: 4
		}
	}),
	parent({
		id: "lime-television",
		name: "Lime Television",
		lineage: "Electric Mango × Cathedral Haze",
		generation: "F3",
		stability: 6,
		sex: "Reversed",
		growth: "Angular satellite branches",
		aroma: ["lime static", "warm circuitry"],
		effect: "High-definition focus",
		strengths: ["clarity", "rare notes"],
		weakness: "low yield",
		recessive: "green peppercorn",
		breedingValue: 9,
		color: "#a9ef45",
		traits: {
			clarity: 10,
			aroma: 9,
			breeding: 9,
			yield: 3,
			branching: 8
		}
	}),
	parent({
		id: "velvet-chainsaw",
		name: "Velvet Chainsaw",
		lineage: "Roadkill Wizard × Cherry Brake Fluid",
		generation: "F4",
		stability: 7,
		sex: "Pollen",
		growth: "Aggressive branching, soft finish",
		aroma: ["red velvet", "two-stroke exhaust"],
		effect: "Powerful body calm without fog",
		strengths: ["effect", "stems"],
		weakness: "stretch under stress",
		recessive: "rosewood",
		breedingValue: 9,
		color: "#b83c63",
		traits: {
			body: 9,
			clarity: 7,
			stemStrength: 9,
			stress: 5,
			flavor: 8
		}
	}),
	parent({
		id: "amber-antenna",
		name: "Amber Antenna",
		lineage: "Temple Fuel × Ghost Cola",
		generation: "F6",
		stability: 9,
		sex: "Female",
		growth: "Ordered antenna-like laterals",
		aroma: ["amber resin", "cola spice"],
		effect: "Patient, lucid calm",
		strengths: ["stability", "structure"],
		weakness: "restrained aroma",
		recessive: "dried apricot",
		breedingValue: 8,
		color: "#e3a43b",
		traits: {
			stability: 10,
			branching: 10,
			stemStrength: 8,
			aroma: 5,
			clarity: 9
		}
	}),
	parent({
		id: "pepper-moon",
		name: "Pepper Moon",
		lineage: "Lime Television × Violet Static",
		generation: "F2",
		stability: 4,
		sex: "Reversed",
		growth: "Thin-leaf crescent canopy",
		aroma: ["pink pepper", "violet rind"],
		effect: "Electric lateral thinking",
		strengths: ["novelty", "color"],
		weakness: "temperamental clones",
		recessive: "melon rind",
		breedingValue: 9,
		color: "#db8be8",
		traits: {
			color: 9,
			aroma: 9,
			effect: 9,
			clonePerformance: 3,
			stability: 3
		}
	}),
	parent({
		id: "cedar-signal",
		name: "Cedar Signal",
		lineage: "Pine Tar Oracle × Neon Rootbeer",
		generation: "F5",
		stability: 8,
		sex: "Pollen",
		growth: "Balanced open Christmas-tree form",
		aroma: ["cedar box", "radio ozone"],
		effect: "Signal-clear composure",
		strengths: ["resilience", "clarity"],
		weakness: "modest color",
		recessive: "juniper soda",
		breedingValue: 8,
		color: "#6daa6a",
		traits: {
			stress: 9,
			moldResistance: 9,
			clarity: 9,
			color: 3,
			branching: 8
		}
	}),
	parent({
		id: "plasma-peach",
		name: "Plasma Peach",
		lineage: "Electric Mango × Violet Static",
		generation: "F3",
		stability: 6,
		sex: "Female",
		growth: "Bright petioles, medium frame",
		aroma: ["white peach", "hot plasma"],
		effect: "Playful euphoric lift",
		strengths: ["flavor", "color"],
		weakness: "soft finish",
		recessive: "peach pit",
		breedingValue: 8,
		color: "#ff9c91",
		traits: {
			flavor: 10,
			color: 9,
			effect: 9,
			stemStrength: 4,
			aroma: 9
		}
	})
];
var femaleParents = parents.filter((item) => item.sex !== "Pollen");
var pollenParents = parents.filter((item) => item.sex !== "Female");
function getParent(id) {
	return parents.find((item) => item.id === id) ?? parents[0];
}
//#endregion
//#region engine/random.ts
function hashSeed(input) {
	let hash = 2166136261;
	for (let index = 0; index < input.length; index += 1) {
		hash ^= input.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
function seededRandom(seed) {
	let state = hashSeed(seed) || 2654435769;
	return () => {
		state |= 0;
		state = state + 1831565813 | 0;
		let value = Math.imul(state ^ state >>> 15, 1 | state);
		value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
		return ((value ^ value >>> 14) >>> 0) / 4294967296;
	};
}
function pick(random, values) {
	return values[Math.floor(random() * values.length)] ?? values[0];
}
function clamp(value, minimum = 1, maximum = 10) {
	return Math.max(minimum, Math.min(maximum, Math.round(value * 10) / 10));
}
//#endregion
//#region engine/genetics.ts
var traitKeys = [
	"vigor",
	"height",
	"branching",
	"stemStrength",
	"resin",
	"yield",
	"flowerSpeed",
	"aroma",
	"flavor",
	"effect",
	"clarity",
	"body",
	"color",
	"stability",
	"breeding",
	"stress",
	"moldResistance",
	"clonePerformance"
];
var aromaFamilies = [
	"citrus voltage",
	"fermented fruit",
	"forest resin",
	"cold mineral",
	"dessert spice",
	"rubber funk",
	"incense haze",
	"cola botanical",
	"tropical static",
	"floral metal"
];
var rareNotes = [
	"green mango skin",
	"hot vinyl",
	"cedar smoke",
	"violet rind",
	"aluminum lunchbox",
	"burnt caramel",
	"pink pepper",
	"chalk dust",
	"wintergreen foam",
	"coffee cherry",
	"melon rind",
	"carrot seed"
];
var effectProfiles = [
	"lucid acceleration",
	"warm gravitational calm",
	"social sparkle",
	"creative tunnel vision",
	"dreamlike clarity",
	"body-first stillness",
	"patient euphoria",
	"playful time dilation"
];
var colors = [
	"electric lime",
	"midnight violet",
	"amber frost",
	"blue-green",
	"wine petiole",
	"silver sage",
	"near-black plum",
	"radioactive chartreuse"
];
var mutations = [
	"spiral phyllotaxy",
	"variegated first leaf",
	"double serration",
	"fasciated branch",
	"velvet petiole"
];
var linkages = [
	"extreme aroma ↔ softer stems",
	"fast finish ↔ lighter yield",
	"high resin ↔ slower vigor",
	"deep color ↔ stress sensitivity",
	"soaring clarity ↔ longer flower",
	"dense flower ↔ lower mold resistance"
];
function weightedGoalScore(traits, goalId) {
	const goal = goals.find((item) => item.id === goalId) ?? goals[0];
	let total = 0;
	let weightTotal = 0;
	for (const [key, weight] of Object.entries(goal.weights)) {
		total += traits[key] * weight;
		weightTotal += Math.abs(weight);
	}
	return clamp(total / Math.max(1, weightTotal), 0, 10);
}
function classifyRarity(plant) {
	const coherent = plant.goalScore + plant.traits.breeding / 3 + (plant.mutation ? .7 : 0) - (plant.traits.stability < 3 ? .8 : 0);
	if (coherent >= 12.4) return "Legendary Expression";
	if (coherent >= 11.6) return "Genetic Outlier";
	if (coherent >= 10.8) return "Breeding Cornerstone";
	if (coherent >= 10) return "Elite Keeper";
	if (coherent >= 9.1) return "Rare Recombinant";
	if (coherent >= 8.2) return "Strong Candidate";
	if (coherent >= 7.2) return "Useful Expression";
	return "Common Expression";
}
function inheritTrait(random, female, pollen, key, segregation) {
	const parentBias = .38 + random() * .24;
	const midpoint = female.traits[key] * parentBias + pollen.traits[key] * (1 - parentBias);
	const stability = (female.stability + pollen.stability) / 20;
	const noise = (random() - .5) * segregation * (1.25 - stability * .45);
	const hybridVigor = key === "vigor" || key === "branching" ? random() * .7 : 0;
	return clamp(midpoint + noise + hybridVigor);
}
function generatePopulation(seed, femaleId, pollenId, goalId, count = 12, generationType = "F1") {
	const female = getParent(femaleId);
	const pollen = getParent(pollenId);
	const random = seededRandom(`${seed}:${female.id}:${pollen.id}:${generationType}`);
	const segregation = generationType === "F2" ? 5.2 : 3.2;
	return Array.from({ length: count }, (_, index) => {
		const traits = Object.fromEntries(traitKeys.map((key) => [key, inheritTrait(random, female, pollen, key, segregation)]));
		const mutation = random() < (generationType === "F2" ? .13 : .07) ? pick(random, mutations) : null;
		const linkage = random() < .32 ? pick(random, linkages) : null;
		if (linkage?.startsWith("extreme aroma")) traits.stemStrength = clamp(traits.stemStrength - .8);
		if (linkage?.startsWith("fast finish")) traits.yield = clamp(traits.yield - .7);
		if (linkage?.startsWith("high resin")) traits.vigor = clamp(traits.vigor - .7);
		if (linkage?.startsWith("deep color")) traits.stress = clamp(traits.stress - .8);
		if (linkage?.startsWith("soaring clarity")) traits.flowerSpeed = clamp(traits.flowerSpeed - .8);
		if (linkage?.startsWith("dense flower")) traits.moldResistance = clamp(traits.moldResistance - .9);
		const plant = {
			id: `P-${String(index + 1).padStart(2, "0")}`,
			index,
			status: "active",
			tagged: false,
			cloned: false,
			notes: "",
			traits,
			aromaFamily: random() < .32 ? pick(random, female.aroma) : random() < .48 ? pick(random, pollen.aroma) : pick(random, aromaFamilies),
			rareNote: random() < .4 ? pick(random, rareNotes) : "not yet resolved",
			effectProfile: pick(random, effectProfiles),
			colorName: pick(random, colors),
			mutation,
			linkage,
			rarity: "Common Expression",
			goalScore: weightedGoalScore(traits, goalId),
			seedOffset: Math.floor(random() * 1e5)
		};
		plant.rarity = classifyRarity(plant);
		return plant;
	});
}
function visibleTraitKeys(phase, flowerWeek, testsCompleted) {
	const early = [
		"vigor",
		"height",
		"stress"
	];
	if (phase === "seedling") return early;
	const vegetative = [
		...early,
		"branching",
		"stemStrength",
		"clonePerformance"
	];
	if (phase === "vegetative") return vegetative;
	const flower = [
		...vegetative,
		"flowerSpeed",
		"yield",
		"color"
	];
	if (phase === "flower") return flowerWeek >= 4 ? [
		...flower,
		"resin",
		"moldResistance"
	] : flower;
	const harvest = [
		...flower,
		"resin",
		"moldResistance"
	];
	if (phase === "harvest" || phase === "cure") return harvest;
	const testing = [...harvest];
	if (testsCompleted.includes("Stem rub") || testsCompleted.includes("Jar aroma")) testing.push("aroma");
	if (testsCompleted.includes("Flavor evaluation")) testing.push("flavor");
	if (testsCompleted.includes("Effect timeline")) testing.push("effect", "clarity", "body", "stability", "breeding");
	return phase === "keeper" || phase === "complete" ? traitKeys : testing;
}
function makeNameSuggestions(plant, femaleName, pollenName) {
	const first = femaleName.split(" ")[0];
	const second = pollenName.split(" ").at(-1) ?? "Signal";
	return [
		`${plant.rareNote === "not yet resolved" ? plant.aromaFamily.split(" ")[0] : plant.rareNote.split(" ")[0]} Meridian`,
		`${first} Lunchbreak`,
		`${second} Reserve`,
		`Static ${plant.colorName.split(" ").at(-1)}`,
		`Unlicensed Weather`,
		`${first} × ${second} No. ${plant.index + 1}`
	];
}
//#endregion
//#region engine/game.ts
var now = () => (/* @__PURE__ */ new Date()).toISOString();
function randomRunSeed() {
	return `KEEP-${Date.now().toString(36).slice(-5).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function createGame(femaleParentId, pollenParentId, goalId, runSeed, hallOfFame = []) {
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
		resources: {
			funds: 2400,
			research: 5,
			reputation: 0,
			cloneCapacity: 3
		},
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
		updatedAt: now()
	};
}
function updatePlant(state, plantId, updater) {
	return state.plants.map((plant) => plant.id === plantId ? updater(plant) : plant);
}
function withUpdate(state, patch, log) {
	return {
		...state,
		...patch,
		actionLog: log ? [log, ...state.actionLog].slice(0, 30) : state.actionLog,
		updatedAt: now()
	};
}
function activeCount(state) {
	return state.plants.filter((plant) => plant.status === "active" || plant.status === "keeper").length;
}
function adjustAll(state, changes) {
	return state.plants.map((plant) => {
		if (plant.status === "culled") return plant;
		const traits = { ...plant.traits };
		for (const [key, change] of Object.entries(changes)) traits[key] = clamp(traits[key] + change);
		return {
			...plant,
			traits
		};
	});
}
function canAdvance(state) {
	if (state.phase === "seedling" && !state.plants.some((plant) => plant.status === "culled")) return {
		allowed: false,
		reason: "Cull at least one seedling to prove the first selection."
	};
	if (state.phase === "vegetative" && !state.plants.some((plant) => plant.cloned && plant.status !== "culled")) return {
		allowed: false,
		reason: "Take at least one backup clone before flower."
	};
	if (state.phase === "flower" && state.activeEventId) return {
		allowed: false,
		reason: "Resolve the active garden event before advancing."
	};
	if (activeCount(state) === 0) return {
		allowed: false,
		reason: "No active plants remain. Undo the last cull or start a new hunt."
	};
	return {
		allowed: true,
		reason: "Ready."
	};
}
function reduceGame(state, action) {
	switch (action.type) {
		case "SELECT_PLANT": return withUpdate(state, { selectedPlantId: action.plantId });
		case "TOGGLE_COMPARE": {
			const exists = state.compareIds.includes(action.plantId);
			return withUpdate(state, {
				compareIds: exists ? state.compareIds.filter((id) => id !== action.plantId) : state.compareIds.length < 4 ? [...state.compareIds, action.plantId] : state.compareIds,
				notice: !exists && state.compareIds.length >= 4 ? "Comparison is limited to four plants." : state.notice
			});
		}
		case "TOGGLE_TAG": return withUpdate(state, { plants: updatePlant(state, action.plantId, (plant) => ({
			...plant,
			tagged: !plant.tagged
		})) }, `Tag ${action.plantId} updated.`);
		case "SET_NOTES": return withUpdate(state, { plants: updatePlant(state, action.plantId, (plant) => ({
			...plant,
			notes: action.notes.slice(0, 280)
		})) });
		case "CULL": {
			const target = state.plants.find((plant) => plant.id === action.plantId);
			if (!target || target.status !== "active") return state;
			if (activeCount(state) <= 1) return withUpdate(state, { notice: "The last active plant cannot be culled. Every hunt needs a survivor." });
			const nextSelected = state.plants.find((plant) => plant.id !== action.plantId && plant.status === "active")?.id ?? state.selectedPlantId;
			return withUpdate(state, {
				plants: updatePlant(state, action.plantId, (plant) => ({
					...plant,
					status: "culled"
				})),
				selectedPlantId: nextSelected,
				compareIds: state.compareIds.filter((id) => id !== action.plantId),
				lastCulledId: action.plantId,
				notice: `${action.plantId} moved to the cull archive. Undo remains available until another cull.`
			}, `${action.plantId} culled during ${state.phase}.`);
		}
		case "UNDO_CULL": {
			if (!state.lastCulledId) return withUpdate(state, { notice: "There is no recent cull to undo." });
			const id = state.lastCulledId;
			return withUpdate(state, {
				plants: updatePlant(state, id, (plant) => ({
					...plant,
					status: "active"
				})),
				selectedPlantId: id,
				lastCulledId: null,
				notice: `${id} returned to the active population.`
			}, `${id} restored from the cull archive.`);
		}
		case "CLONE": {
			const target = state.plants.find((plant) => plant.id === action.plantId);
			if (!target || target.status !== "active" || target.cloned) return state;
			if (state.phase !== "vegetative" && state.phase !== "flower") return withUpdate(state, { notice: "Clones can only be reserved during vegetative growth or early flower." });
			if (state.plants.filter((plant) => plant.cloned && plant.status !== "culled").length >= state.resources.cloneCapacity) return withUpdate(state, { notice: "Clone library is full. Cull another backup or continue with the existing library." });
			if (state.resources.funds < 90) return withUpdate(state, { notice: "A clone reservation costs $90; funds are too low." });
			return withUpdate(state, {
				plants: updatePlant(state, action.plantId, (plant) => ({
					...plant,
					cloned: true
				})),
				resources: {
					...state.resources,
					funds: state.resources.funds - 90
				},
				notice: `Backup clone ${action.plantId}-C1 rooted successfully.`
			}, `${action.plantId} cloned for $90.`);
		}
		case "ADVANCE": {
			const permission = canAdvance(state);
			if (!permission.allowed) return withUpdate(state, { notice: permission.reason });
			if (state.phase === "seedling") return withUpdate(state, {
				phase: "vegetative",
				week: 2,
				notice: "Vegetative structure is now legible. Find one plant worth backing up before the flip."
			}, "Population advanced to vegetative evaluation.");
			if (state.phase === "vegetative") return withUpdate(state, {
				phase: "flower",
				week: 1,
				notice: "Flower week 1. Stretch is beginning; the final sensory identity remains hidden."
			}, "Selected population entered flower.");
			if (state.phase === "flower") {
				if (state.week >= 5) return withUpdate(state, {
					phase: "harvest",
					notice: "The harvest window is open. Choose timing according to the original project—not appearance alone."
				}, "Flower cycle completed.");
				const nextWeek = state.week + 1;
				const shouldEvent = nextWeek === 2 && state.resolvedEvents.length === 0;
				const event = events[hashSeed(state.runSeed) % events.length];
				return withUpdate(state, {
					week: nextWeek,
					activeEventId: shouldEvent ? event.id : null,
					notice: shouldEvent ? `${event.title}: a decision is required.` : `Flower week ${nextWeek}. New traits have resolved in the notebook.`
				}, `Advanced to flower week ${nextWeek}.`);
			}
			return state;
		}
		case "RESOLVE_EVENT": {
			if (state.activeEventId !== action.eventId) return state;
			const event = events.find((item) => item.id === action.eventId);
			const choice = event?.choices.find((item) => item.id === action.choiceId);
			if (!event || !choice) return state;
			if ((choice.funds ?? 0) < 0 && state.resources.funds + (choice.funds ?? 0) < 0) return withUpdate(state, { notice: "That response costs more funds than the project has available." });
			if ((choice.research ?? 0) < 0 && state.resources.research + (choice.research ?? 0) < 0) return withUpdate(state, { notice: "That response needs more research points." });
			return withUpdate(state, {
				plants: choice.plantEffect ? adjustAll(state, choice.plantEffect) : state.plants,
				activeEventId: null,
				resolvedEvents: [...state.resolvedEvents, event.id],
				resources: {
					...state.resources,
					funds: state.resources.funds + (choice.funds ?? 0),
					research: state.resources.research + (choice.research ?? 0),
					reputation: state.resources.reputation + (choice.reputation ?? 0)
				},
				notice: `Decision recorded: ${choice.label}. The room moves on.`
			}, `${event.title}: ${choice.label}.`);
		}
		case "CHOOSE_HARVEST":
			if (state.phase !== "harvest") return state;
			return withUpdate(state, {
				plants: adjustAll(state, action.choice === "early" ? {
					aroma: .3,
					yield: -.5,
					clarity: .4
				} : action.choice === "late" ? {
					yield: .5,
					body: .5,
					clarity: -.3
				} : {
					flavor: .3,
					stability: .2
				}),
				harvestChoice: action.choice,
				phase: "cure",
				notice: `${action.choice[0].toUpperCase() + action.choice.slice(1)} harvest locked. Choose a cure strategy to reveal the final sensory field.`
			}, `${action.choice} harvest selected.`);
		case "CHOOSE_CURE":
			if (state.phase !== "cure") return state;
			return withUpdate(state, {
				plants: adjustAll(state, action.choice === "fast" ? {
					flavor: -.4,
					aroma: .1
				} : action.choice === "slow" ? {
					flavor: .6,
					aroma: .3,
					stability: -.1
				} : {
					flavor: .3,
					aroma: .2
				}),
				cureChoice: action.choice,
				phase: "testing",
				testsCompleted: [],
				notice: "Cure complete. Begin with the stem rub and move through the sensory sequence."
			}, `${action.choice} cure completed.`);
		case "RUN_TEST": {
			if (state.phase !== "testing") return state;
			const next = testSequence[state.testsCompleted.length];
			if (!next) return state;
			const completed = [...state.testsCompleted, next];
			const finished = completed.length === testSequence.length;
			return withUpdate(state, {
				testsCompleted: completed,
				phase: finished ? "keeper" : "testing",
				notice: finished ? "Every report is in. Appearance has lost its monopoly—choose the keeper you will remember." : `${next} complete. ${testSequence[completed.length]} is next.`
			}, `${next} completed across ${activeCount(state)} candidates.`);
		}
		case "SELECT_KEEPER":
			if (state.phase !== "keeper") return state;
			if (!state.plants.find((plant) => plant.id === action.plantId && plant.status === "active")) return state;
			return withUpdate(state, {
				plants: state.plants.map((plant) => ({
					...plant,
					status: plant.id === action.plantId ? "keeper" : plant.status
				})),
				keeperId: action.plantId,
				selectedPlantId: action.plantId,
				notice: `${action.plantId} is marked as keeper. Give the cultivar a name and choose its next breeding step.`
			}, `${action.plantId} selected as keeper.`);
		case "NAME_KEEPER": return withUpdate(state, { keeperName: action.name.slice(0, 48) });
		case "COMPLETE_LINE": {
			if (!state.keeperId) return withUpdate(state, { notice: "Select a keeper before continuing the line." });
			const cleanName = state.keeperName.trim();
			if (!cleanName) return withUpdate(state, { notice: "The keeper needs a name before it can enter the archive." });
			const keeper = state.plants.find((plant) => plant.id === state.keeperId);
			if (!keeper) return state;
			const goal = goals.find((item) => item.id === state.goalId)?.name ?? state.goalId;
			const entry = {
				id: `${state.runSeed}-${keeper.id}`,
				name: cleanName,
				parentage: `${getParent(state.femaleParentId).name} × ${getParent(state.pollenParentId).name}`,
				generation: state.generation,
				discoveryDate: (/* @__PURE__ */ new Date()).toISOString(),
				goal,
				aroma: `${keeper.aromaFamily}; ${keeper.rareNote}`,
				flavor: `${keeper.traits.flavor}/10 persistence`,
				effects: keeper.effectProfile,
				growth: `${keeper.colorName}, branching ${keeper.traits.branching}/10`,
				awards: [keeper.rarity, keeper.goalScore >= 8.5 ? "Project target hit" : "Breeder's choice"],
				notes: keeper.notes || "Selected after the complete Quick Hunt evaluation.",
				descendants: `${action.method} population queued`,
				seed: state.runSeed,
				color: getParent(state.femaleParentId).color,
				plantId: keeper.id
			};
			const achievements = state.achievements.includes("First Keeper") ? state.achievements : [...state.achievements, "First Keeper"];
			return withUpdate(state, {
				phase: "complete",
				generation: 2,
				nextGenerationMethod: action.method,
				keeperName: cleanName,
				hallOfFame: [entry, ...state.hallOfFame.filter((item) => item.id !== entry.id)],
				achievements,
				resources: {
					...state.resources,
					reputation: state.resources.reputation + 3
				},
				notice: `${cleanName} is secured. A ${action.method} record now begins Generation 2.`
			}, `${cleanName} archived; ${action.method} selected for Generation 2.`);
		}
		case "CLEAR_NOTICE": return withUpdate(state, { notice: "" });
		default: return state;
	}
}
function validateGameState(value) {
	if (!value || typeof value !== "object") return false;
	const state = value;
	return state.schemaVersion === 1 && typeof state.runSeed === "string" && Array.isArray(state.plants) && state.plants.length > 0 && typeof state.phase === "string" && Array.isArray(state.hallOfFame);
}
//#endregion
//#region hooks/useGameAudio.ts
function useGameAudio() {
	const [muted, setMuted] = (0, import_react.useState)(true);
	const [volume, setVolume] = (0, import_react.useState)(.35);
	const contextRef = (0, import_react.useRef)(null);
	const humRef = (0, import_react.useRef)(null);
	const ensureContext = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined") return null;
		const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
		if (!AudioContextClass) return null;
		contextRef.current ??= new AudioContextClass();
		return contextRef.current;
	}, []);
	const click = (0, import_react.useCallback)((kind = "soft") => {
		if (muted) return;
		const context = ensureContext();
		if (!context) return;
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		oscillator.type = kind === "keeper" ? "sine" : "triangle";
		oscillator.frequency.value = kind === "keeper" ? 392 : kind === "reveal" ? 520 : 240;
		gain.gain.setValueAtTime(Math.max(.001, volume * .09), context.currentTime);
		gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + (kind === "keeper" ? .7 : .12));
		oscillator.connect(gain).connect(context.destination);
		oscillator.start();
		oscillator.stop(context.currentTime + (kind === "keeper" ? .72 : .14));
	}, [
		ensureContext,
		muted,
		volume
	]);
	(0, import_react.useEffect)(() => {
		if (muted) {
			humRef.current?.stop();
			humRef.current = null;
			return;
		}
		const context = ensureContext();
		if (!context || humRef.current) return;
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		oscillator.type = "sine";
		oscillator.frequency.value = 54;
		gain.gain.value = volume * .012;
		oscillator.connect(gain).connect(context.destination);
		oscillator.start();
		humRef.current = oscillator;
		return () => {
			try {
				oscillator.stop();
			} catch {}
			humRef.current = null;
		};
	}, [
		ensureContext,
		muted,
		volume
	]);
	return {
		muted,
		setMuted,
		volume,
		setVolume,
		click,
		supported: typeof window === "undefined" || Boolean(window.AudioContext)
	};
}
//#endregion
//#region lib/save.ts
var AUTOSAVE_KEY = "phenohunter.autosave.v1";
var HALL_KEY = "phenohunter.hall.v1";
function storageAvailable() {
	try {
		return typeof window !== "undefined" && Boolean(window.localStorage);
	} catch {
		return false;
	}
}
function autosave(state) {
	if (!storageAvailable()) return false;
	try {
		const envelope = {
			schemaVersion: 1,
			label: "Autosave",
			savedAt: (/* @__PURE__ */ new Date()).toISOString(),
			state
		};
		window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(envelope));
		window.localStorage.setItem(HALL_KEY, JSON.stringify(state.hallOfFame));
		return true;
	} catch {
		return false;
	}
}
function loadAutosave() {
	if (!storageAvailable()) return null;
	try {
		const raw = window.localStorage.getItem(AUTOSAVE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return parsed.schemaVersion === 1 && validateGameState(parsed.state) ? parsed.state : null;
	} catch {
		return null;
	}
}
function saveSlot(slot, state) {
	if (!storageAvailable() || slot < 1 || slot > 3) return;
	const envelope = {
		schemaVersion: 1,
		label: `Manual slot ${slot}`,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		state
	};
	window.localStorage.setItem(`phenohunter.slot.${slot}.v1`, JSON.stringify(envelope));
}
function loadSlot(slot) {
	if (!storageAvailable() || slot < 1 || slot > 3) return null;
	try {
		const parsed = JSON.parse(window.localStorage.getItem(`phenohunter.slot.${slot}.v1`) ?? "null");
		return parsed?.schemaVersion === 1 && validateGameState(parsed.state) ? parsed : null;
	} catch {
		return null;
	}
}
function deleteSlot(slot) {
	if (storageAvailable()) window.localStorage.removeItem(`phenohunter.slot.${slot}.v1`);
}
function exportSave(state) {
	const envelope = {
		schemaVersion: 1,
		label: "Exported hunt",
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		state
	};
	return JSON.stringify(envelope, null, 2);
}
function importSave(raw) {
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		throw new Error("This file is not valid JSON.");
	}
	const candidate = parsed?.state ?? parsed;
	if (!validateGameState(candidate)) throw new Error("This save is corrupted or uses an unsupported schema.");
	return candidate;
}
//#endregion
//#region components/plants/PlantPortrait.tsx
var import_jsx_runtime = require_jsx_runtime();
function PlantPortrait({ plant, phase, week, compact = false }) {
	const maturity = phase === "seedling" ? .48 : phase === "vegetative" ? .72 : phase === "flower" ? .78 + week * .035 : 1;
	const height = Math.round((58 + plant.traits.height * 4.6) * maturity);
	const spread = Math.round(28 + plant.traits.branching * 3.4);
	const leafCount = compact ? 4 : Math.max(4, Math.round(plant.traits.branching));
	const flowerCount = [
		"flower",
		"harvest",
		"cure",
		"testing",
		"keeper",
		"complete"
	].includes(phase) ? Math.max(2, Math.round((plant.traits.resin + week) / 2.7)) : 0;
	const hue = 82 + plant.index * 5 + plant.traits.color * 2;
	const style = {
		"--plant-height": `${height}px`,
		"--plant-spread": `${spread}px`,
		"--plant-hue": `${hue}`,
		"--plant-lean": `${plant.seedOffset % 9 - 4}deg`,
		"--leaf-width": `${9 + plant.traits.branching * .7}px`
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `plant-portrait ${compact ? "plant-portrait--compact" : ""} ${plant.status === "culled" ? "is-culled" : ""}`,
		style,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plant-aura" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plant-stem",
				children: [
					Array.from({ length: leafCount }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `plant-leaf plant-leaf--${index % 2 ? "right" : "left"}`,
						style: {
							bottom: `${13 + index * (height / (leafCount + 2))}px`,
							transform: `rotate(${index % 2 ? 24 + plant.seedOffset % 8 : -24 - plant.seedOffset % 8}deg) scale(${.72 + index / leafCount * .32})`
						}
					}, index)),
					Array.from({ length: flowerCount }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "plant-flower",
						style: {
							bottom: `${26 + index * Math.max(11, height / (flowerCount + 1))}px`,
							left: `${index % 2 ? spread / 5 : -spread / 5}px`,
							opacity: .62 + plant.traits.resin / 28
						}
					}, `flower-${index}`)),
					plant.mutation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plant-mutation" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plant-pot",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plant.id })
			})
		]
	});
}
//#endregion
//#region components/ui/Modal.tsx
function Modal({ title, eyebrow, onClose, children, wide = false }) {
	const dialogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const previous = document.activeElement;
		(dialogRef.current?.querySelector("button, input, textarea, select, a[href]"))?.focus();
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			previous?.focus();
		};
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `modal-card ${wide ? "modal-card--wide" : ""}`,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "modal-title",
			ref: dialogRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: eyebrow
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "modal-title",
					children: title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button",
					onClick: onClose,
					"aria-label": `Close ${title}`,
					children: "Close"
				})]
			}), children]
		})
	});
}
//#endregion
//#region components/game/GameShell.tsx
var traitLabels = {
	vigor: "Vigor",
	height: "Height",
	branching: "Branching",
	stemStrength: "Stem strength",
	resin: "Resin",
	yield: "Yield",
	flowerSpeed: "Flower speed",
	aroma: "Aroma",
	flavor: "Flavor",
	effect: "Effect",
	clarity: "Mental clarity",
	body: "Body",
	color: "Color expression",
	stability: "Stability",
	breeding: "Breeding value",
	stress: "Stress tolerance",
	moldResistance: "Mold resistance",
	clonePerformance: "Clone performance"
};
var stages = [
	"seedling",
	"vegetative",
	"flower",
	"harvest",
	"cure",
	"testing",
	"keeper",
	"complete"
];
var subscribeToHydration = () => () => void 0;
function Icon({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `glyph glyph--${name}`,
		"aria-hidden": "true"
	});
}
function StatPill({ label, value, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stat-pill",
		title: detail,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })]
	});
}
function ScoreBar({ label, value, unknown = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `score-row ${unknown ? "is-unknown" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "score-label",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: unknown ? "UNRESOLVED" : value.toFixed(1) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "score-track",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: unknown ? "18%" : `${value * 10}%` } })
		})]
	});
}
function Logo({ small = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `game-logo ${small ? "game-logo--small" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "logo-mark",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PHENOHUNTER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "THE LOST KEEPER" })] })]
	});
}
function AgeGate({ onAccept }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "entry-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "entry-atmosphere" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "age-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "age-sigil",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "21+" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Fictional genetics strategy game"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A plant-breeding roguelike about uncertain inheritance, scarce grow slots, and the phenotype you nearly overlooked." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "responsibility-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Adult acknowledgment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This is fictional entertainment—not cultivation guidance. Please follow the laws where you live and use cannabis responsibly." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary-button primary-button--large",
					onClick: onAccept,
					children: "I’m of legal age · Enter the lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No account, tracking, purchase, or real-world cultivation instruction." })
			]
		})]
	});
}
function MainMenu({ hasSave, onNew, onContinue, onHall }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "menu-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "menu-orb menu-orb--one" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "menu-orb menu-orb--two" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "menu-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Build 1.0 · Quick Hunt" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "menu-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "menu-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Every seed carries a possibility"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"Find the plant",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "you almost culled." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cross strange fictional genetics. Read incomplete evidence. Protect the right clones. Test every assumption. Name the one that survives your judgment." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "menu-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button primary-button--large",
									onClick: () => onNew(true),
									children: "Begin guided hunt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => onNew(false),
									children: "Skip tutorial"
								}),
								hasSave && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "text-button",
									onClick: onContinue,
									children: ["Continue autosave ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-specimen",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-ring hero-ring--a" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-ring hero-ring--b" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-plant",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-stem" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-leaf hero-leaf--6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-flower hero-flower--1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-flower hero-flower--2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-flower hero-flower--3" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "specimen-readout",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UNKNOWN EXPRESSION" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Signal acquired" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Identity awaits selection" })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mode-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mode-card mode-card--active",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PLAYABLE NOW" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Quick Hunt" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "12 plants · One complete cross · 20–30 min" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mode-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ARCHIVE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Hall of Fame" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Revisit retired keeper cultivars." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onHall,
								children: "Open archive"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mode-card mode-card--locked",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ROADMAP" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Career Mode" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Long-form companies, rivals, and reputation paths." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "community-callout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "GBS · Growers, Breeders, Smokers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Share run seeds, compare fictional phenotypes, and join community hunts." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://discord.gg/YxJYnnKWHf",
					target: "_blank",
					rel: "noreferrer",
					children: "Join the community ↗"
				})]
			})
		]
	});
}
function SetupScreen({ onBack, onStart }) {
	const [step, setStep] = (0, import_react.useState)(1);
	const [female, setFemale] = (0, import_react.useState)(femaleParents[0].id);
	const [pollen, setPollen] = (0, import_react.useState)(pollenParents[0].id);
	const [goal, setGoal] = (0, import_react.useState)("aroma");
	const [seed, setSeed] = (0, import_react.useState)(randomRunSeed());
	const [search, setSearch] = (0, import_react.useState)("");
	const pool = step === 1 ? femaleParents : pollenParents;
	const selectedId = step === 1 ? female : pollen;
	const visiblePool = pool.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.aroma.join(" ").toLowerCase().includes(search.toLowerCase()));
	const chosenFemale = getParent(female), chosenPollen = getParent(pollen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "setup-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "setup-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-button",
						onClick: onBack,
						children: "← Main menu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project protocol" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "setup-progress",
				"aria-label": `Setup step ${step} of 3`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: step >= 1 ? "active" : "",
						children: "01 · Seed parent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: step >= 2 ? "active" : "",
						children: "02 · Pollen parent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: step >= 3 ? "active" : "",
						children: "03 · Project goal"
					})
				]
			}),
			step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "setup-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "setup-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow",
								children: ["Select ", step === 1 ? "the seed parent" : "the pollen contributor"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: step === 1 ? "What anchors the cross?" : "Where does the disruption come from?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Parent tendencies shape probability, not destiny. Stability narrows the field; unstable lines create wider outliers." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "genetic-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "parent-search",
								children: "Search the genetic library"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "parent-search",
								value: search,
								onChange: (event) => setSearch(event.target.value),
								placeholder: "Name or aroma tendency…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [visiblePool.length, " lines"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "parent-grid",
						children: visiblePool.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `parent-card ${selectedId === item.id ? "is-selected" : ""}`,
							onClick: () => step === 1 ? setFemale(item.id) : setPollen(item.id),
							"aria-pressed": selectedId === item.id,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "parent-swatch",
									style: { background: item.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "parent-head",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											item.sex,
											" · ",
											item.generation
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.lineage })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.growth }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aroma-tags",
									children: item.aroma.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note }, note))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "parent-foot",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Stability ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.stability, "/10"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Breeding ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.breedingValue, "/10"] })] })]
								})
							]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "setup-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: getParent(selectedId).name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							onClick: () => {
								setStep(step + 1);
								setSearch("");
							},
							children: "Lock parent · Continue"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "goal-layout",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "setup-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Define the project"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "What would make this hunt worth remembering?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The goal changes how alignment is scored. The final choice remains yours." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "goal-grid",
						children: goals.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `goal-card ${goal === item.id ? "is-selected" : ""}`,
							onClick: () => setGoal(item.id),
							"aria-pressed": goal === item.id,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "goal-index",
									children: String(goals.indexOf(item) + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.target })
							]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cross-summary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cross-parent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "parent-swatch",
										style: { background: chosenFemale.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "SEED PARENT" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: chosenFemale.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: chosenFemale.generation })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cross-symbol",
								children: "×"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cross-parent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "parent-swatch",
										style: { background: chosenPollen.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "POLLEN PARENT" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: chosenPollen.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: chosenPollen.generation })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "seed-field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Run seed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: seed,
										maxLength: 40,
										onChange: (event) => setSeed(event.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSeed(randomRunSeed()),
										children: "Randomize"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button primary-button--large",
								onClick: () => onStart(female, pollen, goal, seed),
								children: "Generate 12 seeds"
							})
						]
					})
				]
			})
		]
	});
}
function PlantCard({ plant, state, onSelect, onCompare }) {
	const visible = visibleTraitKeys(state.phase, state.week, state.testsCompleted);
	const highlights = state.phase === "seedling" ? ["vigor", "stress"] : state.phase === "vegetative" ? ["branching", "stemStrength"] : state.phase === "flower" ? ["resin", "flowerSpeed"] : ["aroma", "effect"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `plant-card ${state.selectedPlantId === plant.id ? "is-selected" : ""} ${plant.status === "culled" ? "is-culled" : ""} ${plant.status === "keeper" ? "is-keeper" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "plant-select",
			onClick: onSelect,
			"aria-label": `Inspect ${plant.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plant-card-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plant.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plant.status === "culled" ? "Culled" : plant.status === "keeper" ? "Keeper" : phaseCopy[state.phase].label })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "status-chips",
						children: [
							plant.tagged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TAGGED" }),
							plant.cloned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLONE" }),
							plant.mutation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OUTLIER" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPortrait, {
					plant,
					phase: state.phase,
					week: state.week
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "plant-mini-stats",
					children: highlights.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: traitLabels[key] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes(key) ? plant.traits[key].toFixed(1) : "?" })] }, key))
				})
			]
		}), plant.status !== "culled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: `compare-toggle ${state.compareIds.includes(plant.id) ? "is-active" : ""}`,
			onClick: onCompare,
			"aria-pressed": state.compareIds.includes(plant.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "compare" }), state.compareIds.includes(plant.id) ? "Compared" : "Compare"]
		})]
	});
}
function Inspector({ state, dispatch, onCull, onCompare }) {
	const [tab, setTab] = (0, import_react.useState)("overview");
	const plant = state.plants.find((item) => item.id === state.selectedPlantId) ?? state.plants[0];
	const visible = visibleTraitKeys(state.phase, state.week, state.testsCompleted);
	if (!plant) return null;
	const traitList = {
		overview: [
			"vigor",
			"resin",
			"aroma",
			"effect",
			"breeding"
		],
		growth: [
			"height",
			"branching",
			"stemStrength",
			"stress",
			"clonePerformance"
		],
		aroma: [
			"aroma",
			"flavor",
			"color",
			"resin"
		],
		effects: [
			"effect",
			"clarity",
			"body",
			"stability"
		],
		genetics: [
			"breeding",
			"stability",
			"moldResistance",
			"flowerSpeed",
			"yield"
		],
		notes: []
	}[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "inspector-panel",
		"aria-label": "Plant inspector",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "inspector-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Selected specimen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: plant.id })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rarity-badge rarity-${plant.rarity.toLowerCase().replaceAll(" ", "-")}`,
					children: visible.includes("breeding") ? plant.rarity : "Rarity unresolved"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "tab-list",
				"aria-label": "Inspector sections",
				children: [
					"overview",
					"growth",
					"aroma",
					"effects",
					"genetics",
					"notes"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: tab === item ? "active" : "",
					onClick: () => setTab(item),
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inspector-body",
				children: tab !== "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "identity-strip",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "color-dot",
								style: { background: getParent(state.femaleParentId).color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes("color") ? plant.colorName : "Color developing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plant.mutation ? `Unusual ${plant.mutation}` : "No early mutation observed" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: visible.includes("breeding") ? `${plant.goalScore.toFixed(1)} fit` : "— fit" })
						]
					}),
					traitList.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						label: traitLabels[key],
						value: plant.traits[key],
						unknown: !visible.includes(key)
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "insight-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Breeder read"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: getBreederRead(plant, state, visible) })]
					}),
					tab === "aroma" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sensory-note",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRIMARY SIGNAL" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes("aroma") ? plant.aromaFamily : "Volatiles remain sealed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: state.testsCompleted.includes("Grind aroma") ? `Deeper note: ${plant.rareNote}.` : "Grind evaluation will reveal the deeper volatile layer." })
						]
					}),
					tab === "effects" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sensory-note",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EFFECT TIMELINE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes("effect") ? plant.effectProfile : "Testing pending" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: visible.includes("effect") ? `Clarity ${plant.traits.clarity.toFixed(1)} · Body ${plant.traits.body.toFixed(1)} · a distinct tradeoff, not a universal best.` : "Appearance cannot predict the finished effect." })
						]
					}),
					tab === "genetics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "genetics-note",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LINKAGE WATCH" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes("breeding") ? plant.linkage ?? "No strong drag detected" : "Hidden until full testing" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: plant.cloned ? "Backup clone is secured for the next decision." : "No backup clone has been reserved." })
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "notes-editor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "plant-notes",
							children: ["Field notes for ", plant.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "plant-notes",
							value: plant.notes,
							onChange: (event) => dispatch({
								type: "SET_NOTES",
								plantId: plant.id,
								notes: event.target.value
							}),
							maxLength: 280,
							placeholder: "Record a hunch, a contradiction, or the reason this plant survived…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [plant.notes.length, "/280 · Autosaved"] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "inspector-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch({
							type: "TOGGLE_TAG",
							plantId: plant.id
						}),
						children: plant.tagged ? "Remove tag" : "Tag candidate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onCompare,
						disabled: state.compareIds.length < 2,
						children: ["Compare ", state.compareIds.length || ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "danger-button",
						onClick: () => onCull(plant),
						disabled: plant.status !== "active",
						children: "Cull"
					})
				]
			})
		]
	});
}
function getBreederRead(plant, state, visible) {
	if (state.phase === "seedling") return plant.traits.vigor > 7 ? "Fast out of the gate, but early confidence is cheap. Keep one eye on stress recovery." : "A quiet start is not a verdict. The adult sensory traits are still completely unknown.";
	if (state.phase === "vegetative") return plant.traits.branching > plant.traits.stemStrength ? "Strong lateral ambition is outrunning the frame. Interesting—but structure may become the bill." : "The frame is carrying its growth honestly. Stem rub is a clue, not a finished aroma report.";
	if (state.phase === "flower") return plant.traits.resin > 8 ? "Resin is arriving early. Do not mistake frost for flavor; the sensory lab still gets the final word." : "Not the loudest plant in the room. Its balance may matter more once the cure strips away the visual bias.";
	if (!visible.includes("effect")) return "The visual record is complete. Aroma, flavor, and effect can still reverse the ranking.";
	return `${plant.aromaFamily} leads into ${plant.effectProfile}. Goal alignment is ${plant.goalScore.toFixed(1)}/10, with ${plant.linkage ? `a ${plant.linkage} tradeoff` : "no obvious linkage penalty"}.`;
}
function ActionDock({ state, dispatch, onSettings, onNotebook }) {
	const plant = state.plants.find((item) => item.id === state.selectedPlantId);
	const permission = canAdvance(state);
	const nextTest = testSequence[state.testsCompleted.length];
	const baseButton = state.phase === "seedling" || state.phase === "vegetative" || state.phase === "flower" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "primary-button dock-primary",
		onClick: () => dispatch({ type: "ADVANCE" }),
		disabled: !permission.allowed,
		title: permission.reason,
		children: [state.phase === "flower" ? state.week >= 5 ? "Open harvest window" : `Advance to week ${state.week + 1}` : state.phase === "vegetative" ? "Enter flower" : "Advance to vegetation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: permission.allowed ? "→" : "Locked" })]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "action-dock",
		"aria-label": "Stage actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-context",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Next decision"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: phaseCopy[state.phase].objective }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: phaseCopy[state.phase].action })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-actions",
			children: [
				state.lastCulledId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => dispatch({ type: "UNDO_CULL" }),
					children: "Undo cull"
				}),
				state.phase === "vegetative" && plant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch({
						type: "CLONE",
						plantId: plant.id
					}),
					disabled: plant.cloned || plant.status !== "active",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clone" }), plant.cloned ? "Clone secured" : "Clone · $90"]
				}),
				state.phase === "testing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button dock-primary",
					onClick: () => dispatch({ type: "RUN_TEST" }),
					children: [nextTest, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reveal →" })]
				}),
				baseButton,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onNotebook,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "book" }), "Notebook"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onSettings,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gear" }), "Pause"]
				})
			]
		})]
	});
}
function TopBar({ state, saveStatus, onMenu, onSettings, onNotebook, onCopy }) {
	const active = state.plants.filter((item) => item.status !== "culled").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "command-bar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "brand-button",
				onClick: onMenu,
				"aria-label": "Return to main menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "command-stats",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Generation",
						value: `F${state.generation}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Week",
						value: state.phase === "seedling" ? "01" : String(state.week).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Funds",
						value: `$${state.resources.funds}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Grow slots",
						value: `${active}/12`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Research",
						value: state.resources.research
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPill, {
						label: "Reputation",
						value: state.resources.reputation
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "command-tools",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onCopy,
						title: "Copy run seed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "seed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: state.runSeed })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onNotebook,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "book" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notebook" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onSettings,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gear" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "save-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), saveStatus]
					})
				]
			})
		]
	});
}
function StageRail({ state }) {
	const current = stages.indexOf(state.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "stage-rail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: "Hunt protocol"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: stages.slice(0, -1).map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: index < current ? "done" : index === current ? "current" : "",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index < current ? "✓" : String(index + 1).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: phaseCopy[stage].label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: index < current ? "Complete" : index === current ? "In progress" : "Locked" })] })]
		}, stage)) })]
	});
}
function Chamber({ state, dispatch }) {
	const [filter, setFilter] = (0, import_react.useState)("active");
	const [sort, setSort] = (0, import_react.useState)("id");
	const plants = [...state.plants].filter((plant) => filter === "active" ? plant.status !== "culled" : filter === "tagged" ? plant.tagged : filter === "cloned" ? plant.cloned : plant.status === "culled").sort((a, b) => sort === "vigor" ? b.traits.vigor - a.traits.vigor : sort === "goal" ? b.goalScore - a.goalScore : a.index - b.index);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "chamber-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "chamber-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Bio-electric breeder lab · Zone A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: phaseCopy[state.phase].label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: phaseCopy[state.phase].action })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chamber-controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Show", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filter,
						onChange: (event) => setFilter(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "active",
								children: "Active plants"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "tagged",
								children: "Tagged"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cloned",
								children: "Cloned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "culled",
								children: "Cull archive"
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Sort", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (event) => setSort(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "id",
								children: "Plant ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "vigor",
								children: "Visible vigor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "goal",
								children: "Goal fit"
							})
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "light-rig",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			}),
			plants.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plant-grid",
				children: plants.map((plant) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantCard, {
					plant,
					state,
					onSelect: () => dispatch({
						type: "SELECT_PLANT",
						plantId: plant.id
					}),
					onCompare: () => dispatch({
						type: "TOGGLE_COMPARE",
						plantId: plant.id
					})
				}, plant.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lab" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No plants in this view" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Change the filter to see the active population or archived culls." })
				]
			})
		]
	});
}
function Comparison({ state, onClose }) {
	const items = state.compareIds.map((id) => state.plants.find((item) => item.id === id)).filter(Boolean);
	const visible = visibleTraitKeys(state.phase, state.week, state.testsCompleted);
	const keys = [
		"vigor",
		"branching",
		"stemStrength",
		"resin",
		"aroma",
		"flavor",
		"effect",
		"stability",
		"breeding"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Plant comparison",
		eyebrow: `${items.length} specimens · no automatic winner`,
		onClose,
		wide: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "comparison-grid",
			children: items.map((plant) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "comparison-column",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPortrait, {
						plant,
						phase: state.phase,
						week: state.week,
						compact: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: plant.id }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "comparison-rarity",
						children: visible.includes("breeding") ? plant.rarity : "Identity unresolved"
					}),
					keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "comparison-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: traitLabels[key] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: visible.includes(key) ? plant.traits[key].toFixed(1) : "?" })]
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "comparison-callout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRADEOFF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: plant.linkage && visible.includes("breeding") ? plant.linkage : "Hidden uncertainty remains" })]
					})
				]
			}, plant.id))
		}), items.length < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "empty-state",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add 2–4 plants using the Compare control on each specimen." })
		})]
	});
}
function EventModal({ state, dispatch }) {
	const event = events.find((item) => item.id === state.activeEventId);
	if (!event) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: event.title,
		eyebrow: event.eyebrow,
		onClose: () => {},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "event-visual",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "event-heat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "spark" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "modal-lead",
				children: event.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "event-choices",
				children: event.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch({
						type: "RESOLVE_EVENT",
						eventId: event.id,
						choiceId: choice.id
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: choice.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.detail })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [choice.cost ?? "Decision", " →"] })]
				}, choice.id))
			})
		]
	});
}
function HarvestCurePanel({ state, dispatch }) {
	if (state.phase !== "harvest" && state.phase !== "cure") return null;
	const options = state.phase === "harvest" ? [
		[
			"early",
			"Bright window",
			"Sharper aroma, lower yield",
			"+ clarity · − yield"
		],
		[
			"balanced",
			"Balanced window",
			"Preserve the broadest expression",
			"+ flavor · + consistency"
		],
		[
			"late",
			"Deep window",
			"More weight and output",
			"+ body · − clarity"
		]
	] : [
		[
			"fast",
			"Fast turnaround",
			"Speed protects funds, not nuance",
			"− flavor depth"
		],
		[
			"balanced",
			"Measured cure",
			"Reliable sensory definition",
			"+ aroma · + flavor"
		],
		[
			"slow",
			"Premium patience",
			"Highest upside with a little uncertainty",
			"++ flavor · + aroma"
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "phase-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "Irreversible project decision"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: state.phase === "harvest" ? "Choose the harvest window" : "Choose the cure strategy" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: state.phase === "harvest" ? "Timing changes the finished expression across the whole population. There is no universally correct window." : "A simplified strategic choice; this game does not provide real-world cultivation procedure." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "phase-choice-grid",
				children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						if (state.phase === "harvest") dispatch({
							type: "CHOOSE_HARVEST",
							choice: option[0]
						});
						else dispatch({
							type: "CHOOSE_CURE",
							choice: option[0]
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option[0].toUpperCase() }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: option[1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: option[2] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: option[3] })
					]
				}, option[0]))
			})
		] })
	});
}
function KeeperPanel({ state, dispatch }) {
	if (state.phase !== "keeper" && state.phase !== "complete") return null;
	const keeper = state.plants.find((item) => item.id === state.keeperId);
	const selected = state.plants.find((item) => item.id === state.selectedPlantId) ?? state.plants.find((item) => item.status === "active");
	const candidates = state.plants.filter((item) => item.status !== "culled").sort((a, b) => b.goalScore - a.goalScore);
	const female = getParent(state.femaleParentId), pollen = getParent(state.pollenParentId);
	const suggestions = selected ? makeNameSuggestions(selected, female.name, pollen.name) : [];
	if (state.phase === "complete" && keeper) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "phase-overlay phase-overlay--keeper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "keeper-reveal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Generation secured · Hall of Fame entry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "legendary-seal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "spark" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPortrait, {
					plant: keeper,
					phase: "complete",
					week: state.week
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: state.keeperName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					female.name,
					" × ",
					pollen.name,
					" · ",
					keeper.rarity
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "keeper-facts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "AROMA" }), keeper.aromaFamily] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "EFFECT" }), keeper.effectProfile] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "NEXT STEP" }),
							state.nextGenerationMethod,
							" · Generation 2"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "achievement-toast",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Achievement unlocked" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "First Keeper" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "One plant turned uncertainty into identity." })
					]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "phase-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "keeper-lab",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "The final cut"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Select a keeper. Preserve a story." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Goal-fit is evidence, not authority. Consider the tradeoff you are willing to carry into the next generation." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "candidate-strip",
					children: candidates.map((plant) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: state.keeperId === plant.id ? "selected" : "",
						onClick: () => dispatch({
							type: "SELECT_KEEPER",
							plantId: plant.id
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPortrait, {
								plant,
								phase: "keeper",
								week: state.week,
								compact: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plant.id }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [plant.goalScore.toFixed(1), " goal fit"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: plant.rarity })
						]
					}, plant.id))
				}),
				state.keeperId && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "naming-station",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Naming engine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
								"Give ",
								selected.id,
								" its permanent identity"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "name-suggestions",
								children: suggestions.map((name, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => dispatch({
										type: "NAME_KEEPER",
										name
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [
										"Premium",
										"Weird",
										"Old-school",
										"Sci-fi",
										"Funny",
										"Breeder"
									][index] }), name]
								}, name))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Custom cultivar name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: state.keeperName,
								maxLength: 48,
								onChange: (event) => dispatch({
									type: "NAME_KEEPER",
									name: event.target.value
								}),
								placeholder: "Enter a memorable name…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [state.keeperName.length, "/48"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "line-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => dispatch({
									type: "COMPLETE_LINE",
									method: "F2"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Make F2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wider segregation · more recombinant risk" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => dispatch({
									type: "COMPLETE_LINE",
									method: "Backcross"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Backcross" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recover a parent's defining signal" })]
							})]
						})
					]
				})
			]
		})
	});
}
function Notebook({ state, onClose, onHall }) {
	const goal = goals.find((item) => item.id === state.goalId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "Breeder notebook",
		eyebrow: "Field journal × genetic archive",
		onClose,
		wide: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "notebook-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "notebook-label",
					children: "PROJECT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: goal.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					getParent(state.femaleParentId).name,
					" × ",
					getParent(state.pollenParentId).name
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Run seed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: state.runSeed })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Generation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["F", state.generation] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Population" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [state.plants.filter((item) => item.status !== "culled").length, " active"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Clones" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
						state.plants.filter((item) => item.cloned && item.status !== "culled").length,
						"/",
						state.resources.cloneCapacity
					] })] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onHall,
					children: "Open Hall of Fame"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notebook-pages",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "notebook-label",
						children: "LINEAGE RECORD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lineage-map",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: getParent(state.femaleParentId).color } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: getParent(state.femaleParentId).name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Seed parent · ", getParent(state.femaleParentId).generation] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "×" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: getParent(state.pollenParentId).color } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: getParent(state.pollenParentId).name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Pollen parent · ", getParent(state.pollenParentId).generation] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↓" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lineage-child",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									"F",
									state.generation,
									" · ",
									state.keeperName || "Unnamed population"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: state.nextGenerationMethod ? `${state.nextGenerationMethod} queued` : "Selection in progress" })]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "notebook-label",
						children: "ACTION LOG"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "log-list",
						children: state.actionLog.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(state.actionLog.length - index).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry })] }, `${entry}-${index}`))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "notebook-label",
						children: "ACHIEVEMENTS"
					}), state.achievements.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "achievement-list",
						children: state.achievements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "spark" }), item] }, item))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "empty-line",
						children: "The archive is waiting for its first keeper."
					})] })
				]
			})]
		})
	});
}
function Settings({ state, onClose, onReplace, audio, reducedMotion, setReducedMotion, textScale, setTextScale }) {
	const [slots, setSlots] = (0, import_react.useState)(() => [
		1,
		2,
		3
	].map(loadSlot));
	const [importText, setImportText] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const refresh = () => setSlots([
		1,
		2,
		3
	].map(loadSlot));
	const download = () => {
		const blob = new Blob([exportSave(state)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `phenohunter-${state.runSeed}.json`;
		link.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "Paused · Lab settings",
		eyebrow: "Accessibility, audio, and saves",
		onClose,
		wide: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "settings-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Experience" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "toggle-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "sound" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Game audio" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Atmospheric hum and restrained cues" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: !audio.muted,
						onChange: (event) => audio.setMuted(!event.target.checked),
						disabled: !audio.supported
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "range-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Audio volume" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0",
							max: "1",
							step: "0.05",
							value: audio.volume,
							onChange: (event) => audio.setVolume(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(audio.volume * 100), "%"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "toggle-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Reduced motion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Minimize plant and atmospheric animation" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: reducedMotion,
						onChange: (event) => setReducedMotion(event.target.checked)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "range-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Interface scale" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0.9",
							max: "1.2",
							step: "0.05",
							value: textScale,
							onChange: (event) => setTextScale(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(textScale * 100), "%"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glossary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Quick glossary" }), glossary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: item[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item[1] })] }, item[0]))]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Manual save slots" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "save-slots",
					children: slots.map((slot, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Slot ", index + 1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: slot ? `${slot.state.runSeed} · ${phaseCopy[slot.state.phase].label}` : "Empty slot" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: slot ? new Date(slot.savedAt).toLocaleString() : "No record stored" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								saveSlot(index + 1, state);
								refresh();
							},
							children: "Save"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !slot,
							onClick: () => slot && onReplace(slot.state),
							children: "Load"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "danger-button",
							disabled: !slot,
							onClick: () => {
								if (window.confirm(`Delete manual save slot ${index + 1}?`)) {
									deleteSlot(index + 1);
									refresh();
								}
							},
							children: "Delete"
						})
					] })] }, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "save-transfer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Save transfer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Export a versioned JSON save or paste one below. Invalid and corrupted data is rejected safely." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: download,
							children: "Export save file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: importText,
							onChange: (event) => setImportText(event.target.value),
							placeholder: "Paste exported save JSON…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								try {
									onReplace(importSave(importText));
									setError("");
								} catch (issue) {
									setError(issue instanceof Error ? issue.message : "Import failed.");
								}
							},
							children: "Import and load"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "error-message",
							role: "alert",
							children: error
						})
					]
				})
			] })]
		})
	});
}
function Tutorial({ state, onClose }) {
	const copy = state.phase === "seedling" ? [
		"1 / 12 · First read",
		"Don’t fall in love with numbers yet.",
		"Seedlings only reveal vigor, height, and stress response. Inspect a few, then cull one to make the first real commitment."
	] : state.phase === "vegetative" ? [
		"5 / 12 · Protect the hunch",
		"A memory without a backup is just a story.",
		"Select a promising plant and reserve a clone. Stem rub is evidence; the finished jar can still disagree."
	] : state.phase === "flower" ? [
		"7 / 12 · The room answers",
		"Watch what changes—not just what gets bigger.",
		"Advance each week. A garden event will force a resource tradeoff before the final flower traits resolve."
	] : state.phase === "testing" ? [
		"9 / 12 · Break the beauty bias",
		"Pretty is not the same as memorable.",
		"Run every sensory step in order. Flavor and effect can turn a quiet plant into the keeper."
	] : state.phase === "keeper" ? [
		"10 / 12 · The final cut",
		"The top score is a witness, not a judge.",
		"Select a plant, name it, then choose whether to widen the line with an F2 or pull it toward a parent with a backcross."
	] : [
		"Hunt protocol",
		"Keep the question in front of you.",
		phaseCopy[state.phase].objective
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tutorial-bubble",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "guide-avatar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MV" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy[0] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: copy[1] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy[2] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				children: "Dismiss guide"
			})
		]
	});
}
function HallScreen({ entries, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hall-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "setup-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-button",
						onClick: onBack,
						children: "← Main menu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Genetic archive" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hall-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Hall of Fame · Retired cultivars"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "The plants that changed the notebook." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every entry preserves its origin seed, parentage, finished sensory identity, and next-generation path." })
				]
			}),
			entries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hall-grid",
				children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hall-portrait",
					style: { "--entry-color": entry.color },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hall-plant-symbol",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.awards[0] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hall-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"F",
							entry.generation,
							" · ",
							new Date(entry.discoveryDate).toLocaleDateString()
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: entry.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry.parentage }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Aroma" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: entry.aroma })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Effect" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: entry.effects })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Next line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: entry.descendants })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Run seed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: entry.seed })] })
						] })
					]
				})] }, entry.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hall-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "empty-sigil",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "spark" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No legends—yet." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Complete a Quick Hunt and the first keeper will take its place here." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "primary-button",
						onClick: onBack,
						children: "Return to the lab"
					})
				]
			})
		]
	});
}
function GameShell() {
	const hydrated = (0, import_react.useSyncExternalStore)(subscribeToHydration, () => true, () => false);
	const [screen, setScreen] = (0, import_react.useState)(() => typeof window !== "undefined" && window.localStorage.getItem("phenohunter.age-ack") === "yes" ? "menu" : "gate");
	const [game, setGame] = (0, import_react.useState)(() => typeof window !== "undefined" ? loadAutosave() : null);
	const [hasSave, setHasSave] = (0, import_react.useState)(() => Boolean(game));
	const [tutorial, setTutorial] = (0, import_react.useState)(true);
	const [dismissedTutorialPhase, setDismissedTutorialPhase] = (0, import_react.useState)(null);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [notebookOpen, setNotebookOpen] = (0, import_react.useState)(false);
	const [compareOpen, setCompareOpen] = (0, import_react.useState)(false);
	const [cullTarget, setCullTarget] = (0, import_react.useState)(null);
	const [mobilePanel, setMobilePanel] = (0, import_react.useState)("chamber");
	const [saveStatus, setSaveStatus] = (0, import_react.useState)("Local save ready");
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	const [textScale, setTextScale] = (0, import_react.useState)(1);
	const [uiNotice, setUiNotice] = (0, import_react.useState)("");
	const audio = useGameAudio();
	const saveTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator && true) navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!game || !hydrated) return;
		if (saveTimer.current) clearTimeout(saveTimer.current);
		saveTimer.current = setTimeout(() => {
			const saved = autosave(game);
			setSaveStatus(saved ? "Autosaved" : "Save unavailable");
			setHasSave(saved);
		}, 350);
		return () => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
		};
	}, [game, hydrated]);
	const dispatch = (0, import_react.useCallback)((action) => {
		setSaveStatus("Saving…");
		setGame((current) => current ? reduceGame(current, action) : current);
		if (action.type === "RUN_TEST") audio.click("reveal");
		else if (action.type === "COMPLETE_LINE") audio.click("keeper");
		else audio.click("soft");
	}, [audio]);
	const start = (female, pollen, goal, seed) => {
		const hall = game?.hallOfFame ?? [];
		setGame(createGame(female, pollen, goal, seed, hall));
		setDismissedTutorialPhase(null);
		setScreen("game");
	};
	const openNew = (guided) => {
		setTutorial(guided);
		setDismissedTutorialPhase(null);
		setScreen("setup");
	};
	const copySeed = async () => {
		if (!game) return;
		try {
			await navigator.clipboard.writeText(game.runSeed);
			setUiNotice("Run seed copied to the clipboard.");
		} catch {
			setUiNotice(`Run seed: ${game.runSeed}`);
		}
		setTimeout(() => setUiNotice(""), 2400);
	};
	const replaceGame = (state) => {
		setGame(state);
		setScreen("game");
		setSettingsOpen(false);
		setUiNotice("Save loaded safely.");
	};
	const appStyle = { "--ui-scale": String(textScale) };
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "loading-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Calibrating the breeder lab…" })]
	});
	if (screen === "gate") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeGate, { onAccept: () => {
		window.localStorage.setItem("phenohunter.age-ack", "yes");
		setScreen("menu");
	} });
	if (screen === "menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainMenu, {
		hasSave,
		onNew: openNew,
		onContinue: () => {
			const saved = loadAutosave();
			if (saved) {
				setGame(saved);
				setScreen("game");
			}
		},
		onHall: () => setScreen("hall")
	});
	if (screen === "setup") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, {
		onBack: () => setScreen("menu"),
		onStart: start
	});
	if (screen === "hall") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HallScreen, {
		entries: game?.hallOfFame ?? [],
		onBack: () => setScreen("menu")
	});
	if (!game) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainMenu, {
		hasSave: false,
		onNew: openNew,
		onContinue: () => {},
		onHall: () => setScreen("hall")
	});
	const tutorialVisible = tutorial && dismissedTutorialPhase !== game.phase && [
		"seedling",
		"vegetative",
		"flower",
		"testing",
		"keeper"
	].includes(game.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `game-shell panel-${mobilePanel} ${reducedMotion ? "reduce-motion" : ""}`,
		style: appStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				state: game,
				saveStatus,
				onMenu: () => setScreen("menu"),
				onSettings: () => setSettingsOpen(true),
				onNotebook: () => setNotebookOpen(true),
				onCopy: copySeed
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "game-workspace",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRail, { state: game }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chamber, {
						state: game,
						dispatch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {
						state: game,
						dispatch,
						onCull: setCullTarget,
						onCompare: () => setCompareOpen(true)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionDock, {
				state: game,
				dispatch,
				onSettings: () => setSettingsOpen(true),
				onNotebook: () => setNotebookOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mobile-nav",
				"aria-label": "Game panels",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobilePanel === "chamber" ? "active" : "",
						onClick: () => setMobilePanel("chamber"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lab" }), "Chamber"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobilePanel === "inspector" ? "active" : "",
						onClick: () => setMobilePanel("inspector"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "seed" }), "Inspector"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobilePanel === "notebook" ? "active" : "",
						onClick: () => {
							setMobilePanel("notebook");
							setNotebookOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "book" }), "Notebook"]
					})
				]
			}),
			game.notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "game-notice",
				onClick: () => dispatch({ type: "CLEAR_NOTICE" }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: game.notice }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Dismiss" })
				]
			}),
			uiNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ui-toast",
				role: "status",
				children: uiNotice
			}),
			tutorialVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tutorial, {
				state: game,
				onClose: () => setDismissedTutorialPhase(game.phase)
			}),
			game.activeEventId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventModal, {
				state: game,
				dispatch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HarvestCurePanel, {
				state: game,
				dispatch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeeperPanel, {
				state: game,
				dispatch
			}),
			settingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
				state: game,
				onClose: () => setSettingsOpen(false),
				onReplace: replaceGame,
				audio,
				reducedMotion,
				setReducedMotion,
				textScale,
				setTextScale
			}),
			notebookOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notebook, {
				state: game,
				onClose: () => setNotebookOpen(false),
				onHall: () => {
					setNotebookOpen(false);
					setScreen("hall");
				}
			}),
			compareOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comparison, {
				state: game,
				onClose: () => setCompareOpen(false)
			}),
			cullTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: `Cull ${cullTarget.id}?`,
				eyebrow: "Irreversible selection · undo available once",
				onClose: () => setCullTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cull-confirm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPortrait, {
							plant: cullTarget,
							phase: game.phase,
							week: game.week,
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This removes the plant from the active population and releases its grow slot. Its record remains in the notebook." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCullTarget(null),
							children: "Keep evaluating"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "danger-button",
							onClick: () => {
								dispatch({
									type: "CULL",
									plantId: cullTarget.id
								});
								setCullTarget(null);
							},
							children: "Confirm cull"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { GameShell };
