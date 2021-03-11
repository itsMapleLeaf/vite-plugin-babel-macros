import * as babel from "@babel/core"
import type { TransformResult } from "vite"

const sourceRegex = /\.(js|ts|jsx|tsx|mjs|cjs)?$/
const jsxRegex = /\.(jsx|tsx)$/
const tsRegex = /\.(ts|tsx)$/

export default function macrosPlugin() {
	return {
		name: "babel-macros",
		enforce: "pre",
		async transform(source: string, filename: string) {
			if (filename.includes("node_modules")) {
				return undefined
			}

			if (!sourceRegex.test(filename)) {
				return undefined
			}

			const plugins: babel.PluginItem[] = [
				require.resolve("babel-plugin-macros"),
			]

			if (jsxRegex.test(filename)) {
				plugins.push(require.resolve("@babel/plugin-syntax-jsx"))
			}

			if (tsRegex.test(filename)) {
				plugins.push([
					require.resolve("@babel/plugin-syntax-typescript"),
					{ isTSX: true },
				])
			}

			const result = await babel.transformAsync(source, {
				filename,
				plugins,
				babelrc: false,
				configFile: false,
				sourceMaps: true,
			})
			return result as TransformResult | null
		},
	} as const
}
