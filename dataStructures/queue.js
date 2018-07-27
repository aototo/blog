class Queue {
    constructor(items = []) {
        this.items = items
    }

    enqueue(item) {
        this.items.push(item)
    }

    dequeue() {
        return this.items.shift()
    }

    front() {
        return this.items[0]
    }

    isEmpty() {
        if (this.items.length === 0) {
            return true
        }

        return false
    }

    size() {
        return this.items.length
    }

    print() {
        console.log(this.items.toString())
    }
}


let queue = new Queue()
console.log(queue.isEmpty()); //输出true

queue.enqueue("John");
queue.enqueue("Jack");

console.log(queue.size()); //输出3 
console.log(queue.isEmpty()); //输出false 
queue.dequeue();
queue.dequeue();
queue.print();