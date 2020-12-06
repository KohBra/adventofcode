import fs from 'fs'

export const getInput = file => fs.readFileSync(file, 'utf8')

export const isPartTwo = () => process.argv[2] === '2'

export const arrUnique = arr => arr.reduce((carry, element) => {
    if (!carry.includes(element)) {
        carry.push(element)
    }

    return carry
}, [])

export const arrSum = arr => arr.reduce((count, value) => count + value)