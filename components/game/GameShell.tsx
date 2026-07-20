"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { events, glossary, goals, phaseCopy, testSequence } from "@/data/gameContent";
import { femaleParents, getParent, pollenParents } from "@/data/parents";
import { canAdvance, createGame, randomRunSeed, reduceGame } from "@/engine/game";
import { makeNameSuggestions, visibleTraitKeys } from "@/engine/genetics";
import { useGameAudio } from "@/hooks/useGameAudio";
import { autosave, deleteSlot, exportSave, importSave, loadAutosave, loadSlot, saveSlot } from "@/lib/save";
import type { GameAction, } from "@/engine/game";
import type { GameState, GoalId, Plant, TraitKey } from "@/types/game";
import { PlantPortrait } from "@/components/plants/PlantPortrait";
import { Modal } from "@/components/ui/Modal";

type Screen = "gate" | "menu" | "setup" | "game" | "hall";
type MobilePanel = "chamber" | "inspector" | "notebook";
type InspectorTab = "overview" | "growth" | "aroma" | "effects" | "genetics" | "notes";

const traitLabels: Record<TraitKey,string> = {
  vigor:"Vigor", height:"Height", branching:"Branching", stemStrength:"Stem strength", resin:"Resin", yield:"Yield", flowerSpeed:"Flower speed", aroma:"Aroma", flavor:"Flavor", effect:"Effect", clarity:"Mental clarity", body:"Body", color:"Color expression", stability:"Stability", breeding:"Breeding value", stress:"Stress tolerance", moldResistance:"Mold resistance", clonePerformance:"Clone performance",
};

const stages = ["seedling","vegetative","flower","harvest","cure","testing","keeper","complete"] as const;
const subscribeToHydration = () => () => undefined;

function Icon({name}:{name:"seed"|"lab"|"book"|"spark"|"gear"|"clone"|"compare"|"sound"}) {
  return <span className={`glyph glyph--${name}`} aria-hidden="true" />;
}

function StatPill({label,value,detail}:{label:string;value:string|number;detail?:string}) {
  return <div className="stat-pill" title={detail}><span>{label}</span><strong>{value}</strong></div>;
}

function ScoreBar({label,value,unknown=false}:{label:string;value:number;unknown?:boolean}) {
  return <div className={`score-row ${unknown?"is-unknown":""}`}>
    <div className="score-label"><span>{label}</span><strong>{unknown?"UNRESOLVED":value.toFixed(1)}</strong></div>
    <div className="score-track" aria-hidden="true"><span style={{width:unknown?"18%":`${value*10}%`}} /></div>
  </div>;
}

function Logo({small=false}:{small?:boolean}) {
  return <div className={`game-logo ${small?"game-logo--small":""}`}><span className="logo-mark"><i/><b/></span><span><strong>PHENOHUNTER</strong><em>THE LOST KEEPER</em></span></div>;
}

function AgeGate({onAccept}:{onAccept:()=>void}) {
  return <main className="entry-screen">
    <div className="entry-atmosphere" />
    <section className="age-card">
      <div className="age-sigil"><span>21+</span></div>
      <span className="eyebrow">Fictional genetics strategy game</span>
      <Logo />
      <p>A plant-breeding roguelike about uncertain inheritance, scarce grow slots, and the phenotype you nearly overlooked.</p>
      <div className="responsibility-note"><strong>Adult acknowledgment</strong><span>This is fictional entertainment—not cultivation guidance. Please follow the laws where you live and use cannabis responsibly.</span></div>
      <button className="primary-button primary-button--large" onClick={onAccept}>I’m of legal age · Enter the lab</button>
      <small>No account, tracking, purchase, or real-world cultivation instruction.</small>
    </section>
  </main>;
}

function MainMenu({hasSave,onNew,onContinue,onHall}:{hasSave:boolean;onNew:(tutorial:boolean)=>void;onContinue:()=>void;onHall:()=>void}) {
  return <main className="menu-screen">
    <div className="menu-orb menu-orb--one"/><div className="menu-orb menu-orb--two"/>
    <header className="menu-header"><Logo small/><span>Build 1.0 · Quick Hunt</span></header>
    <section className="menu-hero">
      <div className="menu-copy">
        <span className="eyebrow">Every seed carries a possibility</span>
        <h1>Find the plant<br/><i>you almost culled.</i></h1>
        <p>Cross strange fictional genetics. Read incomplete evidence. Protect the right clones. Test every assumption. Name the one that survives your judgment.</p>
        <div className="menu-actions">
          <button className="primary-button primary-button--large" onClick={()=>onNew(true)}>Begin guided hunt</button>
          <button className="secondary-button" onClick={()=>onNew(false)}>Skip tutorial</button>
          {hasSave&&<button className="text-button" onClick={onContinue}>Continue autosave <span>→</span></button>}
        </div>
      </div>
      <div className="hero-specimen">
        <div className="hero-ring hero-ring--a"/><div className="hero-ring hero-ring--b"/>
        <div className="hero-plant">
          <span className="hero-stem"/><span className="hero-leaf hero-leaf--1"/><span className="hero-leaf hero-leaf--2"/><span className="hero-leaf hero-leaf--3"/><span className="hero-leaf hero-leaf--4"/><span className="hero-leaf hero-leaf--5"/><span className="hero-leaf hero-leaf--6"/><span className="hero-flower hero-flower--1"/><span className="hero-flower hero-flower--2"/><span className="hero-flower hero-flower--3"/>
        </div>
        <div className="specimen-readout"><span>UNKNOWN EXPRESSION</span><strong>Signal acquired</strong><small>Identity awaits selection</small></div>
      </div>
    </section>
    <section className="mode-strip">
      <article className="mode-card mode-card--active"><span>PLAYABLE NOW</span><h3>Quick Hunt</h3><p>12 plants · One complete cross · 20–30 min</p></article>
      <article className="mode-card"><span>ARCHIVE</span><h3>Hall of Fame</h3><p>Revisit retired keeper cultivars.</p><button onClick={onHall}>Open archive</button></article>
      <article className="mode-card mode-card--locked"><span>ROADMAP</span><h3>Career Mode</h3><p>Long-form companies, rivals, and reputation paths.</p></article>
    </section>
    <aside className="community-callout"><div><span className="eyebrow">GBS · Growers, Breeders, Smokers</span><p>Share run seeds, compare fictional phenotypes, and join community hunts.</p></div><a href="https://discord.gg/YxJYnnKWHf" target="_blank" rel="noreferrer">Join the community ↗</a></aside>
  </main>;
}

