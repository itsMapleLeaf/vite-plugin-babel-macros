# vite-plugin-babel-macros

Use [babel macros](https://github.com/kentcdodds/babel-plugin-macros) in your [Vite](https://vitejs.dev) project!

## Install

```sh
npm install --save-dev vite-plugin-babel-macros
```

Then, add it to your vite config:

```js
import macros from "vite-plugin-babel-macros"

export default {
	// ...
	plugins: [
		// ...
		macros(),
	],
}
```

### Usage with `@vitejs/plugin-react`

Install `babel-plugin-macros`, then add the plugin to the react plugin options.

```sh
npm install --save-dev babel-plugin-macros
```

```js
import react from "@vitejs/plugin-react"
import macros from "vite-plugin-babel-macros"

export default {
	// ...
	plugins: [
		// ...
		react({
			babel: {
				plugins: ["babel-plugin-macros"],
			},
		}),
		macros(),
	],
}
```
