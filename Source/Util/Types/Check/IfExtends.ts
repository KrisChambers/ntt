/**
 * If `Sub` extends `Super` then evaluate to `True` else evaluate to `False`
 */
export type IfExtends<Sub, Super, True = true, False = false> = [Sub] extends [Super] ? True : False;
