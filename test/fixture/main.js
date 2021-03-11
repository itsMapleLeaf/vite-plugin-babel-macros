import preval from "preval.macro"
alert(preval`
	const fs = require("fs")
	const {join} = require("path")
	module.exports = fs.readFileSync(join(__dirname, "secret.txt"), "utf8")
`)
