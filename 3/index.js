import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./3/input.txt')
let doPartTwo = isPartTwo()

data = data.split('\r\n')

const treeAt = position => data[position.y][position.x] === '#'
const traverseSlope = slope => {
    let position = {x: 0, y: 0}
    let treeCount = 0
    let width = data[0].length

    while (position.y < data.length) {
        treeCount += +treeAt(position)
        position.x = (position.x + slope.x) % width
        position.y += slope.y
    }

    return treeCount
}

const partOne = () => console.log(traverseSlope({x: 3, y: 1}))

const partTwo = () => {
    const slopes = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2},
    ]

    let treeCounts = slopes.map(slope => traverseSlope(slope))

    console.log(treeCounts.reduce((total, count) => total * count))
}


doPartTwo ? partTwo() : partOne()