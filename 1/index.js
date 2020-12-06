import { getInput, isPartTwo } from '../helpers.js'

const data = getInput('./1/input.txt')
let doPartTwo = isPartTwo()

let array = data.split('\r\n').map(n => Number(n))

const partOne = () => {
    array.forEach(n => {
        array.forEach(n2 => {
            if (n + n2 === 2020) {
                console.log(`${n} * ${n2} = ${n * n2}`)
                process.exit(1)
            }
        })
    })
}

const partTwo = () => {
    array.forEach(n => {
        array.forEach(n2 => {
            array.forEach(n3 => {
                if (n + n2 + n3 === 2020) {
                    console.log(`${n} * ${n2} * ${n3} = ${n * n2 * n3}`)
                    process.exit(1)
                }
            })
        })
    })
}

doPartTwo ? partTwo() : partOne()