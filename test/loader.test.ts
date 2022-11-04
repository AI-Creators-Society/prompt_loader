import { assertEquals, assertExists } from "../deps.ts"
import { loadPrompt } from "../mod.ts"

Deno.test("load nai prompt", async () => {
    const data = Deno.readFileSync("./test/images/nai.png")
    const file = new File([data], "nai.png")
    const prompt = await loadPrompt(file)

    assertExists(prompt)

    assertEquals(prompt.model, "NovelAI")
    assertEquals(prompt.positive, "masterpiece, best quality, {{{日本語}}}")
    assertEquals(prompt.samplingAlgorithm, "k_euler_ancestral")
})
