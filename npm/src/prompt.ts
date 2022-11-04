export type ModelName = "NovelAI" // TODO: add more

export interface Prompt extends Record<string, unknown> {
    model: ModelName
    source: string
    positive: string
    negative: string
    size: {
        width: number
        height: number
    }
    seed: number
    steps: number
    scale: number
    samplingAlgorithm: string
}
