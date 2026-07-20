import { validateGameState } from "@/engine/game";
import type { GameState } from "@/types/game";

const AUTOSAVE_KEY = "phenohunter.autosave.v1";
const HALL_KEY = "phenohunter.hall.v1";

export interface SaveEnvelope {
  schemaVersion: 1;
  label: string;
  savedAt: string;
  state: GameState;
}

function storageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function autosave(state: GameState): boolean {
  if (!storageAvailable()) return false;
  try {
    const envelope: SaveEnvelope = { schemaVersion:1,label:"Autosave",savedAt:new Date().toISOString(),state };
    window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(envelope));
    window.localStorage.setItem(HALL_KEY, JSON.stringify(state.hallOfFame));
    return true;
  } catch {
    return false;
  }
}

export function loadAutosave(): GameState | null {
  if (!storageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SaveEnvelope>;
    return parsed.schemaVersion === 1 && validateGameState(parsed.state) ? parsed.state : null;
  } catch {
    return null;
  }
}

export function saveSlot(slot: number, state: GameState): void {
  if (!storageAvailable() || slot < 1 || slot > 3) return;
  const envelope: SaveEnvelope = { schemaVersion:1,label:`Manual slot ${slot}`,savedAt:new Date().toISOString(),state };
  window.localStorage.setItem(`phenohunter.slot.${slot}.v1`, JSON.stringify(envelope));
}

export function loadSlot(slot: number): SaveEnvelope | null {
  if (!storageAvailable() || slot < 1 || slot > 3) return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(`phenohunter.slot.${slot}.v1`) ?? "null") as SaveEnvelope | null;
    return parsed?.schemaVersion === 1 && validateGameState(parsed.state) ? parsed : null;
  } catch {
    return null;
  }
}

export function deleteSlot(slot: number): void {
  if (storageAvailable()) window.localStorage.removeItem(`phenohunter.slot.${slot}.v1`);
}

export function exportSave(state: GameState): string {
  const envelope: SaveEnvelope = { schemaVersion:1,label:"Exported hunt",savedAt:new Date().toISOString(),state };
  return JSON.stringify(envelope, null, 2);
}

export function importSave(raw: string): GameState {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("This file is not valid JSON.");
  }
  const candidate = (parsed as Partial<SaveEnvelope>)?.state ?? parsed;
  if (!validateGameState(candidate)) throw new Error("This save is corrupted or uses an unsupported schema.");
  return candidate;
}