function SetupScreen({onBack,onStart}:{onBack:()=>void;onStart:(female:string,pollen:string,goal:GoalId,seed:string)=>void}) {
  const [step,setStep] = useState(1);
  const [female,setFemale] = useState(femaleParents[0].id);
  const [pollen,setPollen] = useState(pollenParents[0].id);
  const [goal,setGoal] = useState<GoalId>("aroma");
  const [seed,setSeed] = useState(randomRunSeed());
  const [search,setSearch] = useState("");
  const pool = step===1?femaleParents:pollenParents;
  const selectedId = step===1?female:pollen;
  const visiblePool = pool.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())||item.aroma.join(" ").toLowerCase().includes(search.toLowerCase()));
  const chosenFemale=getParent(female), chosenPollen=getParent(pollen);
  return <main className="setup-screen">
    <header className="setup-header"><button className="text-button" onClick={onBack}>← Main menu</button><Logo small/><span>Project protocol</span></header>
    <div className="setup-progress" aria-label={`Setup step ${step} of 3`}><span className={step>=1?"active":""}>01 · Seed parent</span><i/><span className={step>=2?"active":""}>02 · Pollen parent</span><i/><span className={step>=3?"active":""}>03 · Project goal</span></div>
    {step<3?<section className="setup-content">
      <div className="setup-title"><span className="eyebrow">Select {step===1?"the seed parent":"the pollen contributor"}</span><h1>{step===1?"What anchors the cross?":"Where does the disruption come from?"}</h1><p>Parent tendencies shape probability, not destiny. Stability narrows the field; unstable lines create wider outliers.</p></div>
      <div className="genetic-search"><label htmlFor="parent-search">Search the genetic library</label><input id="parent-search" value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Name or aroma tendency…"/><span>{visiblePool.length} lines</span></div>
      <div className="parent-grid">
        {visiblePool.map((item)=><button key={item.id} className={`parent-card ${selectedId===item.id?"is-selected":""}`} onClick={()=>step===1?setFemale(item.id):setPollen(item.id)} aria-pressed={selectedId===item.id}>
          <span className="parent-swatch" style={{background:item.color}}/><div className="parent-head"><span>{item.sex} · {item.generation}</span><strong>{item.name}</strong><small>{item.lineage}</small></div>
          <p>{item.growth}</p><div className="aroma-tags">{item.aroma.map(note=><span key={note}>{note}</span>)}</div>
          <div className="parent-foot"><span>Stability <b>{item.stability}/10</b></span><span>Breeding <b>{item.breedingValue}/10</b></span></div>
        </button>)}
      </div>
      <footer className="setup-footer"><div><span>Selected</span><strong>{getParent(selectedId).name}</strong></div><button className="primary-button" onClick={()=>{setStep(step+1);setSearch("");}}>Lock parent · Continue</button></footer>
    </section>:<section className="goal-layout">
      <div className="setup-title"><span className="eyebrow">Define the project</span><h1>What would make this hunt worth remembering?</h1><p>The goal changes how alignment is scored. The final choice remains yours.</p></div>
      <div className="goal-grid">{goals.map(item=><button key={item.id} className={`goal-card ${goal===item.id?"is-selected":""}`} onClick={()=>setGoal(item.id)} aria-pressed={goal===item.id}><span className="goal-index">{String(goals.indexOf(item)+1).padStart(2,"0")}</span><strong>{item.name}</strong><p>{item.description}</p><small>{item.target}</small></button>)}</div>
      <div className="cross-summary">
        <div className="cross-parent"><span className="parent-swatch" style={{background:chosenFemale.color}}/><small>SEED PARENT</small><strong>{chosenFemale.name}</strong><em>{chosenFemale.generation}</em></div>
        <div className="cross-symbol">×</div>
        <div className="cross-parent"><span className="parent-swatch" style={{background:chosenPollen.color}}/><small>POLLEN PARENT</small><strong>{chosenPollen.name}</strong><em>{chosenPollen.generation}</em></div>
        <label className="seed-field"><span>Run seed</span><input value={seed} maxLength={40} onChange={(event)=>setSeed(event.target.value.toUpperCase().replace(/[^A-Z0-9-]/g,""))}/><button type="button" onClick={()=>setSeed(randomRunSeed())}>Randomize</button></label>
        <button className="primary-button primary-button--large" onClick={()=>onStart(female,pollen,goal,seed)}>Generate 12 seeds</button>
      </div>
    </section>}
  </main>;
}

