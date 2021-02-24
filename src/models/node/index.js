class Node {
    constructor(index, data) {
        this.index = index
        this.data = data
        this.adj = []
    }

    connect(other) {
        this.adj.push(other)
    }
}

module.exports = Node