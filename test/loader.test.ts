import { assertEquals } from "../deps.ts"
import { loadPrompt } from "../mod.ts"

Deno.test("load nai prompt", async () => {
    const data = Deno.readFileSync("./test/images/nai.png")
    const file = new File([data], "nai.png")
    const prompt = await loadPrompt(file)

    const expected = {
        positive: "masterpiece, best quality, {{{日本語}}}",
        negative:
            "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
        size: { width: 768, height: 512 },
        seed: 4017753600,
        steps: 28,
        scale: 11,
        strength: 0.69,
        noise: 0.667,
        samplingAlgorithm: "k_euler_ancestral",
    }

    assertEquals(JSON.stringify(prompt), JSON.stringify(expected))
})