function PlantCard({plant,state,onSelect,onCompare}:{plant:Plant;state:GameState;onSelect:()=>void;onCompare:()=>void}) {
  const visible = visibleTraitKeys(state.phase,state.week,state.testsCompleted);
  const highlights:TraitKey[] = state.phase==="seedling"?["vigor","stress"]:state.phase==="vegetative"?["branching","stemStrength"]:state.phase==="flower"?["resin","flowerSpeed"]:["aroma","effect"];
  const isSelected=state.selectedPlantId===plant.id;
  return <article className={`plant-card ${isSelected?"is-selected":""} ${plant.status==="culled"?"is-culled":""} ${plant.status==="keeper"?"is-keeper":""}`}>
    <button className="plant-select" onClick={onSelect} aria-label={`Inspect ${plant.id}`}>
      <div className="plant-card-head"><div><strong>{plant.id}</strong><span>{plant.status==="culled"?"Culled":plant.status==="keeper"?"Keeper":phaseCopy[state.phase].label}</span></div><div className="status-chips">{plant.tagged&&<span>TAGGED</span>}{plant.cloned&&<span>CLONE</span>}{plant.mutation&&<span>OUTLIER</span>}</div></div>
      <PlantPortrait plant={plant} phase={state.phase} week={state.week}/>
      <div className="plant-mini-stats">{highlights.map(key=><div key={key}><span>{traitLabels[key]}</span><strong>{visible.includes(key)?plant.traits[key].toFixed(1):"?"}</strong></div>)}</div>
    </button>
    {plant.status!=="culled"&&<button className={`compare-toggle ${state.compareIds.includes(plant.id)?"is-active":""}`} onClick={onCompare} aria-pressed={state.compareIds.includes(plant.id)}><Icon name="compare"/>{state.compareIds.includes(plant.id)?"Compared":"Compare"}</button>}
  </article>;
}

