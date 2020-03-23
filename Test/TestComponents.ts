/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/brace-style */

/*
	Some components to test with
*/

export interface TestPosition { x: number, y: number, }
export function TestPosition (x: number, y: number) { return { x, y } as TestPosition }

export interface Name { text: string, }
export function Name (text: string) { return { text } as Name }

export interface Shape { height: number, width: number, }
export function Shape (height: number, width: number) { return { height, width } as Shape }

export interface Pos { x: number, y: number, }
export function Pos (x: number, y: number) { return { x, y } as Pos }

export interface X { x: number, }
export function X (x: number) { return { x } as X}

export interface Y { y: number, }
export function Y (y: number) { return { y } as Y}
