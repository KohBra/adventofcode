import { arrSum, arrUnique, getInput, isPartTwo } from '../helpers.js'

let data = getInput('./6/input.txt')
let doPartTwo = isPartTwo()

let answers = data
    .split('\r\n\r\n')
    .map(group => group.split('\r\n').map(answer => answer.split('')))

const partOne = () => {
    let uniqueGroupAnswers = answers
        .map(group => arrUnique(group.flat()).length)

    console.log(arrSum(uniqueGroupAnswers))
}

const partTwo = () => {
    let groups = answers.map(group => {
        if (group.length === 1) {
            return group[0].length
        }

        let common = []
        group.forEach(answers => {
            answers.forEach(answer => {
                let hasAnswer = true
                for (let otherAnswers of group) {
                    if (answers === otherAnswers) {
                        // don't check yourself
                        continue
                    }

                    hasAnswer = hasAnswer && otherAnswers.includes(answer)
                }

                if (hasAnswer && !common.includes(answer)) {
                    common.push(answer)
                }
            })
        })

        return common.length
    })

    console.log(arrSum(groups))
}

doPartTwo ? partTwo() : partOne()