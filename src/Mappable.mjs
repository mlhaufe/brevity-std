import { trait } from "@mlhaufe/brevity"

/**
 * A mappable is a collection that can be mapped over.
 * This trait should be overridden by any collection that can be mapped over.
 * aka Functor
 * aka Container
 *
 * axioms:
 * identity: xs.map(x => x) === xs
 * composition: xs.map(x => f(g(x))) === xs.map(g).map(f)
 * @example
 * const xs = list(1, 2, 3)
 * const ys = xs.map(x => x * 2)
 * // ys = list(2, 4, 6)
 */
export const Mappable = trait('map', {
    _(self, f) { return self }
})