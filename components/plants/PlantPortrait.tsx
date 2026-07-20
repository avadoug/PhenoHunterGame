import type { Phase, Plant } from "@/types/game";

export function PlantPortrait({ plant, phase, week, compact=false }: { plant:Plant; phase:Phase; week:number; compact?:boolean }) {
  const maturity = phase === "seedling" ? 0.48 : phase === "vegetative" ? 0.72 : phase === "flower" ? 0.78 + week * 0.035 : 1;
  const height = Math.round((58 + plant.traits.height * 4.6) * maturity);
  const spread = Math.round(28 + plant.traits.branching * 3.4);
  const leafCount = compact ? 4 : Math.max(4, Math.round(plant.traits.branching));
  const isFlower = ["flower","harvest","cure","testing","keeper","complete"].includes(phase);
  const flowerCount = isFlower ? Math.max(2, Math.round((plant.traits.resin + week) / 2.7)) : 0;
  const hue = 82 + plant.index * 5 + plant.traits.color * 2;
  const style = {
    "--plant-height": `${height}px`,
    "--plant-spread": `${spread}px`,
    "--plant-hue": `${hue}`,
    "--plant-lean": `${(plant.seedOffset % 9) - 4}deg`,
    "--leaf-width": `${9 + plant.traits.branching * 0.7}px`,
  } as React.CSSProperties;

  return (
    <div className={`plant-portrait ${compact ? "plant-portrait--compact" : ""} ${plant.status === "culled" ? "is-culled" : ""}`} style={style} aria-hidden="true">
      <div className="plant-aura" />
      <div className="plant-stem">
        {Array.from({length:leafCount},(_,index)=>(
          <div key={index} className={`plant-leaf plant-leaf--${index % 2 ? "right" : "left"}`} style={{bottom:`${13 + index * (height / (leafCount + 2))}px`,transform:`rotate(${index % 2 ? 24 + (plant.seedOffset%8) : -24 - (plant.seedOffset%8)}deg) scale(${0.72 + index/leafCount*0.32})`}} />
        ))}
        {Array.from({length:flowerCount},(_,index)=>(
          <div key={`flower-${index}`} className="plant-flower" style={{bottom:`${26 + index * Math.max(11,height/(flowerCount+1))}px`,left:`${index % 2 ? spread/5 : -spread/5}px`,opacity:0.62 + plant.traits.resin/28}} />
        ))}
        {plant.mutation && <div className="plant-mutation" />}
      </div>
      <div className="plant-pot"><span>{plant.id}</span></div>
    </div>
  );
}
