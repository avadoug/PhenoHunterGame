"use client";

import { useEffect, useRef } from "react";

export function Modal({ title, eyebrow, onClose, children, wide=false }: { title:string; eyebrow?:string; onClose:()=>void; children:React.ReactNode; wide?:boolean }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const previous = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelector<HTMLElement>("button, input, textarea, select, a[href]");
    focusable?.focus();
    const onKey = (event:KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown",onKey);
    return ()=>{ window.removeEventListener("keydown",onKey); previous?.focus(); };
  },[onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget) onClose();}}>
    <div className={`modal-card ${wide?"modal-card--wide":""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
      <header className="modal-header"><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h2 id="modal-title">{title}</h2></div><button className="icon-button" onClick={onClose} aria-label={`Close ${title}`}>Close</button></header>
      {children}
    </div>
  </div>;
}
