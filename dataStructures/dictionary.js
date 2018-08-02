class Dictionary {
    constructor() {
        this.items = {}
    }

    has(key) {
        return key in this.items
    }

    set(key, value) {
        this.items[key] = value
    }

    detele(key) {
        if(this.has(key)) {
            delete this.items[key]
            return true
        }
        return false
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined
    }

    values() {
        let items = []
        for (const i of Object.keys(this.items)) {
            items = [...items, this.items[i]]
        }
        return items
    }

    keys() {
        return Object.keys(this.items)
    }

    size() {
        return Object.keys(this.items).length
    }

}

let dictionary = new Dictionary()

dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'johnsnow@email.com')
dictionary.set('Tyrion', 'tyrion@email.com')

console.log(dictionary.size())

