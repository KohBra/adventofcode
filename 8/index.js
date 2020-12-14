import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./input.txt')

let instructions = data.split('\r\n')
    .map(line => {
        let [instruction, parameter] = line.split(' ')
        return {
            instruction,
            parameter: parseInt(parameter)
        }
    })

const accumulate = 'acc'
const noOperation = 'nop'
const jump = 'jmp'

const partOne = () => {
    const history = []
    let accumulator = 0
    let currentCommand = 0
    while (!history.includes(currentCommand)) {
        history.push(currentCommand)
        let command = instructions[currentCommand]
        if (command.instruction === accumulate) {
            accumulator += command.parameter
            currentCommand++;
        } else if (command.instruction === jump) {
            currentCommand += command.parameter
        } else {
            currentCommand++;
        }
    }
    console.log(accumulator, history.length)
}

const executeInstructions = instructions => {
    const history = []
    let accumulator = 0
    let currentCommand = 0
    while (!history.includes(currentCommand) && currentCommand < instructions.length) {
        history.push(currentCommand)
        let command = instructions[currentCommand]
        if (command.instruction === accumulate) {
            accumulator += command.parameter
            currentCommand++;
        } else if (command.instruction === jump) {
            currentCommand += command.parameter
        } else {
            currentCommand++;
        }
    }

    return currentCommand === instructions.length ? accumulator : false
}

const partTwo = () => {
    for (let i = 0; i < instructions.length; i++) {
        let clone = JSON.parse(JSON.stringify(instructions))
        if (clone[i].instruction === noOperation) {
            clone[i].instruction = jump
        } else if (clone[i].instruction === jump) {
            clone[i].instruction = noOperation
        } else {
            continue;
        }

        let result = executeInstructions(clone)
        if (result !== false) {
            console.log(result, i)
            process.exit(1)
        }
    }

}

isPartTwo() ? partTwo() : partOne()