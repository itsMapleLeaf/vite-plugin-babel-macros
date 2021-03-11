import type { Plugin } from "vite"
import macrosPlugin from "./plugin"

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
