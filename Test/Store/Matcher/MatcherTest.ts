import { IMatcher } from "@App/Types/IMatcher"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { IEntity } from "@App/Types/IEntity"
import { Name } from "../../TestComponents"

export function MatcherTest (name: string, matchers: {
	All: IMatcher
	Any: IMatcher
	None: IMatcher
})
{
	function getEntities ()
	{
		const A = new NaiveEntity(1)
			.add(Name, "A")

	}

	describe("Base matcher test", () =>
	{

	})
}