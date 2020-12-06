import { getInput, isPartTwo } from '../helpers.js'

const data = getInput('./2/input.txt')
let doPartTwo = isPartTwo()

const formatData = (data) => data.split('\r\n').map(row => {
    let obj = {
        min: 0,
        max: 0,
        letter: '',
        password: '',
    }
    let [policy, password] = row.split(': ')
    let [minMax, letter] = policy.split(' ')
    let [min, max] = minMax.split('-')

    obj.password = password
    obj.letter = letter
    obj.min = Number(min)
    obj.max = Number(max)

    return obj
})

const partOne = passwords => {
    let valid = []
    passwords.forEach(pass => {
        let count = pass.password.split(pass.letter).length - 1
        if (count >= pass.min && count <= pass.max) {
            valid.push(pass)
        }
    })
    console.log(valid.length)
}

const partTwo = passwords => {
    let valid = []
    passwords.forEach(pass => {
        let first = pass.password[pass.min - 1]
        let second = pass.password[pass.max - 1]
        if ((first === pass.letter && second !== pass.letter) ||
            (first !== pass.letter && second === pass.letter)
        ) {
            valid.push(pass)
        }
    })
    console.log(valid.length)
}

let passwords = formatData(data)

doPartTwo ? partTwo(passwords) : partOne(passwords)
