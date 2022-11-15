import { exifr } from "./deps.js";
import { NAIPromptLoader } from "./nai.js";
import { WebUIPromptLoader } from "./webui.js";
export const loadPrompt = async (file) => {
    const exif = await exifr.parse(file);
    const swoftware = exif.Software;
    switch (swoftware) {
        case "NovelAI": {
            const loader = new NAIPromptLoader(exif);
            await loader.loadFile(file);
            const decoded = loader.getPrompt();
            return decoded;
        }
        default: {
            // WebUI
            const loader = new WebUIPromptLoader(exif);
            await loader.loadFile(file);
            const decoded = loader.getPrompt();
            return decoded;
        }
    }
};
