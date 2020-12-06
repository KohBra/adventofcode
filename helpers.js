import fs from 'fs'

export const getInput = file => fs.readFileSync(file, 'utf8')

export const isPartTwo = () => process.argv[2] === '2'