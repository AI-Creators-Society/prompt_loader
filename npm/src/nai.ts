import * as dntShim from "./_dnt.shims.js";
import { extractChunks, decodeChunk, Chunk } from "./deps.js"

const NAIExifTag = ["Title", "Description", "Software", "Source", "Comment"] as const
export type NAIExifTagType = typeof NAIExifTag[number]
export type NAISamplingAlgorithm = "k_euler_ancestral" | "k_euler" | "k_lms" | "plms" | "ddim"
export const NAISoftwareName = "NovelAI"

export interface NAIPrompt {
    positive: string
    negative: string
    size: {
        width: number
        height: number
    }
    seed: number
    steps: number
    scale: number
    strength: number
    noise: number
    samplingAlgorithm: NAISamplingAlgorithm
}

export interface NAIMetaComment {
    steps: number
    sampler: string
    seed: number
    strength: number
    noise: number
    scale: number
    uc: string
}

export interface NAIChunk extends Chunk {
    keyword: NAIExifTagType
    text: string
}

export class NAIPromptLoader {
    file!: dntShim.File
    chunks!: Chunk[]
    exif: any

    constructor(exif: any) {
        this.exif = exif
    }

    loadFile = async (file: dntShim.File) => {
        this.file = file
        this.chunks = extractChunks(new Uint8Array(await file.arrayBuffer()))
    }

    getPrompt = () => {
        const decoded = this.chunks
            .map((chunk) => decodeChunk(chunk))
            .filter((chunk): chunk is NAIChunk => {
                return NAIExifTag.some((tag) => tag === chunk.keyword)
            })

        const positive = decoded.find((chunk) => chunk.keyword === "Description")?.text

        const comment = this.exif.Comment
        if (!comment) {
            throw new Error("Comment chunk not found")
        }

        const meta: NAIMetaComment = JSON.parse(comment)

        if (!positive) {
            throw new Error("Description chunk not found")
        }

        const metaInfo: NAIPrompt = {
            positive: positive ?? "",
            negative: meta.uc,
            size: {
                width: this.exif.ImageWidth,
                height: this.exif.ImageHeight,
            },
            seed: meta.seed,
            steps: meta.steps,
            scale: meta.scale,
            strength: meta.strength,
            noise: meta.noise,
            samplingAlgorithm: meta.sampler as NAISamplingAlgorithm,
        }

        return metaInfo
    }
}
