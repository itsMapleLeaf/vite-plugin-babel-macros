# vite-plugin-babel-macros

Use [babel macros](https://github.com/kentcdodds/babel-plugin-macros) in your [Vite](https://vitejs.dev) project!

## Install

```sh
npm install --dev @itsmapleleaf/vite-plugin-babel-macros
```

## Add to `vite.config.js/ts`

```js
import macrosPlugin from "@itsmapleleaf/vite-plugin-babel-macros"

export default {
	// ...
	plugins: [
		// ...
		macrosPlugin(),
	],
}
```
