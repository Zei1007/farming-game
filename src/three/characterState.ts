/**
 * Shared, non-React character position — same pattern as controls/inputState.ts.
 * Written every frame by Character, read every frame by anything that needs
 * proximity (e.g. InteractPrompt) without subscribing to React state.
 */
export const characterPosition = { x: 0, z: 3 };

export function setCharacterPosition(x: number, z: number) {
  characterPosition.x = x;
  characterPosition.z = z;
}

export function distanceToCharacter(x: number, z: number): number {
  return Math.hypot(characterPosition.x - x, characterPosition.z - z);
}
