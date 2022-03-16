import { createRequire } from "module"
import { join } from "path"
import type { OutputChunk, RollupOutput } from "rollup"
import { build, Plugin } from "vite"
import { describe, expect, test } from "vitest"
import macrosPluginEsm from ".."

const require = createRequire(import.meta.url)
const macrosPluginCjs = require("../dist/plugin.cjs").default

describe("esm", () => {
  definePluginTests(macrosPluginEsm)
})

describe("cjs", () => {
  definePluginTests(macrosPluginCjs)
})

function definePluginTests(macrosPlugin: typeof macrosPluginEsm) {
  test("macros", async () => {
    const code = `
    import preval from 'preval.macro'
    const result = preval\`module.exports = 1 + 2\`
    `
    const result = await macrosPlugin().transform(code, "file.js")
    expect(result?.code).toMatchInlineSnapshot(`"const result = 3;"`)
  })

  test("typechecks as a vite plugin", () => {
    const plugin: Plugin = macrosPlugin()
  })

  test(".jsx files shouldn't throw", async () => {
    const result = await macrosPlugin().transform(`<div/>`, "file.jsx")
    expect(result).not.toBeNull()
  })

  test("vite integration", async () => {
    let result = await build({
      root: join(__dirname, "../test/fixture"),
      plugins: [macrosPlugin()],
      logLevel: "silent",
      build: {
        minify: false,
        write: false,
      },
    })
    result = [result].flat()[0] as RollupOutput

    const code = result.output.find(
      (item): item is OutputChunk => item.type === "chunk",
    )?.code

    expect(code).toContain(`alert("it's a secret\\n")`)
  }, 10000)
}
