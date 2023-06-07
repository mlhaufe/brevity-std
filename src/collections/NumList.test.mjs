import { numList } from './NumList.mjs'

describe('NumList', () => {
    test('construct', () => {
        const xs = numList(1, 2, 3)
        expect(xs).toBeDefined()
        expect(xs.head).toBe(1)
        expect(xs.tail.head).toBe(2)
        expect(xs.tail.tail.head).toBe(3)
        expect(xs.tail.tail.tail).toBe(numList())
    })

    test('append', () => {
        const xs = numList(1, 2, 3)
        expect(xs.append(4)).toBe(numList(1, 2, 3, 4))
    })

    test('sum', () => {
        const xs = numList(1, 2, 3)
        expect(xs.sum()).toBe(6)
    })
})