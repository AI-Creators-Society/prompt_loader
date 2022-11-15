import { Chunk } from "./deps.js";
import { Prompt, PromptLoader } from "./prompt.js";
declare const WebUIExifTag: string[];
export declare type WebUIExifTagType = typeof WebUIExifTag[number];
export interface WebUIPrompt extends Prompt {
    clipSkip?: number;
}
export interface WebUIChunk extends Chunk {
    keyword: WebUIExifTagType;
    text: string;
}
export declare class WebUIPromptLoader extends PromptLoader {
    getPrompt: () => WebUIPrompt;
}
export {};
