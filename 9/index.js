import { arrMax, arrMin, arrSum, getInput, isPartTwo } from '../helpers.js'

let data = getInput('./input.txt')
let numbers = data.split('\r\n').map(n => parseInt(n))

const partOne = () => {
    numbers.forEach((num, index) => {
        if (index < 25) {
            return
        }

        let slice = numbers.slice(index - 25, index)
        let hasSum = false

        sumCheck:
        for (let previousNum1 of slice) {
            for (let previousNum2 of slice) {
                if (previousNum1 === previousNum2) {
                    continue
                }

                if (previousNum1 + previousNum2 === num) {
                    hasSum = true
                    break sumCheck
                }
            }
        }

        if (!hasSum) {
            console.log(num)
            process.exit(1)
        }
    })
}

const partTwo = () => {
    const targetSum = 85848519
    numbers.forEach((number, index) => {
        if (number === targetSum) {
            return
        }

        let set = []
        let sum = 0
        let current = index
        while (sum < targetSum) {
            sum += numbers[current]
            set.push(current)
            current++
        }

        if (sum === targetSum) {
            let nums = set.map(i => numbers[i])
            console.log(arrMin(nums) + arrMax(nums))
            process.exit(1)
        }
    })
}

isPartTwo() ? partTwo() : partOne()