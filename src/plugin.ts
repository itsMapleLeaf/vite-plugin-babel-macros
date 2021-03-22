import * as babel from "@babel/core"
import type { TransformResult } from "vite"

const sourceRegex = /\.(j|t)sx?$/
const tsxRegex = /\.(j|t)sx$/ // all files are being interpreted as TS, so we'll treat JSX as TSX

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

			const result = await babel.transformAsync(source, {
				filename,
				plugins: [
					require.resolve("@babel/plugin-syntax-jsx"),
					[
						require.resolve("@babel/plugin-syntax-typescript"),
						{ isTSX: tsxRegex.test(filename) },
					],
					require.resolve("babel-plugin-macros"),
				],
				babelrc: true,
				configFile: false,
				sourceMaps: true,
			})
			return result as TransformResult | null
		},
	} as const
}
