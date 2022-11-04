import { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export declare const dntGlobalThis: Omit<typeof globalThis, "TextDecoder" | "TextEncoder"> & {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
};
