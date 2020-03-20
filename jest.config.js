module.exports = {
	preset: "ts-jest",
	roots: ["Test/"],
	moduleNameMapper: {
		'^@App/(.*)$': '<rootDir>/Source/$1'
	}
}