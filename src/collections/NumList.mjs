import { data, trait, complect, traitDecls } from "@mlhaufe/brevity";
import { List } from "./List.mjs";

const NumListData = data(List(Number), () => ({
    Cons: { head: Number, tail: NumListData }
}))

const SumTrait = trait('sum', {
    Nil() { return 0 },
    Cons({ head, tail }) { return head + tail.sum() }
})

export const NumList = complect(NumListData, [SumTrait, ...List(Number)[traitDecls]])

const { Nil, Cons } = NumList()

/**
 * Creates a new List<Number> from the specified arguments
 */
export const numList = (...xs) => xs.reduceRight((acc, x) => Cons(x, acc), Nil)