import { fromRange, list } from './List.mjs'

describe('List tests', () => {
    test('construct list', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs).toBeDefined()
        expect(xs.head).toBe(1)
        expect(xs.tail.head).toBe(2)
        expect(xs.tail.tail.head).toBe(3)
        expect(xs.tail.tail.tail).toBe(xs.Nil)

        const ys = numList()
        expect(ys).toBeDefined()

        expect(() => numList(1, '2', 3)).toThrow()
    })

    test('append', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.append(4)).toBe(numList(1, 2, 3, 4))
    })

    test('at', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.at(0)).toBe(1)
        expect(xs.at(1)).toBe(2)
        expect(xs.at(2)).toBe(3)
        expect(() => xs.at(3)).toThrow()
        expect(xs.at(-1)).toBe(3)
        expect(xs.at(-2)).toBe(2)
        expect(xs.at(-3)).toBe(1)
        expect(() => xs.at(-4)).toThrow()

        const ys = numList()
        expect(() => ys.at(0)).toThrow()
    })

    test('concat', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3),
            ys = numList(4, 5, 6)
        expect(xs.concat(ys)).toBe(numList(1, 2, 3, 4, 5, 6))
    })

    test('filter', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.filter((x) => x % 2 === 0)).toBe(numList(2))
    })

    test('first', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.first()).toBe(1)

        const ys = numList()
        expect(() => ys.first()).toThrow()
    })

    test('foldLeft', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.foldLeft(0, (x, y) => x + y)).toBe(6)
    })

    test('foldRight', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.foldRight(0, (x, y) => x + y)).toBe(6)
    })

    test('fromRange', () => {
        const xs = fromRange(1, 3).join(',')
        expect(xs).toBe('1,2,3')

        const ys = fromRange(1, 1).join(',')
        expect(ys).toBe('1')

        const zs = fromRange(0, 6, 2).join(',')
        expect(zs).toBe('0,2,4,6')

        const as = fromRange(6, 0, -2).join(',')
        expect(as).toBe('6,4,2,0')
    })

    test('join', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.join(',')).toBe('1,2,3')

        const ys = numList()
        expect(ys.join(',')).toBe('')

        const zs = numList(1)
        expect(zs.join(',')).toBe('1')
    })

    test('last', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.last()).toBe(3)

        const ys = numList()
        expect(() => ys.last()).toThrow()
    })

    test('length', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.length()).toBe(3)
    })

    test('map', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.map((x) => x * 2)).toBe(numList(2, 4, 6))
    })

    test('reverse', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.reverse()).toBe(numList(3, 2, 1))
    })

    test('scanLeft', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.scanLeft(0, (x, y) => x + y).join(',')).toBe('0,1,3,6')
    })

    test('scanRight', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.scanRight(0, (x, y) => x + y).join(',')).toBe('6,5,3,0')
    })

    test('take', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.take(2)).toBe(numList(1, 2))

        const ys = numList()
        expect(ys.take(2)).toBe(numList())

        const zs = numList(1, 2, 3)
        expect(zs.take(0)).toBe(numList())

        const as = numList(1, 2, 3)
        expect(as.take(4)).toBe(numList(1, 2, 3))
    })

    test('takeWhile', () => {
        const numList = list(Number)

        const xs = numList(1, 2, 3)
        expect(xs.takeWhile((x) => x < 3)).toBe(numList(1, 2))

        const ys = numList()
        expect(ys.takeWhile((x) => x < 3)).toBe(numList())

        const zs = numList(1, 2, 3)
        expect(zs.takeWhile((x) => x > 3)).toBe(numList())

        const as = numList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        expect(as.takeWhile((x) => x < 6)).toBe(numList(1, 2, 3, 4, 5))
    })

    test('zipWith', () => {
        const numList = list(Number)

        expect(numList().zipWith(numList(), (x, y) => x + y)).toBe(numList())

        const xs = numList(1),
            ys = numList(4)
        expect(xs.zipWith(ys, (x, y) => x + y)).toBe(numList(5))

        const as = numList(1, 2),
            bs = numList(4, 5)
        expect(as.zipWith(bs, (x, y) => x + y).join(',')).toBe('5,7')
    })
})