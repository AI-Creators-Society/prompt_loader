# Prompt Loader

[![Deno Test](https://github.com/ai-art-club/prompt_loader/actions/workflows/test.yaml/badge.svg)](https://github.com/ai-art-club/prompt_loader/actions/workflows/test.yaml)
![deno compatibility](https://shield.deno.dev/deno/^1.27)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)

# Usage

## Node.js

### Install

Add dependency

```
npm install ai-art-club/prompt_loader#latest
```

or

```
yarn add ai-art-club/prompt_loader#latest
```

### Load prompt

```js
// このインポートキモイのであとでどうにかすると思う
import { loadPrompt } from "prompt_loader/npm"

const file: File = new File([], "your-image-file")

const prompt = await loadPrompt(file)

console.log(prompt)
```

Output example

```json
{
    "negative": "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
    "noise": 0.667,
    "positive": "masterpiece, best quality, 1girl",
    "samplingAlgorithm": "k_euler_ancestral",
    "scale": 11,
    "seed": 4017753600,
    "size": { 
        "width": 768,
         "height": 512
    },
    "height": 512,
    "width": 768,
    "steps": 28,
    "strength": 0.69
}
```

## Deno

```ts
import { loadPrompt } from "https://raw.githubusercontent.com/ai-art-club/prompt_loader/0.0.5/mod.ts"

```

# TODO

[ ] Support Stable Diffusion Web UI type image
[ ] Prompt converter

