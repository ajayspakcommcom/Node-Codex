import { validateStructure } from "./communication/structure-validator.js";
import { createDefaultContentDraft } from "./communication/content-draft.js";

console.log(validateStructure(createDefaultContentDraft()));
