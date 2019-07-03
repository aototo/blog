class ArrayList {
    constructor() {
        this.array = []
    }

    insert(item) {
        this.array.push(item)
    }

    toString() {
        return this.array.join()
    }

    // 冒泡算法， 它的复杂度是O(n2)。y执行了n次，x也执行n次，所以就是O(n2)。不推荐该算法
    bubbleSort() {
        let length = this.array.length

        for(let i = 0; i < length; i++) {
            for (let y = 0; y < length - 1 - i; y++) {
                if(this.array[y] > this.array[y+1]) {
                    this._swap(y, y+1)
                }
            }
        }
    }

    // 插入排序
    insertionSort() {
        let length = this.array.length
        let temp
        let j
        for (let i = 1; i < length; i++) {
            temp = this.array[i]
            j = i
            while(j > 0 && this.array[j-1] > temp) {
                this.array[j] = this.array[j-1]
                j--
            }
            this.array[j] = temp
        }
    }

    mergeSort() {
        let array = mergeSortRec()
    }

    _swap(a, b) {
        let aux = this.array[a]
        this.array[a] = this.array[b]
        this.array[b] = aux
    }
}

let array = new ArrayList()

array.insert(2)
array.insert(12)
array.insert(11)
array.insert(32)
array.insert(22)
array.insert(62)
array.insert(39)
array.insert(82)
array.insert(3)
array.insert(1)

array.insertionSort()
console.log(array.toString());
