/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/brace-style */

import { Component } from "@App/Types/Component"

/*
	Some components to test with
*/

export class TestPosition implements Component
{
	constructor (public x: number, public y: number)
	{ }
}

export class Name implements Component
{
	constructor (public test: string)
	{ }
}

export class Shape implements Component
{
	constructor (public height: number, public width: number)
	{ }
}

export class Pos implements Component
{
	constructor (public x: number, public y: number)
	{ }
}

export class X implements Component
{
	constructor (public x: number)
	{ }
}

export class Y implements Component
{
	constructor (public y: number)
	{ }
}


