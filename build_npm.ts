// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts"

await emptyDir("./npm")

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        // see JS docs for overview and more options
        deno: "dev",
        // undici: true,
        custom: [
            {
                package: {
                    name: "textencoder-ponyfill",
                    version: "1.0.2",
                },
                globalNames: ["TextEncoder", "TextDecoder"],
            },
        ],
    },
    test: false,
    typeCheck: false,
    scriptModule: false,
    compilerOptions: {
        lib: ["es2021", "dom"],
    },
    package: {
        // package.json properties
        name: "prompt_loader",
        version: Deno.args[0],
        description: "Prompt Loader from AI Generated Images",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/ai-art-club/prompt_loader.git",
        },
        bugs: {
            url: "https://github.com/ai-art-club/prompt_loader/issues",
        },
    },
})

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")
