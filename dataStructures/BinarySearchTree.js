/* 
    二叉搜索树(BST)是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值。
 */

class Node {
    constructor(key) {
    this.key = key
    this.left = null
    this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(key) {
        let newNode = new Node(key)

        if (this.root === null) {
            this.root = newNode
        } else {
            this._inserNode(this.root, newNode)
        }
    }

    search(key) {
        return this._searchNode(this.root, key)
    }


    /*
        中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点 
     */
    inOrderTraverse(callback) {
        this._inOrderTraverseNode(this.root, callback)
    }

    /*
        先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构 化的文档。 
     */
    preOrderTraverse(callback) {
        this._preOrderTraverseNode(this.root, callback)
    }

    /* 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。 */ 
    postOrderTraverse() {
        this._postOrderTraverseNode(this.root, callback)
    }

    min() {
        if (this.root !== null) {
            return this._minNode(this.root)
        }
    }

    max() {
        if (this.root !== null) {
            return this._maxNode(this.root)
        }
    }

    remove(key) {}

    _inserNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this._inserNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this._inserNode(node.right, newNode)
            }
        }
    }

    _inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this._inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this._inOrderTraverseNode(node.right, callback)
        }
    }

    _preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key)
            this._preOrderTraverseNode(node.left, callback)
            this._preOrderTraverseNode(node.right, callback)
        }
    }

    _postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this._preOrderTraverseNode(node.left, callback)
            this._preOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    _minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }

            return node
        }
    }

    _maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right
            }

            return node
        }
    }

    _searchNode(node, key) {
        if (node === null) {
            return false
        }
        if (key < node.key) {
            return this._searchNode(node.left, key)
        } else if (key > node.key) {
            return this._searchNode(node.right, key)
        } else {
            return true
        }
    }
}

let tree = new BinarySearchTree()

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)

// tree.inOrderTraverse((value) => {
//     console.log(value)
// })

// tree.preOrderTraverse((value) => {
//     console.log(value)
// })

// console.log(tree.min())
// console.log(tree.max())
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.')
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.')