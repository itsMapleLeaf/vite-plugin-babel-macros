import type { Plugin } from "vite"
import macrosPlugin from "./plugin"

test("typechecks as a vite plugin", () => {
	const plugin: Plugin = macrosPlugin()
})

test(".jsx files shouldn't throw", async () => {
	const result = await macrosPlugin().transform(`<div/>`, "file.jsx")
	expect(result).not.toBeNull()
})
