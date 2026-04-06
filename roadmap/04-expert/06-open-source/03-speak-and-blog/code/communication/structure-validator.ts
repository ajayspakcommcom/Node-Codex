import type { ContentDraft } from "./content-draft.js";

export function validateStructure(draft: ContentDraft): boolean {
  return draft.sections.length >= 4 && draft.audience.length > 0 && draft.title.length > 0;
}
