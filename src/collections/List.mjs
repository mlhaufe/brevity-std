import { complect, data, trait } from '@mlhaufe/brevity'

/**
 * A list is a linear collection of elements of the same type
 */
const ListData = data((List, T) => ({
    Nil: {},
    Cons: { head: T, tail: List(T) }
}))

/**
 * Append an element to a list
 * @param {any} x - The element to append
 * @returns {List} - The new list
 * @example
 * list(1, 2, 3).append(4) // list(1, 2, 3, 4)
 */
const AppendTrait = trait('append', {
    Nil(self, x) { return this.Cons(x, self) },
    Cons({ head, tail }, x) { return this.Cons(head, tail.append(x)) }
})

/**
 * Returns the element at the specified index
 * @param {number} i - The index of the element to return
 * @returns {any} - The element at the specified index
 * @example
 * list(1, 2, 3).at(0) // 1
 * list(1, 2, 3).at(1) // 2
 * list(1, 2, 3).at(2) // 3
 */
const AtTrait = trait('at', {
    Nil(self, i) { throw new Error('Index out of bounds') },
    Cons(self, i) {
        const { head, tail } = self
        if (i === 0) return head
        else if (i > 0) return tail.at(i - 1)

        const len = self.length()
        if (i < -len)
            throw new Error('Index out of bounds')
        return self.at(self.length() + i)
    }
})

/**
 * Concatenates two lists
 * @param {List} xs - The second list
 * @returns {List} - The concatenated list
 * @example
 * list(1, 2, 3).concat(list(4, 5, 6))
 * // list(1, 2, 3, 4, 5, 6)
 */
const ConcatTrait = trait('concat', {
    Nil(self, xs) { return xs },
    Cons({ head, tail }, xs) { return this.Cons(head, tail.concat(xs)) }
})

/**
 * Filters a list using a predicate function
 * @param {function} fn - The predicate function
 * @returns {List} - The filtered list
 * @example
 * list(1, 2, 3, 4).filter((x) => x % 2 === 0) // list(2, 4)
 */
const FilterTrait = trait('filter', {
    Nil: (self) => self,
    Cons({ head, tail }, fn) {
        return fn(head) ? this.Cons(head, tail.filter(fn)) : tail.filter(fn)
    }
})

/**
 * Returns the first element of a list
 * @returns {any} - The first element
 * @example
 * list(1, 2, 3).first() // 1
 */
const FirstTrait = trait('first', {
    Nil: (self) => { throw new Error('Cannot get head of empty list') },
    Cons: ({ head }) => head
})

/**
 * Reduces a list to a single value by applying a function to each element
 * from left to right
 * @param {any} unit - The value to use for Nil
 * @param {function} fnMerge - The function to apply to each Cons
 * @returns {any} - The result of the fold
 * @example
 * list(1, 2, 3).foldLeft(0, (x, y) => x + y) // 6
 */
const FoldLeftTrait = trait('foldLeft', {
    Nil: (_, unit, _fnMerge) => unit,
    Cons: ({ head, tail }, unit, fnMerge) =>
        tail.foldLeft(fnMerge(unit, head), fnMerge)
})

/**
 * Reduces a list to a single value by applying a function to each element
 * from right to left
 * @param {any} unit - The value to use for Nil
 * @param {function} fnMerge - The function to apply to each Cons
 * @returns {any} - The result of the fold
 * @example
 * list(1, 2, 3).foldRight(0, (x, y) => x + y) // 6
 */
const FoldRightTrait = trait('foldRight', {
    Nil: (_, unit, _fnMerge) => unit,
    Cons: ({ head, tail }, unit, fnMerge) => fnMerge(head, tail.foldRight(unit, fnMerge))
})

/**
 * Creates a list from a range of numbers
 * @param {number} start - The start of the range
 * @param {number} end - The end of the range
 * @param {number} step - The step of the range (defaults to 1)
 * @returns {List} - The list of numbers
 * @example
 * fromRange(1, 5) // list(1, 2, 3, 4, 5)
 * fromRange(5, 1) // list(5, 4, 3, 2, 1)
 * fromRange(1, 5, 2) // list(1, 3, 5)
 * fromRange(5, 1, 2) // list(5, 3, 1)
 */
export const fromRange = (start, end, step = 1) => {
    const { Nil, Cons } = List(Number)

    const asc = step > 0,
        range = [];

    for (let i = start; asc ? i <= end : i >= end; i += step)
        range.push(i);

    return range.reduceRight((acc, curr) => Cons(curr, acc), Nil);
};

/**
 * Joins a list of strings with a separator
 * @param {List} xs - The list of strings to join
 * @param {string} strSep - The separator to use
 * @returns {string} - The joined string
 * @example
 * list('a', 'b', 'c').join('-') // 'a-b-c'
 */
const JoinTrait = trait('join', {
    Nil: () => '',
    Cons({ head, tail }, strSep) {
        return tail === this.Nil ?
            String(head) : String(head) + strSep + tail.join(strSep)
    }
})

/**
 * Returns the last element of a list
 * @param {List} xs - The list to get the last element of
 * @returns {any} - The last element of the list
 * @example
 * list(1, 2, 3).last() // 3
 * list(1).last() // 1
 */
