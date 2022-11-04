import { exifr } from "./deps.ts"
import { NAIPromptLoader } from "./nai.ts"

type SupportedSoftware = "NovelAI"

export const loadPrompt = async (file: File) => {
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
