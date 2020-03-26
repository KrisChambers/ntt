import Module from "module"

export class CustomModuleLoader
{
	public cOptions: any = require("../tsconfig.base.json").compilerOptions;

	public replacePaths: any = {};

	constructor ()
	{
		Object.keys(this.cOptions.paths).forEach(alias =>
		{
			this.replacePaths[alias.replace(/\*.?/, "(.*)")] = this.cOptions.paths[alias][0].replace(/\*.?/, "$1")
		});


		(Module as any)._originalResolveFilename = (Module as any)._resolveFilename;

		(Module as any)._resolveFilename = (request: string, parent: Module, isMain: boolean) =>
		{
			Object.keys(this.replacePaths).forEach(matchString =>
			{
				const regex = new RegExp(matchString)
				if (request.match(regex))
				{
					request = [process.cwd(), this.cOptions.outDir, request.replace(regex, this.replacePaths[matchString])].join("/")
				}
			})
			return (Module as any)._originalResolveFilename(request, parent, isMain)
		}
	}
};