const LastTrait = trait('last', {
    Nil() { throw new Error('Cannot get last element of empty list') },
    Cons({ head, tail }) { return tail === this.Nil ? head : tail.last() }
})

/**
 * Returns the length of a list
 * @returns {number} - The length of the list
 * @example
 * list(1, 2, 3).length() // 3
 */
const LengthTrait = trait('length', {
    Nil() { return 0 },
    Cons({ tail }) { return 1 + tail.length() }
})

/**
 * Applies a function to each element of a list
 * @param {Function} fn - The function to apply to each element
 * @returns {List} - The mapped list
 * @example
 * list(1, 2, 3).map((x) => x * 2) // list(2, 4, 6)
 */
const MapTrait = trait('map', {
    Nil(self) { return self },
    Cons({ head, tail }, fn) { return this.Cons(fn(head), tail.map(fn)) }
})

/**
 * Reverse a list
 * @param {List} xs - The list to reverse
 * @returns {List} - The reversed list
 * @example
 * list(1, 2, 3).reverse() // list(3, 2, 1)
 */
const ReverseTrait = trait('reverse', {
    Nil: (self) => self,
    Cons({ head, tail }) { return tail.reverse().append(head) }
})

/**
 * Cumulate a collection of intermediate cumulative results using a start value.
 * It can also be thought of as a foldLeft where the result is a list of all intermediate values instead of just the last one.
 * @param {List} xs - The List to scan
 * @param {any} acc - The initial accumulator value
 * @param {(q: any, x: any) => any} fn - The function to apply to each pair
 * @returns {List} - The scanned list
 * @example
 * list(1, 2, 3).scanLeft(0, (x, y) => x + y) // list(0, 1, 3, 6)
 */
const ScanLeftTrait = trait('scanLeft', {
    Nil(self, acc, fn) { return this.Cons(acc, this.Nil) },
    Cons({ head, tail }, acc, fn) {
        return this.Cons(acc, tail.scanLeft(fn(acc, head), fn))
    }
})

/**
 * Cumulate a collection of intermediate cumulative results using a start value.
 * It can also be thought of as a foldRight where the result is a list of all intermediate values instead of just the last one.
 * @param {List} xs - The List to scan
 * @param {any} acc - The initial accumulator value
 * @param {(q: any, x: any) => any} fn - The function to apply to each pair
 * @returns {List} - The scanned list
 * @example
 * list(1, 2, 3).scanRight(0, (x, y) => x + y) // list(6, 5, 3, 0)
 */
const ScanRightTrait = trait('scanRight', {
    Nil(self, acc, fn) { return this.Cons(acc, this.Nil) },
    Cons({ head, tail }, acc, fn) {
        const qs = tail.scanRight(acc, fn),
            q = qs.head
        return this.Cons(fn(q, head), qs)
    }
})

/**
 * Takes the first n elements of a list
 * @param {List} xs - The list to take from
 * @param {number} n - The number of elements to take
 * @returns {List} - The first n elements of the list
 * @example
 * list(1, 2, 3).take(2) // list(1, 2)
 */
const TakeTrait = trait('take', {
    Nil(self, _n) { return self },
    Cons([head, tail], n) {
        return n <= 0 ? this.Nil : this.Cons(head, tail.take(n - 1))
    }
})

/**
 * Returns the longest prefix of elements that satisfy a predicate
 * @param {List} xs - The list to take from
 * @param {function} fn - The predicate function
 * @returns {List} - The longest prefix of elements that satisfy a predicate
 * @example
 * list(1, 2, 3, 4, 5, 6).takeWhile((x) => x < 4) // list(1, 2, 3)
 */
const TakeWhileTrait = trait('takeWhile', {
    Nil(self, _fn) { return self },
    Cons([head, tail], fn) {
        return fn(head) ? this.Cons(head, tail.takeWhile(fn)) : this.Nil
    }
})

/**
 * Zips two lists together and applies a function to each pair
 * @param {List} xs - The first list
 * @param {List} ys - The second list
 * @param {function} fn - The function to apply to each pair
 * @returns {List} - The zipped list
 * @example
 * list(1, 2, 3).zipWith(list(4, 5, 6), (x, y) => x + y) // list(5, 7, 9)
 */
const ZipWithTrait = trait('zipWith', {
    Nil(self, _ys, _fn) { return self },
    Cons([head, tail], [fst, snd], fn) {
        return this.Cons(fn(head, fst), tail.zipWith(snd, fn))
    }
})

/**
 * The List data type
 */
export const List = complect(ListData, [
    AppendTrait, AtTrait, ConcatTrait, FilterTrait, FirstTrait, FoldLeftTrait,
    FoldRightTrait, JoinTrait, LastTrait, LengthTrait, MapTrait, ReverseTrait,
    ScanLeftTrait, ScanRightTrait, TakeTrait, TakeWhileTrait, ZipWithTrait
])

/**
 * Creates a new list
 * @param {any} ofType - The type of the list
 * @returns {List} - The new list
 * @example
 * list(Number)(1, 2, 3) // Cons(1, Cons(2, Cons(3, Nil)))
 */
export const list = (ofType) => {
    const { Nil, Cons } = List(ofType)
    return (...xs) => xs.reduceRight((acc, x) => Cons(x, acc), Nil)
}