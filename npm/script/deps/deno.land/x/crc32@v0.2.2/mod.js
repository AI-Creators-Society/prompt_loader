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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Crc32Stream_crc32;
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint8ArrayToHex = exports.hexToUint8Array = exports.numberToHex = exports.Crc32Stream = exports.crc32 = void 0;
const dntShim = __importStar(require("../../../../_dnt.shims.js"));
function crc32(arr) {
    if (typeof arr === "string") {
        arr = new dntShim.TextEncoder().encode(arr);
    }
    let crc = -1, i, j, l, temp, poly = 0xEDB88320;
    for (i = 0, l = arr.length; i < l; i += 1) {
        temp = (crc ^ arr[i]) & 0xff;
        for (j = 0; j < 8; j += 1) {
            if ((temp & 1) === 1) {
                temp = (temp >>> 1) ^ poly;
            }
            else {
                temp = (temp >>> 1);
            }
        }
        crc = (crc >>> 8) ^ temp;
    }
    return numberToHex(crc ^ -1);
}
exports.crc32 = crc32;
class Crc32Stream {
    constructor() {
        Object.defineProperty(this, "bytes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "poly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0xEDB88320
        });
        Object.defineProperty(this, "crc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0 ^ -1
        });
        Object.defineProperty(this, "encoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new dntShim.TextEncoder()
        });
        _Crc32Stream_crc32.set(this, "");
        this.reset();
    }
    get crc32() {
        return __classPrivateFieldGet(this, _Crc32Stream_crc32, "f");
    }
    reset() {
        __classPrivateFieldSet(this, _Crc32Stream_crc32, "", "f");
        this.crc = 0 ^ -1;
        for (let n = 0; n < 256; n += 1) {
            let c = n;
            for (let k = 0; k < 8; k += 1) {
                if (c & 1) {
                    c = this.poly ^ (c >>> 1);
                }
                else {
                    c = c >>> 1;
                }
            }
            this.bytes[n] = c >>> 0;
        }
    }
    append(arr) {
        if (typeof arr === "string") {
            arr = this.encoder.encode(arr);
        }
        let crc = this.crc;
        for (let i = 0, l = arr.length; i < l; i += 1) {
            crc = (crc >>> 8) ^ this.bytes[(crc ^ arr[i]) & 0xff];
        }
        this.crc = crc;
        __classPrivateFieldSet(this, _Crc32Stream_crc32, numberToHex(crc ^ -1), "f");
        return __classPrivateFieldGet(this, _Crc32Stream_crc32, "f");
    }
}
exports.Crc32Stream = Crc32Stream;
_Crc32Stream_crc32 = new WeakMap();
function numberToHex(n) {
    return (n >>> 0).toString(16).padStart(8, "0");
}
exports.numberToHex = numberToHex;
function hexToUint8Array(str) {
    if (str.length === 0 || str.length % 2 !== 0) {
        throw new Error(`The string "${str}" is not valid hex.`);
    }
    return new Uint8Array(str.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
exports.hexToUint8Array = hexToUint8Array;
function uint8ArrayToHex(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}
exports.uint8ArrayToHex = uint8ArrayToHex;
