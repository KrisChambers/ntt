/**
 * If `Sub` does not extend `Super` evaluate to `True` else evaluate to `False`
 */
export type IfNotExtends<Sub, Super, True = true, False = false> = [Sub] extends [Super] ? False : True;
