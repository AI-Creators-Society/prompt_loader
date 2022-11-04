"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeChunk = void 0;
const dntShim = __importStar(require("../../../../_dnt.shims.js"));
const decodeChunk = (chunk) => {
    let data;
    if (chunk.data && chunk.name) {
        data = chunk.data;
    }
    let naming = true;
    let text = "";
    let name = "";
    for (let i = 0; i < data.length; i++) {
        const code = data[i];
        if (naming) {
            if (code) {
                name += String.fromCharCode(code);
            }
            else {
                naming = false;
            }
        }
        else {
            if (code) {
                // text += String.fromCharCode(code)
                text = new dntShim.TextDecoder("utf-8").decode(data.slice(i));
                break;
            }
            else {
                // throw new Error("Invalid NULL character found. 0x00 character is not permitted in tEXt content")
            }
        }
    }
    return {
        keyword: name,
        text: text,
    };
};
exports.decodeChunk = decodeChunk;
