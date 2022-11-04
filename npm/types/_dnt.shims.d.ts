import { fetch, File, FormData, Headers, Request, Response } from "undici";
export { fetch, File, FormData, Headers, Request, Response, type BodyInit, type HeadersInit, type RequestInit, type ResponseInit } from "undici";
import { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export { TextEncoder, TextDecoder } from "textencoder-ponyfill";
export declare const dntGlobalThis: Omit<typeof globalThis, "fetch" | "File" | "FormData" | "Headers" | "Request" | "Response" | "TextDecoder" | "TextEncoder"> & {
    fetch: typeof fetch;
    File: typeof File;
    FormData: typeof FormData;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
};
