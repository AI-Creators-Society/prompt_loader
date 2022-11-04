import { exifr } from "./deps.js"
import { NAIPromptLoader } from "./nai.js"
import { Prompt, ModelName } from "./prompt.js"

export const loadPrompt = async (file: File): Promise<Prompt | undefined> => {
    const exif = await exifr.parse(file)
    const swoftware: ModelName = exif.Software

    switch (swoftware) {
        case "NovelAI": {
            const loader = new NAIPromptLoader(exif)
            await loader.loadFile(file)
            const decoded = loader.getPrompt()
            return decoded
        }
        default: {
            throw new Error(`Unsupported software: ${swoftware}`)
        }
    }
}
