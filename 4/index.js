import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./4/input.txt')
let doPartTwo = isPartTwo()

data = data.split('\r\n\r\n').map(chunk => chunk.split('\r\n').join(' '))

let passports = data.map(passportData => {
    let passport = {
        byr: null,
        iyr: null,
        eyr: null,
        hgt: null,
        hcl: null,
        ecl: null,
        pid: null,
        cid: null,
    }

    let parts = passportData.split(' ').map(piece => piece.split(':'))
    parts.forEach(part => {
        if (passport[part[0]] !== undefined) {
            passport[part[0]] = part[1]
        }
    })
    return passport
})

const partOne = () => {
    let validCount = passports.reduce((count, passport) => {
        if (passport.byr !== null &&
            passport.iyr !== null &&
            passport.eyr !== null &&
            passport.hgt !== null &&
            passport.hcl !== null &&
            passport.ecl !== null &&
            passport.pid !== null
        ) {
            count++
        }

        return count
    }, 0)

    console.log(validCount)
}

const partTwo = () => {
    const validators = {
        byr: value => value !== null && Number(value) >= 1920 && Number(value) <= 2002,
        iyr: value => value !== null && Number(value) >= 2010 && Number(value) <= 2020,
        eyr: value => value !== null && Number(value) >= 2020 && Number(value) <= 2030,
        hgt: value => {
            if (value === null) {
                return false
            }

            let type = value.substr(-2)
            let num = Number(value.substr(0, value.length - 2))

            if (type === 'cm') {
                return num >= 150 && num <= 193
            } else if (type === 'in') {
                return num >= 59 && num <= 76
            } else {
                return false
            }
        },
        hcl: value => value !== null && value.match(/\#[0-9a-f]{6}/) !== null,
        ecl: value => value !== null && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
        pid: value => value !== null && value.length === 9 && value.match(/[0-9]{9}/) !== null,
    }

    let validCount = passports.reduce((count, passport) => {
        let validKeys = 0
        passport.valids = Object.keys(validators).reduce((obj, key) => {
            if (!passport[key]) return obj
            obj[key] = validators[key](passport[key])
            if (obj[key]) {
                validKeys += 1
            }
            return obj
        }, {})

        if (validKeys === 7) {
            count++
        }

        return count
    }, 0)

    console.log(validCount)
}

doPartTwo ? partTwo() : partOne()

//181
//
