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
    external: [
        ... Object.keys(pkg.dependencies || { }),
        ... Object.keys(pkg.peerDependencies || { })
    ],
    plugins: [
        typescript({
            tsconfig: "tsconfig.bundle.json",
            typescript: require("typescript")
        })
    ]
}