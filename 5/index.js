import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./5/input.txt')
let doPartTwo = isPartTwo()

let seats = data.split('\r\n').map(id => {
    let row = id.substr(0, 7)
        .replace(/F/g, '0')
        .replace(/B/g, '1')
    let column = id.substr(7, 3)
        .replace(/L/g, '0')
        .replace(/R/g, '1')
    let obj = {
        row: parseInt(row, 2),
        column: parseInt(column, 2),
        key: id,
    }
    obj.id = (obj.row * 8) + obj.column
    return obj
});

const partOne = () => {
    let maxId = seats.reduce((max, seat) => seat.id > max ? seat.id : max, 0)
    console.log(maxId)
}

const partTwo = () => {
    let current = null
    seats.sort((seatA, seatB) => seatA.id - seatB.id).forEach(seat => {
        if (current === null) {
            current = seat.id
            return
        }

        if (current + 1 !== seat.id) {
            console.log(current + 1)
            process.exit(1)
        }

        current = seat.id
    })
}

doPartTwo ? partTwo() : partOne()