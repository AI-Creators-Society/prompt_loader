import { assertEquals, assertExists } from "../deps.ts"
import { loadPrompt } from "../mod.ts"

Deno.test("load nai prompt", async () => {
    const data = Deno.readFileSync("./test/images/nai/0.png")
    const file = new File([data], "nai.png")
    const prompt = await loadPrompt(file)

    assertExists(prompt)

    assertEquals(prompt.model, "NovelAI")
    assertEquals(prompt.positive, "masterpiece, best quality, {{{日本語}}}")
    assertEquals(prompt.samplingAlgorithm, "k_euler_ancestral")
})

Deno.test("load webui prompt", async () => {
    const data = Deno.readFileSync("test/images/webui/1.png")
    const file = new File([data], "webui.png")
    const prompt = await loadPrompt(file)

    assertExists(prompt)

    // console.log(prompt)

    assertEquals(prompt.model, "trin-wd-1-1")
    assertEquals(prompt.positive, "🌀")
    assertEquals(prompt.samplingAlgorithm, "Euler a")
})
