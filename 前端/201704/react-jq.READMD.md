> Github: https://github.com/asd0102433/blog
喜欢文章的朋友star 支持一下，长期更新...绝不偷懒

- ### Stateless function 无状态组件
平时写组件用到比较多的就是无状态组件，不但优雅，也是优化react性能的一种手段。
 ```javascript
    const Greeting = ({ name, style }) => {
      return <div style={style}>{name}</div>
    };
 ```
    

- ### Array as children 把数组数据渲染出来
经常会遇到处理数组数据的情况，可以用下面的方式简单的渲染出来。
    
 ```javascript
    render() {
        return (
            (<ul>
                {List.map((item) => (
                     <li>{item}</li>
                ))}
            </ul>)
        )     
    }
 ```
    


- ### 封装基础类组件

    比如 `<input type="text" >` 每次写很麻烦吧，可以封装一个成一个组件
```javascript
    const input = (props) => {
        return <input type = {props.type} {...props} />
    }
```
    
- ### Layout Component 布局组件
组件可以分成很多类类，有的是布局类，有的是功能类。下面是一种布局类的组件。

 ```javascript 
 
    <FlexContainer>
      <div style={{ flex: 1 }}>{this.props.leftSide}</div>
      <div style={{ flex: 2 }}>{this.props.rightSide}</div>
    </FlexContainer>
    
 ```
    
    
- ### Higher Order Component 高阶组件
高阶组件很像decorator，提升组件的能力。比如你想一些组件里面使用一下功能，react-router 中

 ```javascript
    import { withRouter } from 'react-router'
    withRouter(SomeComponent)
 ```

例子：

 ```javascript
    
    var Enhance = ComposedComponent => class extends React.Component {
      componentDidMount() {
        this.setState({ name: "李狗子" });
      }
      render() {
        return <ComposedComponent {...this.props} name = {this.state.name} />;
      }
    };
    
 ```
    
- ### 受控组件，不受控组件
项目中经常会用到这两种情况如：
受控组件，更新的时候需要使用this.setState

 ```javascript
    constructor() {
        super();
        this.state = {value: ""}
    }
    render() {
        return <input type="text" value={this.state.value} />
    }
 ```
    
 不受控组件，主要需要通过ref来获取input的值。

 ```javascript
    render() {
        return <input type="text" ref="myInput" />
    }
    
  ```
    
    两种方法都可以在特定的场合去使用，个人觉得数据相对重要的页面需要使用受控组件会比较合适。

- ### 使用三元表达式
项目中经常有判断语句，用三元表达式可以很方便的写出想要的逻辑
    
  ```javascript
    const demo = ({ isOK }) => {
        return isOK 
        ? <p> Yes </p> 
        : <p> No </p>
    };
 ```

- ### 给setState传入function
可以使用function来更新state
    
    ```javascript
    this.setState((prevState, props) => ({
        return ...
    }));
    ```
    
- ### 通过ref属性获取component

 场景：下面的例子是初始化组件后，让input默认获取光标。ref最终指向的已经渲染好的DOM节点，或者是react class的实例。具体可以看[官方的文档](https://zhenyong.github.io/react/docs/more-about-refs.html)

 ```javascript
    componentDidMount() {
        this.input.focus();
    }
    render() {
        return (
            <input
              ref={comp => { this.input = comp; }}
            />
        )
    }
 ```

- ### 切勿使用...props传递数据

 一个非常错误的做法比如：
 ```javascript
    <Component {...props} />
 ```
props上面如果有非常多的属性，会造成非常昂贵的计算。正确的应该

 ```javascript
    <Component name = { props.name } />
 ```
---
    
以上是平时写React用到的一些写法小技巧，说有用还蛮有用的！

有错误的地方还请指正！谢谢大家。


下面2个链接都很棒哦！记得收藏star...

参考：

https://github.com/vasanthk/react-bits

react 代码规范

https://github.com/airbnb/javascript/tree/master/react
