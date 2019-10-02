module.exports = {
	preset: "ts-jest",
	roots: ["Source/"],
	moduleNameMapper: {
		'^@App/(.*)$': '<rootDir>/Source/$1'
	}
}