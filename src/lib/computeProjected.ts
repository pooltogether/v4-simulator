export function computeProjected(bitRange: number, cardinality: number): Array<number> {
    let lastNumber = 0
    let counts = []

    const range = 2**bitRange

    for (let i = 0; i < cardinality; i++) {
        let exactMatches = range**i
        if (i > 0) {
            exactMatches -= lastNumber;
        }
        lastNumber = exactMatches;

        counts.push(exactMatches)
    }

    return counts;
}
