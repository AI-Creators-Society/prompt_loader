"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPrompt = void 0;
const deps_js_1 = require("./deps.js");
const nai_js_1 = require("./nai.js");
const loadPrompt = async (file) => {
    const exif = await deps_js_1.exifr.parse(file);
    const swoftware = exif.Software;
    switch (swoftware) {
        case "NovelAI": {
            const loader = new nai_js_1.NAIPromptLoader(exif);
            await loader.loadFile(file);
            const decoded = loader.getPrompt();
            return decoded;
        }
        default: {
            throw new Error(`Unsupported software: ${swoftware}`);
        }
    }
};
exports.loadPrompt = loadPrompt;
