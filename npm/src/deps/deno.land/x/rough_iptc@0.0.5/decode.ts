import * as dntShim from "../../../../_dnt.shims.js";
import { Chunk } from "./extract.js"

export interface DecodedChunk {
    keyword: string
    text: string
}

export const decodeChunk = (chunk: Chunk): DecodedChunk => {
    let data!: Uint8Array
    if (chunk.data && chunk.name) {
        data = chunk.data
    }

    let naming = true
    let text = ""
    let name = ""

    for (let i = 0; i < data.length; i++) {
        const code = data[i]

        if (naming) {
            if (code) {
                name += String.fromCharCode(code)
            } else {
                naming = false
            }
        } else {
            if (code) {
                // text += String.fromCharCode(code)
                text = new dntShim.TextDecoder("utf-8").decode(data.slice(i))
                break
            } else {
                // throw new Error("Invalid NULL character found. 0x00 character is not permitted in tEXt content")
            }
        }
    }

    return {
        keyword: name,
        text: text,
    }
}
