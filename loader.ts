import { exifr } from "./deps.ts"
import { NAIPromptLoader } from "./nai.ts"
import { Prompt } from "./prompt.ts"

type SupportedSoftware = "NovelAI" // TODO: add more

export const loadPrompt = async (file: File): Promise<Prompt | undefined> => {
    const exif = await exifr.parse(file)
    const swoftware: SupportedSoftware = exif.Software

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
