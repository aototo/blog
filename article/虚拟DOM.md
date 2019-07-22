## 虚拟DOM

>  virtual dom 也就是虚拟节点。它通过JS的Object对象模拟DOM中的节点，再通过特定的render方法将其渲染成真实的DOM节点

如下：

```javascript
Element {
  type: 'div',
  props: {
    class: 'list'
  },
  children: Array(2)
}
```



第一步：创建一个虚拟dom 

```javascript
createElement('ul', { class: 'list-group'}, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('div', { class: 'item' }, ['3']),
])
```

```
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props =  props;
    this.children = children;
  }
}

function createElement (type, props, children) {
  return new Element(type, props, children)
}
```



第二步: 渲染虚拟dom，变成真实dom

```
// 渲染虚拟dom
let el = render(vertualDom)

function render (eleObj) {
  let el = document.createElement(eleObj.type);

  for(let key in eleObj.props) {
    // 设置属性的方法
    setAttr(el, key, eleObj.props[key])
  }

  /* 遍历children属性, 如果是虚拟dom则继续渲染，不是就代表文本节点 */
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}

```

第三步：添加到html dom 节点上

```
renderDom(el, window.root)

/* 添加节点到真实DOM */
function renderDom (el, target) {
  target.appendChild(el)
}
```



### Diff 算法 

对虚拟domTree 进行对比，进行二叉树的深度优先遍历。

DOM diff 三种优化策略

1. 只比较平级，

2. 不会跨节点对比，如果节点发生变化，就直接删除老节点。
3. 如果2个节点只是互换了位置，会选择复用。（通过使用key 来实现）



代码：

```
const ATTRS = 'ATTRS' // 属性变化
const TEXT = 'TEXT' // 文本变化
const REMOVE = 'REMOVE' // 内容移除
const REPLACE = 'REPLACE' // 内容替换

function diff (oldTree, newTree) {
  let patches = {}
  let index = 0

  /* 递归树 比较后的结果放到补丁包中 */
  walk(oldTree, newTree, index, patches)
  return patches
}

// 递归对比
function walk (oldNode, newNode, index, patches) {
  let currentPatch = [] // 每个元素都有一个补丁对象

  if(!newNode) {
    currentPatch.push({type: REMOVE, index: index})
  } else if (isString(oldNode) && isString(newNode)) { // 字符串
    if(oldNode !== newNode) {
      currentPatch.push({type: TEXT, text: newNode})
    }

  } else if (oldNode.type === newNode.type) {
    /* 比较属性是否有更改 */
    let attrs = diffAttr(oldNode.props, newNode.props)

    if(Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs })
    }

    // 如果有children节点，就遍历
    diffChildren(oldNode.children, newNode.children, patches)
  } else {
    // 说明节点被替换了
    currentPatch.push({ type: REPLACE, newNode })
  }

  /* 当前元素确实有补丁 */
  if (currentPatch.length > 0) {
    // 将元素和补丁对应起来，放到大不补丁中
    patches[index] = currentPatch
  }
}

// 分析属性是否发生变化
function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  // 判断来的属性跟新的属性的关系
  for(let key in oldAttrs) {
    if(oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key] // 有可能是undefined
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

let Index = 0
// 遍历children 属性
function diffChildren (oldChildren, newChildren, patches) {
  // 比较老的第一个，和新的第一个
  oldChildren.forEach( (child, idx) => {
    // 索引不应该是index ----------------------------
    // index每次传递给walk时是递增的, 所有的人都基于一个序号
    walk(child, newChildren[idx], ++Index, patches)
  })
}

// 判断是不是字符串
function isString (node) {
  return Object.prototype.toString.call(node) === '[object String]'
}
```

