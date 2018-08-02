class HashTable {
    constructor() {
        this.table = []
    }

    _loseloseHashCode(key) {
        let hash = 0
        for (let index = 0; index < key.length; index++) {
            hash += key.charCodeAt(index)
        }
        return hash % 37
    }

    put(key, value) {
        var position = this._loseloseHashCode(key)
        console.log(`${position} : ${key}`);
        
        this.table[position] = value
    }

    remove(key) {
        this.table[this._loseloseHashCode(key)] = undefined
    }

    get(key) {
        return this.table[this._loseloseHashCode(key)]
    }

    print() {
        for (let index = 0; index < this.table.length; index++) {
            if(this.table[index] !== undefined) {
                console.log(`${index} : ${this.table[index]}`)
            }
        }
    }
}

let hashTable = new HashTable()

var hash = new HashTable()

hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'johnsnow@email.com')
hash.put('Tyrion', 'tyrion@email.com')
hash.put('Aaron', 'aaron@email.com')
hash.put('Donnie', 'donnie@email.com')
hash.put('Ana', 'ana@email.com')
hash.put('Jonathan', 'jonathan@email.com')
hash.put('Jamie', 'jamie@email.com')
hash.put('Sue', 'sue@email.com')
hash.put('Mindy', 'mindy@email.com')
hash.put('Paul', 'paul@email.com')
hash.put('Nathan', 'nathan@email.com')


hash.print()
