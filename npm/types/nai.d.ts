import * as dntShim from "./_dnt.shims.js";
import { Chunk } from "./deps.js";
declare const NAIExifTag: readonly ["Title", "Description", "Software", "Source", "Comment"];
export declare type NAIExifTagType = typeof NAIExifTag[number];
export declare type NAISamplingAlgorithm = "k_euler_ancestral" | "k_euler" | "k_lms" | "plms" | "ddim";
export declare const NAISoftwareName = "NovelAI";
export interface NAIPrompt {
    positive: string;
    negative: string;
    size: {
        width: number;
        height: number;
    };
    seed: number;
    steps: number;
    scale: number;
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
export declare class NAIPromptLoader {
    file: dntShim.File;
    chunks: Chunk[];
    exif: any;
    constructor(exif: any);
    loadFile: (file: dntShim.File) => Promise<void>;
    getPrompt: () => NAIPrompt;
}
export {};
