import { Chunk } from "./deps.js";
import { Prompt, PromptLoader } from "./prompt.js";
declare const NAIExifTag: readonly ["Title", "Description", "Software", "Source", "Comment"];
export declare type NAIExifTagType = typeof NAIExifTag[number];
export declare type NAISamplingAlgorithm = "k_euler_ancestral" | "k_euler" | "k_lms" | "plms" | "ddim";
export declare const NAISoftwareName = "NovelAI";
export interface NAIPrompt extends Prompt {
    model: typeof NAISoftwareName;
    strength: number;
    noise: number;
    samplingAlgorithm: NAISamplingAlgorithm;
}
export interface NAIMetaComment {
    steps: number;
    sampler: string;
    seed: number;
    strength: number;
    noise: number;
    scale: number;
    uc: string;
}
export interface NAIChunk extends Chunk {
    keyword: NAIExifTagType;
    text: string;
}
export declare class NAIPromptLoader extends PromptLoader {
    getPrompt: () => NAIPrompt;
}
export {};
