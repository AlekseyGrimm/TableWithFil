import namor from 'namor'

const range = length => {
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push(i)
    }
    return arr
}

const showRoom = () => {
    return {
        cars: namor.generate({ words: 1, numbers: 0 }),
        brand: namor.generate({ words: 1, numbers: 0 }),
        price: Math.floor(Math.random() * 2000),
        release: Math.floor(Math.random() * 2000),
    }
}

export default function mokData(...length) {
    const dataLevel = (e = 0) => {
        const too = length[e]
        return range(too).map(x => {
            return {
                ...showRoom(),
                subRows: length[e + 1] ? dataLevel(e + 1) : undefined,
            }
        })
    }

    return dataLevel()
}