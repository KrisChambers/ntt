import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

export default {
    input: "Source/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs"
        }
    ],
    plugins: [
        typescript({
            typescript: require("ttypescript"),
            tsconfig: "tsconfig.bundle.json"
       }),
    ]
}