class Stack {
    constructor(items = []) {
        this.items = items
    }

    push(item) {
        this.items.push(item)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        if(this.items.length === 0) {
            return true
        }

        return false
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

    print() {
        console.log(this.items.toString())
    }
}


function divideBy2(decNumber) {
    let remStack = new Stack()
    let rem
    let bianryString = ''

    while (decNumber > 0) {
        rem = Math.floor(decNumber % 2)
        remStack.push(rem)
        decNumber = Math.floor(decNumber / 2)
    }

    while (!remStack.isEmpty()) {
        bianryString += remStack.pop().toString()
    }

    return bianryString
}
