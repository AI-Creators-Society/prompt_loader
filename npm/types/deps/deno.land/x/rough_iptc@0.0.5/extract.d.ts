export interface Chunk {
    name: string;
    data: Uint8Array;
}
export declare const extractChunks: (data: Uint8Array) => Chunk[];
