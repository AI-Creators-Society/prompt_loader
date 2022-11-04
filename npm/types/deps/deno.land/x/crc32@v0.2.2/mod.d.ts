export declare function crc32(arr: Uint8Array | string): string;
export declare class Crc32Stream {
    #private;
    private bytes;
    private poly;
    private crc;
    private encoder;
    constructor();
    get crc32(): string;
    reset(): void;
    append(arr: Uint8Array | string): string;
}
export declare function numberToHex(n: number): string;
export declare function hexToUint8Array(str: string): Uint8Array;
export declare function uint8ArrayToHex(bytes: Uint8Array): string;
