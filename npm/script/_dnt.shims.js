"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dntGlobalThis = exports.TextDecoder = exports.TextEncoder = exports.Response = exports.Request = exports.Headers = exports.FormData = exports.File = exports.fetch = void 0;
const undici_1 = require("undici");
var undici_2 = require("undici");
Object.defineProperty(exports, "fetch", { enumerable: true, get: function () { return undici_2.fetch; } });
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return undici_2.File; } });
Object.defineProperty(exports, "FormData", { enumerable: true, get: function () { return undici_2.FormData; } });
Object.defineProperty(exports, "Headers", { enumerable: true, get: function () { return undici_2.Headers; } });
Object.defineProperty(exports, "Request", { enumerable: true, get: function () { return undici_2.Request; } });
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return undici_2.Response; } });
const textencoder_ponyfill_1 = require("textencoder-ponyfill");
var textencoder_ponyfill_2 = require("textencoder-ponyfill");
Object.defineProperty(exports, "TextEncoder", { enumerable: true, get: function () { return textencoder_ponyfill_2.TextEncoder; } });
Object.defineProperty(exports, "TextDecoder", { enumerable: true, get: function () { return textencoder_ponyfill_2.TextDecoder; } });
const dntGlobals = {
    fetch: undici_1.fetch,
    File: undici_1.File,
    FormData: undici_1.FormData,
    Headers: undici_1.Headers,
    Request: undici_1.Request,
    Response: undici_1.Response,
    TextEncoder: textencoder_ponyfill_1.TextEncoder,
    TextDecoder: textencoder_ponyfill_1.TextDecoder,
};
exports.dntGlobalThis = createMergeProxy(globalThis, dntGlobals);
// deno-lint-ignore ban-types
function createMergeProxy(baseObj, extObj) {
    return new Proxy(baseObj, {
        get(_target, prop, _receiver) {
            if (prop in extObj) {
                return extObj[prop];
            }
            else {
                return baseObj[prop];
            }
        },
        set(_target, prop, value) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            baseObj[prop] = value;
            return true;
        },
        deleteProperty(_target, prop) {
            let success = false;
            if (prop in extObj) {
                delete extObj[prop];
                success = true;
            }
            if (prop in baseObj) {
                delete baseObj[prop];
                success = true;
            }
            return success;
        },
        ownKeys(_target) {
            const baseKeys = Reflect.ownKeys(baseObj);
            const extKeys = Reflect.ownKeys(extObj);
            const extKeysSet = new Set(extKeys);
            return [...baseKeys.filter((k) => !extKeysSet.has(k)), ...extKeys];
        },
        defineProperty(_target, prop, desc) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            Reflect.defineProperty(baseObj, prop, desc);
            return true;
        },
        getOwnPropertyDescriptor(_target, prop) {
            if (prop in extObj) {
                return Reflect.getOwnPropertyDescriptor(extObj, prop);
            }
            else {
                return Reflect.getOwnPropertyDescriptor(baseObj, prop);
            }
        },
        has(_target, prop) {
            return prop in extObj || prop in baseObj;
        },
    });
}
