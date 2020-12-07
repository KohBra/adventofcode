import { getInput, isPartTwo } from '../helpers.js'

let data = getInput('./input.txt')

let bagRules = data.split('\r\n').map(ruleString => {
    let [bag, contains] = ruleString.split(' bags contain ')
    if (contains === 'no other bags.') {
        contains = []
    } else {
        contains = contains.split(', ').map(subBag => {
            let [count, ...bag] = subBag.trim()
                .replace('bags', '')
                .replace('bag', '')
                .replace('.', '')
                .replace('no', '0')
                .split(' ')

            return {
                bag: bag.join(' ').trim(),
                count: parseInt(count),
            }
        })
    }

    return {
        bag,
        contains,
    }
})

let indexedRules = bagRules.reduce((obj, rule) => {
    obj[rule.bag] = rule
    return obj
}, {})

let connections = bagRules.reduce((obj, rule) => {
    rule.contains.forEach(bag => {
        obj[bag.bag].push(rule.bag)
    })
    return obj
}, Object.keys(indexedRules).reduce((obj, bagType) => {
    obj[bagType] = []
    return obj
}, {}), {})

const startBag = 'shiny gold'

const partOne = () => {
    let containers = []
    let traverse = bagType => {
        connections[bagType].forEach(parentBag => {
            if (!containers.includes(parentBag)) {
                containers.push(parentBag)
                traverse(parentBag)
            }
        })
    }
    traverse(startBag)
    console.log(containers.length)
}

const partTwo = () => {
    let traverse = bagType => {
        let count = 0
        indexedRules[bagType].contains.forEach(innerBag => {
            count += innerBag.count + innerBag.count * traverse(innerBag.bag)
        })
        return count
    }

    console.log(traverse(startBag))
}

isPartTwo() ? partTwo() : partOne()