import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./input.txt')
let adapters = data.split('\r\n')
    .map(n => parseInt(n))
    .sort((a, b) => a - b)

const partOne = () => {
    const obj = {
        1: 0,
        2: 0,
        3: 1, // start with 1, because the final one is always 3 higher than the highest in the list
    }
    let previous = 0
    adapters = adapters.filter(adapter => {
        if (adapter - previous > 3 || adapter === previous) {
            return false
        }

        obj[adapter - previous]++

        previous = adapter
        return true
    })
    console.log(obj[1], obj[3])
}

// 193434623148032
const partTwo = () => {
    let counts = adapters.reduce((counts, adapter) => {
        counts[adapter] = (counts[adapter - 3] || 0) + (counts[adapter - 2] || 0) + (counts[adapter - 1] || 0)
        return counts
    }, [1])

    console.log(counts.pop())
}

isPartTwo() ? partTwo() : partOne()