function Inspector({state,dispatch,onCull,onCompare}:{state:GameState;dispatch:(action:GameAction)=>void;onCull:(plant:Plant)=>void;onCompare:()=>void}) {
  const [tab,setTab]=useState<InspectorTab>("overview");
  const plant=state.plants.find(item=>item.id===state.selectedPlantId)??state.plants[0];
  const visible=visibleTraitKeys(state.phase,state.week,state.testsCompleted);
  if(!plant)return null;
  const groups:Record<InspectorTab,TraitKey[]>={overview:["vigor","resin","aroma","effect","breeding"],growth:["height","branching","stemStrength","stress","clonePerformance"],aroma:["aroma","flavor","color","resin"],effects:["effect","clarity","body","stability"],genetics:["breeding","stability","moldResistance","flowerSpeed","yield"],notes:[]};
  const traitList=groups[tab];
  return <aside className="inspector-panel" aria-label="Plant inspector">
    <header className="inspector-head"><div><span className="eyebrow">Selected specimen</span><h2>{plant.id}</h2></div><span className={`rarity-badge rarity-${plant.rarity.toLowerCase().replaceAll(" ","-")}`}>{visible.includes("breeding")?plant.rarity:"Rarity unresolved"}</span></header>
    <nav className="tab-list" aria-label="Inspector sections">{(["overview","growth","aroma","effects","genetics","notes"] as InspectorTab[]).map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</nav>
    <div className="inspector-body">
      {tab!=="notes"?<>
        <div className="identity-strip"><span className="color-dot" style={{background:getParent(state.femaleParentId).color}}/><div><strong>{visible.includes("color")?plant.colorName:"Color developing"}</strong><span>{plant.mutation?`Unusual ${plant.mutation}`:"No early mutation observed"}</span></div><b>{visible.includes("breeding")?`${plant.goalScore.toFixed(1)} fit`:"— fit"}</b></div>
        {traitList.map(key=><ScoreBar key={key} label={traitLabels[key]} value={plant.traits[key]} unknown={!visible.includes(key)}/>) }
        <div className="insight-card"><span className="eyebrow">Breeder read</span><p>{getBreederRead(plant,state,visible)}</p></div>
        {tab==="aroma"&&<div className="sensory-note"><span>PRIMARY SIGNAL</span><strong>{visible.includes("aroma")?plant.aromaFamily:"Volatiles remain sealed"}</strong><p>{state.testsCompleted.includes("Grind aroma")?`Deeper note: ${plant.rareNote}.`:"Grind evaluation will reveal the deeper volatile layer."}</p></div>}
        {tab==="effects"&&<div className="sensory-note"><span>EFFECT TIMELINE</span><strong>{visible.includes("effect")?plant.effectProfile:"Testing pending"}</strong><p>{visible.includes("effect")?`Clarity ${plant.traits.clarity.toFixed(1)} · Body ${plant.traits.body.toFixed(1)} · a distinct tradeoff, not a universal best.`:"Appearance cannot predict the finished effect."}</p></div>}
        {tab==="genetics"&&<div className="genetics-note"><span>LINKAGE WATCH</span><strong>{visible.includes("breeding")?(plant.linkage??"No strong drag detected") : "Hidden until full testing"}</strong><p>{plant.cloned?"Backup clone is secured for the next decision.":"No backup clone has been reserved."}</p></div>}
      </>:<div className="notes-editor"><label htmlFor="plant-notes">Field notes for {plant.id}</label><textarea id="plant-notes" value={plant.notes} onChange={(event)=>dispatch({type:"SET_NOTES",plantId:plant.id,notes:event.target.value})} maxLength={280} placeholder="Record a hunch, a contradiction, or the reason this plant survived…"/><span>{plant.notes.length}/280 · Autosaved</span></div>}
    </div>
    <footer className="inspector-actions"><button onClick={()=>dispatch({type:"TOGGLE_TAG",plantId:plant.id})}>{plant.tagged?"Remove tag":"Tag candidate"}</button><button onClick={onCompare} disabled={state.compareIds.length<2}>Compare {state.compareIds.length||""}</button><button className="danger-button" onClick={()=>onCull(plant)} disabled={plant.status!=="active"}>Cull</button></footer>
  </aside>;
}

function getBreederRead(plant:Plant,state:GameState,visible:TraitKey[]):string {
  if(state.phase==="seedling") return plant.traits.vigor>7?"Fast out of the gate, but early confidence is cheap. Keep one eye on stress recovery.":"A quiet start is not a verdict. The adult sensory traits are still completely unknown.";
  if(state.phase==="vegetative") return plant.traits.branching>plant.traits.stemStrength?"Strong lateral ambition is outrunning the frame. Interesting—but structure may become the bill.":"The frame is carrying its growth honestly. Stem rub is a clue, not a finished aroma report.";
  if(state.phase==="flower") return plant.traits.resin>8?"Resin is arriving early. Do not mistake frost for flavor; the sensory lab still gets the final word.":"Not the loudest plant in the room. Its balance may matter more once the cure strips away the visual bias.";
  if(!visible.includes("effect"))return "The visual record is complete. Aroma, flavor, and effect can still reverse the ranking.";
  return `${plant.aromaFamily} leads into ${plant.effectProfile}. Goal alignment is ${plant.goalScore.toFixed(1)}/10, with ${plant.linkage?`a ${plant.linkage} tradeoff` : "no obvious linkage penalty"}.`;
}

function ActionDock({state,dispatch,onSettings,onNotebook}:{state:GameState;dispatch:(action:GameAction)=>void;onSettings:()=>void;onNotebook:()=>void}) {
  const plant=state.plants.find(item=>item.id===state.selectedPlantId);
  const permission=canAdvance(state);
  const nextTest=testSequence[state.testsCompleted.length];
  const baseButton= state.phase==="seedling"||state.phase==="vegetative"||state.phase==="flower" ? <button className="primary-button dock-primary" onClick={()=>dispatch({type:"ADVANCE"})} disabled={!permission.allowed} title={permission.reason}>{state.phase==="flower"?(state.week>=5?"Open harvest window":`Advance to week ${state.week+1}`):state.phase==="vegetative"?"Enter flower":"Advance to vegetation"}<span>{permission.allowed?"→":"Locked"}</span></button> : null;
  return <footer className="action-dock" aria-label="Stage actions"><div className="dock-context"><span className="eyebrow">Next decision</span><strong>{phaseCopy[state.phase].objective}</strong><small>{phaseCopy[state.phase].action}</small></div><div className="dock-actions">
    {state.lastCulledId&&<button onClick={()=>dispatch({type:"UNDO_CULL"})}>Undo cull</button>}
    {state.phase==="vegetative"&&plant&&<button onClick={()=>dispatch({type:"CLONE",plantId:plant.id})} disabled={plant.cloned||plant.status!=="active"}><Icon name="clone"/>{plant.cloned?"Clone secured":"Clone · $90"}</button>}
    {state.phase==="testing"&&<button className="primary-button dock-primary" onClick={()=>dispatch({type:"RUN_TEST"})}>{nextTest}<span>Reveal →</span></button>}
    {baseButton}
    <button onClick={onNotebook}><Icon name="book"/>Notebook</button><button onClick={onSettings}><Icon name="gear"/>Pause</button>
  </div></footer>;
}

function TopBar({state,saveStatus,onMenu,onSettings,onNotebook,onCopy}:{state:GameState;saveStatus:string;onMenu:()=>void;onSettings:()=>void;onNotebook:()=>void;onCopy:()=>void}) {
  const active=state.plants.filter(item=>item.status!=="culled").length;
  return <header className="command-bar"><button className="brand-button" onClick={onMenu} aria-label="Return to main menu"><Logo small/></button><div className="command-stats"><StatPill label="Generation" value={`F${state.generation}`}/><StatPill label="Week" value={state.phase==="seedling"?"01":String(state.week).padStart(2,"0")}/><StatPill label="Funds" value={`$${state.resources.funds}`}/><StatPill label="Grow slots" value={`${active}/12`}/><StatPill label="Research" value={state.resources.research}/><StatPill label="Reputation" value={state.resources.reputation}/></div><div className="command-tools"><button onClick={onCopy} title="Copy run seed"><Icon name="seed"/><span>{state.runSeed}</span></button><button onClick={onNotebook}><Icon name="book"/><span>Notebook</span></button><button onClick={onSettings}><Icon name="gear"/><span>Settings</span></button><span className="save-status"><i/>{saveStatus}</span></div></header>;
}

function StageRail({state}:{state:GameState}) {
  const current=stages.indexOf(state.phase);
  return <aside className="stage-rail"><span className="eyebrow">Hunt protocol</span><ol>{stages.slice(0,-1).map((stage,index)=><li key={stage} className={index<current?"done":index===current?"current":""}><span>{index<current?"✓":String(index+1).padStart(2,"0")}</span><div><strong>{phaseCopy[stage].label}</strong><small>{index<current?"Complete":index===current?"In progress":"Locked"}</small></div></li>)}</ol></aside>;
}

function Chamber({state,dispatch}:{state:GameState;dispatch:(action:GameAction)=>void}) {
  const [filter,setFilter]=useState<"active"|"tagged"|"cloned"|"culled">("active");
  const [sort,setSort]=useState<"id"|"vigor"|"goal">("id");
  const plants=[...state.plants].filter(plant=>filter==="active"?plant.status!=="culled":filter==="tagged"?plant.tagged:filter==="cloned"?plant.cloned:plant.status==="culled").sort((a,b)=>sort==="vigor"?b.traits.vigor-a.traits.vigor:sort==="goal"?b.goalScore-a.goalScore:a.index-b.index);
  return <section className="chamber-panel"><header className="chamber-head"><div><span className="eyebrow">Bio-electric breeder lab · Zone A</span><h1>{phaseCopy[state.phase].label}</h1><p>{phaseCopy[state.phase].action}</p></div><div className="chamber-controls"><label>Show<select value={filter} onChange={(event)=>setFilter(event.target.value as typeof filter)}><option value="active">Active plants</option><option value="tagged">Tagged</option><option value="cloned">Cloned</option><option value="culled">Cull archive</option></select></label><label>Sort<select value={sort} onChange={(event)=>setSort(event.target.value as typeof sort)}><option value="id">Plant ID</option><option value="vigor">Visible vigor</option><option value="goal">Goal fit</option></select></label></div></header><div className="light-rig"><span/><span/><span/></div>
    {plants.length?<div className="plant-grid">{plants.map(plant=><PlantCard key={plant.id} plant={plant} state={state} onSelect={()=>dispatch({type:"SELECT_PLANT",plantId:plant.id})} onCompare={()=>dispatch({type:"TOGGLE_COMPARE",plantId:plant.id})}/>)}</div>:<div className="empty-state"><Icon name="lab"/><h3>No plants in this view</h3><p>Change the filter to see the active population or archived culls.</p></div>}
  </section>;
}

function Comparison({state,onClose}:{state:GameState;onClose:()=>void}) {
  const items=state.compareIds.map(id=>state.plants.find(item=>item.id===id)).filter(Boolean) as Plant[];
  const visible=visibleTraitKeys(state.phase,state.week,state.testsCompleted);
  const keys:TraitKey[]=["vigor","branching","stemStrength","resin","aroma","flavor","effect","stability","breeding"];
  return <Modal title="Plant comparison" eyebrow={`${items.length} specimens · no automatic winner`} onClose={onClose} wide><div className="comparison-grid">{items.map(plant=><article key={plant.id} className="comparison-column"><PlantPortrait plant={plant} phase={state.phase} week={state.week} compact/><h3>{plant.id}</h3><span className="comparison-rarity">{visible.includes("breeding")?plant.rarity:"Identity unresolved"}</span>{keys.map(key=><div className="comparison-row" key={key}><span>{traitLabels[key]}</span><strong>{visible.includes(key)?plant.traits[key].toFixed(1):"?"}</strong></div>)}<div className="comparison-callout"><span>TRADEOFF</span><p>{plant.linkage&&visible.includes("breeding")?plant.linkage:"Hidden uncertainty remains"}</p></div></article>)}</div>{items.length<2&&<div className="empty-state"><p>Add 2–4 plants using the Compare control on each specimen.</p></div>}</Modal>;
}

function EventModal({state,dispatch}:{state:GameState;dispatch:(action:GameAction)=>void}) {
  const event=events.find(item=>item.id===state.activeEventId);
  if(!event)return null;
  return <Modal title={event.title} eyebrow={event.eyebrow} onClose={()=>{}}><div className="event-visual"><span className="event-heat"/><Icon name="spark"/></div><p className="modal-lead">{event.description}</p><div className="event-choices">{event.choices.map(choice=><button key={choice.id} onClick={()=>dispatch({type:"RESOLVE_EVENT",eventId:event.id,choiceId:choice.id})}><div><strong>{choice.label}</strong><p>{choice.detail}</p></div><span>{choice.cost??"Decision"} →</span></button>)}</div></Modal>;
}

function HarvestCurePanel({state,dispatch}:{state:GameState;dispatch:(action:GameAction)=>void}) {
  if(state.phase!=="harvest"&&state.phase!=="cure")return null;
  const harvest=[
    ["early","Bright window","Sharper aroma, lower yield","+ clarity · − yield"],
    ["balanced","Balanced window","Preserve the broadest expression","+ flavor · + consistency"],
    ["late","Deep window","More weight and output","+ body · − clarity"],
  ] as const;
  const cure=[
    ["fast","Fast turnaround","Speed protects funds, not nuance","− flavor depth"],
    ["balanced","Measured cure","Reliable sensory definition","+ aroma · + flavor"],
    ["slow","Premium patience","Highest upside with a little uncertainty","++ flavor · + aroma"],
  ] as const;
  const options=state.phase==="harvest"?harvest:cure;
  return <div className="phase-overlay"><section><span className="eyebrow">Irreversible project decision</span><h2>{state.phase==="harvest"?"Choose the harvest window":"Choose the cure strategy"}</h2><p>{state.phase==="harvest"?"Timing changes the finished expression across the whole population. There is no universally correct window.":"A simplified strategic choice; this game does not provide real-world cultivation procedure."}</p><div className="phase-choice-grid">{options.map(option=><button key={option[0]} onClick={()=>{if(state.phase==="harvest")dispatch({type:"CHOOSE_HARVEST",choice:option[0] as "early"|"balanced"|"late"});else dispatch({type:"CHOOSE_CURE",choice:option[0] as "fast"|"balanced"|"slow"});}}><span>{option[0].toUpperCase()}</span><strong>{option[1]}</strong><p>{option[2]}</p><small>{option[3]}</small></button>)}</div></section></div>;
}

function KeeperPanel({state,dispatch}:{state:GameState;dispatch:(action:GameAction)=>void}) {
  if(state.phase!=="keeper"&&state.phase!=="complete")return null;
  const keeper=state.plants.find(item=>item.id===state.keeperId);
  const selected=state.plants.find(item=>item.id===state.selectedPlantId)??state.plants.find(item=>item.status==="active");
  const candidates=state.plants.filter(item=>item.status!=="culled").sort((a,b)=>b.goalScore-a.goalScore);
  const female=getParent(state.femaleParentId),pollen=getParent(state.pollenParentId);
  const suggestions=selected?makeNameSuggestions(selected,female.name,pollen.name):[];
  if(state.phase==="complete"&&keeper)return <div className="phase-overlay phase-overlay--keeper"><section className="keeper-reveal"><span className="eyebrow">Generation secured · Hall of Fame entry</span><div className="legendary-seal"><Icon name="spark"/></div><PlantPortrait plant={keeper} phase="complete" week={state.week}/><h2>{state.keeperName}</h2><p>{female.name} × {pollen.name} · {keeper.rarity}</p><div className="keeper-facts"><span><small>AROMA</small>{keeper.aromaFamily}</span><span><small>EFFECT</small>{keeper.effectProfile}</span><span><small>NEXT STEP</small>{state.nextGenerationMethod} · Generation 2</span></div><div className="achievement-toast"><b>Achievement unlocked</b><strong>First Keeper</strong><span>One plant turned uncertainty into identity.</span></div></section></div>;
  return <div className="phase-overlay"><section className="keeper-lab"><span className="eyebrow">The final cut</span><h2>Select a keeper. Preserve a story.</h2><p>Goal-fit is evidence, not authority. Consider the tradeoff you are willing to carry into the next generation.</p><div className="candidate-strip">{candidates.map(plant=><button key={plant.id} className={state.keeperId===plant.id?"selected":""} onClick={()=>dispatch({type:"SELECT_KEEPER",plantId:plant.id})}><PlantPortrait plant={plant} phase="keeper" week={state.week} compact/><strong>{plant.id}</strong><span>{plant.goalScore.toFixed(1)} goal fit</span><small>{plant.rarity}</small></button>)}</div>{state.keeperId&&selected&&<div className="naming-station"><div><span className="eyebrow">Naming engine</span><h3>Give {selected.id} its permanent identity</h3><div className="name-suggestions">{suggestions.map((name,index)=><button key={name} onClick={()=>dispatch({type:"NAME_KEEPER",name})}><span>{["Premium","Weird","Old-school","Sci-fi","Funny","Breeder"][index]}</span>{name}</button>)}</div></div><label><span>Custom cultivar name</span><input value={state.keeperName} maxLength={48} onChange={(event)=>dispatch({type:"NAME_KEEPER",name:event.target.value})} placeholder="Enter a memorable name…"/><small>{state.keeperName.length}/48</small></label><div className="line-actions"><button onClick={()=>dispatch({type:"COMPLETE_LINE",method:"F2"})}><strong>Make F2</strong><span>Wider segregation · more recombinant risk</span></button><button onClick={()=>dispatch({type:"COMPLETE_LINE",method:"Backcross"})}><strong>Backcross</strong><span>Recover a parent&apos;s defining signal</span></button></div></div>}</section></div>;
}

function Notebook({state,onClose,onHall}:{state:GameState;onClose:()=>void;onHall:()=>void}) {
  const goal=goals.find(item=>item.id===state.goalId)!;
  return <Modal title="Breeder notebook" eyebrow="Field journal × genetic archive" onClose={onClose} wide><div className="notebook-layout"><aside><span className="notebook-label">PROJECT</span><strong>{goal.name}</strong><p>{getParent(state.femaleParentId).name} × {getParent(state.pollenParentId).name}</p><dl><div><dt>Run seed</dt><dd>{state.runSeed}</dd></div><div><dt>Generation</dt><dd>F{state.generation}</dd></div><div><dt>Population</dt><dd>{state.plants.filter(item=>item.status!=="culled").length} active</dd></div><div><dt>Clones</dt><dd>{state.plants.filter(item=>item.cloned&&item.status!=="culled").length}/{state.resources.cloneCapacity}</dd></div></dl><button onClick={onHall}>Open Hall of Fame</button></aside><div className="notebook-pages"><section><span className="notebook-label">LINEAGE RECORD</span><div className="lineage-map"><div><i style={{background:getParent(state.femaleParentId).color}}/><strong>{getParent(state.femaleParentId).name}</strong><small>Seed parent · {getParent(state.femaleParentId).generation}</small></div><b>×</b><div><i style={{background:getParent(state.pollenParentId).color}}/><strong>{getParent(state.pollenParentId).name}</strong><small>Pollen parent · {getParent(state.pollenParentId).generation}</small></div><span>↓</span><div className="lineage-child"><strong>F{state.generation} · {state.keeperName||"Unnamed population"}</strong><small>{state.nextGenerationMethod?`${state.nextGenerationMethod} queued`:"Selection in progress"}</small></div></div></section><section><span className="notebook-label">ACTION LOG</span><div className="log-list">{state.actionLog.map((entry,index)=><div key={`${entry}-${index}`}><span>{String(state.actionLog.length-index).padStart(2,"0")}</span><p>{entry}</p></div>)}</div></section><section><span className="notebook-label">ACHIEVEMENTS</span>{state.achievements.length?<div className="achievement-list">{state.achievements.map(item=><span key={item}><Icon name="spark"/>{item}</span>)}</div>:<div className="empty-line">The archive is waiting for its first keeper.</div>}</section></div></div></Modal>;
}

function Settings({state,onClose,onReplace,audio,reducedMotion,setReducedMotion,textScale,setTextScale}:{state:GameState;onClose:()=>void;onReplace:(state:GameState)=>void;audio:ReturnType<typeof useGameAudio>;reducedMotion:boolean;setReducedMotion:(value:boolean)=>void;textScale:number;setTextScale:(value:number)=>void}) {
  const [slots,setSlots]=useState(()=>[1,2,3].map(loadSlot));
  const [importText,setImportText]=useState("");
  const [error,setError]=useState("");
  const refresh=()=>setSlots([1,2,3].map(loadSlot));
  const download=()=>{const blob=new Blob([exportSave(state)],{type:"application/json"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=`phenohunter-${state.runSeed}.json`;link.click();URL.revokeObjectURL(url);};
  return <Modal title="Paused · Lab settings" eyebrow="Accessibility, audio, and saves" onClose={onClose} wide><div className="settings-grid"><section><h3>Experience</h3><label className="toggle-row"><span><Icon name="sound"/><b>Game audio</b><small>Atmospheric hum and restrained cues</small></span><input type="checkbox" checked={!audio.muted} onChange={(event)=>audio.setMuted(!event.target.checked)} disabled={!audio.supported}/></label><label className="range-row"><span>Audio volume</span><input type="range" min="0" max="1" step="0.05" value={audio.volume} onChange={(event)=>audio.setVolume(Number(event.target.value))}/><b>{Math.round(audio.volume*100)}%</b></label><label className="toggle-row"><span><b>Reduced motion</b><small>Minimize plant and atmospheric animation</small></span><input type="checkbox" checked={reducedMotion} onChange={(event)=>setReducedMotion(event.target.checked)}/></label><label className="range-row"><span>Interface scale</span><input type="range" min="0.9" max="1.2" step="0.05" value={textScale} onChange={(event)=>setTextScale(Number(event.target.value))}/><b>{Math.round(textScale*100)}%</b></label><div className="glossary"><h3>Quick glossary</h3>{glossary.map(item=><details key={item[0]}><summary>{item[0]}</summary><p>{item[1]}</p></details>)}</div></section><section><h3>Manual save slots</h3><div className="save-slots">{slots.map((slot,index)=><article key={index}><div><span>Slot {index+1}</span><strong>{slot?`${slot.state.runSeed} · ${phaseCopy[slot.state.phase].label}`:"Empty slot"}</strong><small>{slot?new Date(slot.savedAt).toLocaleString():"No record stored"}</small></div><div><button onClick={()=>{saveSlot(index+1,state);refresh();}}>Save</button><button disabled={!slot} onClick={()=>slot&&onReplace(slot.state)}>Load</button><button className="danger-button" disabled={!slot} onClick={()=>{if(window.confirm(`Delete manual save slot ${index+1}?`)){deleteSlot(index+1);refresh();}}}>Delete</button></div></article>)}</div><div className="save-transfer"><h3>Save transfer</h3><p>Export a versioned JSON save or paste one below. Invalid and corrupted data is rejected safely.</p><button onClick={download}>Export save file</button><textarea value={importText} onChange={(event)=>setImportText(event.target.value)} placeholder="Paste exported save JSON…"/><button onClick={()=>{try{onReplace(importSave(importText));setError("");}catch(issue){setError(issue instanceof Error?issue.message:"Import failed.");}}}>Import and load</button>{error&&<p className="error-message" role="alert">{error}</p>}</div></section></div></Modal>;
}

function Tutorial({state,onClose}:{state:GameState;onClose:()=>void}) {
  const copy = state.phase==="seedling"?["1 / 12 · First read","Don’t fall in love with numbers yet.","Seedlings only reveal vigor, height, and stress response. Inspect a few, then cull one to make the first real commitment."] : state.phase==="vegetative"?["5 / 12 · Protect the hunch","A memory without a backup is just a story.","Select a promising plant and reserve a clone. Stem rub is evidence; the finished jar can still disagree."] : state.phase==="flower"?["7 / 12 · The room answers","Watch what changes—not just what gets bigger.","Advance each week. A garden event will force a resource tradeoff before the final flower traits resolve."] : state.phase==="testing"?["9 / 12 · Break the beauty bias","Pretty is not the same as memorable.","Run every sensory step in order. Flavor and effect can turn a quiet plant into the keeper."] : state.phase==="keeper"?["10 / 12 · The final cut","The top score is a witness, not a judge.","Select a plant, name it, then choose whether to widen the line with an F2 or pull it toward a parent with a backcross."] : ["Hunt protocol","Keep the question in front of you.",phaseCopy[state.phase].objective];
  return <div className="tutorial-bubble" role="status"><div className="guide-avatar"><span>MV</span><i/></div><div><span>{copy[0]}</span><strong>{copy[1]}</strong><p>{copy[2]}</p></div><button onClick={onClose}>Dismiss guide</button></div>;
}

function HallScreen({entries,onBack}:{entries:GameState["hallOfFame"];onBack:()=>void}) {
  return <main className="hall-screen"><header className="setup-header"><button className="text-button" onClick={onBack}>← Main menu</button><Logo small/><span>Genetic archive</span></header><section className="hall-hero"><span className="eyebrow">Hall of Fame · Retired cultivars</span><h1>The plants that changed the notebook.</h1><p>Every entry preserves its origin seed, parentage, finished sensory identity, and next-generation path.</p></section>{entries.length?<div className="hall-grid">{entries.map(entry=><article key={entry.id}><div className="hall-portrait" style={{"--entry-color":entry.color} as React.CSSProperties}><span className="hall-plant-symbol"><i/><b/><em/></span><span>{entry.awards[0]}</span></div><div className="hall-copy"><span>F{entry.generation} · {new Date(entry.discoveryDate).toLocaleDateString()}</span><h2>{entry.name}</h2><p>{entry.parentage}</p><dl><div><dt>Aroma</dt><dd>{entry.aroma}</dd></div><div><dt>Effect</dt><dd>{entry.effects}</dd></div><div><dt>Next line</dt><dd>{entry.descendants}</dd></div><div><dt>Run seed</dt><dd>{entry.seed}</dd></div></dl></div></article>)}</div>:<div className="hall-empty"><div className="empty-sigil"><Icon name="spark"/></div><h2>No legends—yet.</h2><p>Complete a Quick Hunt and the first keeper will take its place here.</p><button className="primary-button" onClick={onBack}>Return to the lab</button></div>}</main>;
}

export function GameShell() {
  const hydrated=useSyncExternalStore(subscribeToHydration,()=>true,()=>false);
  const [screen,setScreen]=useState<Screen>(()=>typeof window!=="undefined"&&window.localStorage.getItem("phenohunter.age-ack")==="yes"?"menu":"gate");
  const [game,setGame]=useState<GameState|null>(()=>typeof window!=="undefined"?loadAutosave():null);
  const [hasSave,setHasSave]=useState(()=>Boolean(game));
  const [tutorial,setTutorial]=useState(true);
  const [dismissedTutorialPhase,setDismissedTutorialPhase]=useState<string|null>(null);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [notebookOpen,setNotebookOpen]=useState(false);
  const [compareOpen,setCompareOpen]=useState(false);
  const [cullTarget,setCullTarget]=useState<Plant|null>(null);
  const [mobilePanel,setMobilePanel]=useState<MobilePanel>("chamber");
  const [saveStatus,setSaveStatus]=useState("Local save ready");
  const [reducedMotion,setReducedMotion]=useState(()=>typeof window!=="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [textScale,setTextScale]=useState(1);
  const [uiNotice,setUiNotice]=useState("");
  const audio=useGameAudio();
  const saveTimer=useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(()=>{if("serviceWorker" in navigator&&process.env.NODE_ENV==="production")navigator.serviceWorker.register("/sw.js").catch(()=>undefined);},[]);
  useEffect(()=>{if(!game||!hydrated)return;if(saveTimer.current)clearTimeout(saveTimer.current);saveTimer.current=setTimeout(()=>{const saved=autosave(game);setSaveStatus(saved?"Autosaved":"Save unavailable");setHasSave(saved);},350);return()=>{if(saveTimer.current)clearTimeout(saveTimer.current);};},[game,hydrated]);

  const dispatch=useCallback((action:GameAction)=>{setSaveStatus("Saving…");setGame(current=>current?reduceGame(current,action):current);if(action.type==="RUN_TEST")audio.click("reveal");else if(action.type==="COMPLETE_LINE")audio.click("keeper");else audio.click("soft");},[audio]);
  const start=(female:string,pollen:string,goal:GoalId,seed:string)=>{const hall=game?.hallOfFame??[];setGame(createGame(female,pollen,goal,seed,hall));setDismissedTutorialPhase(null);setScreen("game");};
  const openNew=(guided:boolean)=>{setTutorial(guided);setDismissedTutorialPhase(null);setScreen("setup");};
  const copySeed=async()=>{if(!game)return;try{await navigator.clipboard.writeText(game.runSeed);setUiNotice("Run seed copied to the clipboard.");}catch{setUiNotice(`Run seed: ${game.runSeed}`);}setTimeout(()=>setUiNotice(""),2400);};
  const replaceGame=(state:GameState)=>{setGame(state);setScreen("game");setSettingsOpen(false);setUiNotice("Save loaded safely.");};
  const appStyle={"--ui-scale":String(textScale)} as React.CSSProperties;
  if(!hydrated)return <div className="loading-screen"><Logo/><span>Calibrating the breeder lab…</span></div>;
  if(screen==="gate")return <AgeGate onAccept={()=>{window.localStorage.setItem("phenohunter.age-ack","yes");setScreen("menu");}}/>;
  if(screen==="menu")return <MainMenu hasSave={hasSave} onNew={openNew} onContinue={()=>{const saved=loadAutosave();if(saved){setGame(saved);setScreen("game");}}} onHall={()=>setScreen("hall")}/>;
  if(screen==="setup")return <SetupScreen onBack={()=>setScreen("menu")} onStart={start}/>;
  if(screen==="hall")return <HallScreen entries={game?.hallOfFame??[]} onBack={()=>setScreen("menu")}/>;
  if(!game)return <MainMenu hasSave={false} onNew={openNew} onContinue={()=>{}} onHall={()=>setScreen("hall")}/>;

  const tutorialVisible=tutorial&&dismissedTutorialPhase!==game.phase&&["seedling","vegetative","flower","testing","keeper"].includes(game.phase);
  return <main className={`game-shell panel-${mobilePanel} ${reducedMotion?"reduce-motion":""}`} style={appStyle}>
    <TopBar state={game} saveStatus={saveStatus} onMenu={()=>setScreen("menu")} onSettings={()=>setSettingsOpen(true)} onNotebook={()=>setNotebookOpen(true)} onCopy={copySeed}/>
    <div className="game-workspace"><StageRail state={game}/><Chamber state={game} dispatch={dispatch}/><Inspector state={game} dispatch={dispatch} onCull={setCullTarget} onCompare={()=>setCompareOpen(true)}/></div>
    <ActionDock state={game} dispatch={dispatch} onSettings={()=>setSettingsOpen(true)} onNotebook={()=>setNotebookOpen(true)}/>
    <nav className="mobile-nav" aria-label="Game panels"><button className={mobilePanel==="chamber"?"active":""} onClick={()=>setMobilePanel("chamber")}><Icon name="lab"/>Chamber</button><button className={mobilePanel==="inspector"?"active":""} onClick={()=>setMobilePanel("inspector")}><Icon name="seed"/>Inspector</button><button className={mobilePanel==="notebook"?"active":""} onClick={()=>{setMobilePanel("notebook");setNotebookOpen(true);}}><Icon name="book"/>Notebook</button></nav>
    {game.notice&&<button className="game-notice" onClick={()=>dispatch({type:"CLEAR_NOTICE"})}><i/><span>{game.notice}</span><b>Dismiss</b></button>}
    {uiNotice&&<div className="ui-toast" role="status">{uiNotice}</div>}
    {tutorialVisible&&<Tutorial state={game} onClose={()=>setDismissedTutorialPhase(game.phase)}/>} 
    {game.activeEventId&&<EventModal state={game} dispatch={dispatch}/>}<HarvestCurePanel state={game} dispatch={dispatch}/><KeeperPanel state={game} dispatch={dispatch}/>
    {settingsOpen&&<Settings state={game} onClose={()=>setSettingsOpen(false)} onReplace={replaceGame} audio={audio} reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} textScale={textScale} setTextScale={setTextScale}/>} 
    {notebookOpen&&<Notebook state={game} onClose={()=>setNotebookOpen(false)} onHall={()=>{setNotebookOpen(false);setScreen("hall");}}/>}
    {compareOpen&&<Comparison state={game} onClose={()=>setCompareOpen(false)}/>} 
    {cullTarget&&<Modal title={`Cull ${cullTarget.id}?`} eyebrow="Irreversible selection · undo available once" onClose={()=>setCullTarget(null)}><div className="cull-confirm"><PlantPortrait plant={cullTarget} phase={game.phase} week={game.week} compact/><p>This removes the plant from the active population and releases its grow slot. Its record remains in the notebook.</p><div><button onClick={()=>setCullTarget(null)}>Keep evaluating</button><button className="danger-button" onClick={()=>{dispatch({type:"CULL",plantId:cullTarget.id});setCullTarget(null);}}>Confirm cull</button></div></div></Modal>}
  </main>;
}
