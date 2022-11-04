export type ModelName = "NovelAI" // TODO: add more

export interface Prompt extends Record<string, unknown> {
    model: ModelName
    source: string
}
