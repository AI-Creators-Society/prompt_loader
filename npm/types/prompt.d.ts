import { Chunk } from "./deps.js";
export declare type ModelName = "NovelAI" | "Unknown" | string;
export interface Prompt extends Record<string, unknown> {
    model: ModelName;
    source: string;
    positive: string;
    negative: string;
    size: {
        width: number;
        height: number;
    };
    seed: number;
    steps: number;
    scale: number;
    samplingAlgorithm: string;
}
export declare class PromptLoader {
    file: File;
    chunks: Chunk[];
    exif: any;
    constructor(exif: any);
    loadFile: (file: File) => Promise<void>;
}
