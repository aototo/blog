### react 生命周期详解(React Lifecycle)
React的生命周期对组件而言是一个很重要的存在，每一个状态都有其重要的作用。

#### 第一次Redner
![](https://github.com/asd0102433/blog/blob/master/%E5%89%8D%E7%AB%AF/assets/Ini%C2%ADtial%20Render.png)

首次渲染执行的顺序如图上

	getDefaultProps相当于ES6中staticdefaultProps = {}
	getInitialState相当于constructor中的 this.state = {}

#### Props 改变

![](https://github.com/asd0102433/blog/blob/master/%E5%89%8D%E7%AB%AF/assets/props%20change.png)

#### State 改变

![](https://github.com/asd0102433/blog/blob/master/%E5%89%8D%E7%AB%AF/assets/state%20Change.png)

#### 组件卸载

![](https://github.com/asd0102433/blog/blob/master/%E5%89%8D%E7%AB%AF/assets/Com%C2%ADpo%C2%ADnent%20Unmount.png)

####自定义组件的3个阶段

自定义组件的主要通过3个阶段来管理，分别是`MOUNTING`，`RECEIVE_PROPS` 和 `UNMOUNTING`，3个阶段对应3中方法，分别是：mountComponent、updateComponent 和 unmountComponent。

 1. 其中`will`前缀的方法是进入状态之前的调用，比如`componentWillReceiveProps`，此方法中改变state不会二次渲染而是进行state合并，并且只有在`componentDidUpdate`后才能获取更新后的this.state。如果想获取组件默认的props，并且赋值给State ,就可以在这里修改，达到UI上的效果。
 2. `did`的前缀表示进入状态之后调用，比如componentDidMount，组件一般初始化都会在这里进行数据请求。
```javascript
	componentDidMount() {
		this.gitInitData()
	}
```

`shouldComponentUpdate` 是在第二阶段RECEIVE_PROPS运行的，从

	1. componentWillReceivePorps 
  
	2. shouldComponentUpdate 
  
	3. componentwillUpdate 
  
	4. render 
  
	5. componentDidUpdate
  
	
shouldComponentUpdate接收需要更新的props 和 state, 如果方法返回`false`的时候就不会向下执行生命周期了。（默认情况下React会渲染所有节点，所以返回true），react性能优化的主要手段之一。
> 注意: 在shouldComponentUpdate和componentwillUpdate中切勿使用setState方法，会导致循环调用。

#####第三阶段：UNMOUNTING
`unmountComponent`负责组件中的componentWillUnmount
如果存在componentWillUnmount，则执行重置所有相关参数。在该方法中调用setState不会触发render，因为所有的更新队列，更新状态都被重置为null。

####无状态组件
在React开发中，我们需要一些单纯的只接受props进行渲染的组件，更易于管理，简单开发。无状态组件只是一个render方法，没有存在实例返回，接收props渲染成DOM结构。在项目开发中作为view组件的存在，应该尽量的多使用无状态组件。
栗子
```javascript
const Pane = (props) => <div>{props.children}</div>;

Pane.propTypes = {
  ...
};
```
在我们平常的组件开发中，组件可以分为数据层，渲染层。其中单纯的渲染层就可以是无状态组件。
