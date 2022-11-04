export declare type ModelName = "NovelAI";
export interface Prompt extends Record<string, unknown> {
    model: ModelName;
    source: string;
}
