import * as babel from "@babel/core"
import type { Plugin, TransformResult } from "vite"

const sourceRegex = /\.(j|t)sx?$/
const tsxRegex = /\.tsx$/

export default function macrosPlugin(): Plugin {
	return {
		name: "babel-macros",
		enforce: "pre",
		async transform(source, filename) {
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
				babelrc: false,
				configFile: false,
				sourceMaps: true,
			})
			return result as TransformResult | null
		},
	}
}
