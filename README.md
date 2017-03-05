##Redux compose and middleware 源码分析
花了一天时间看了redux 几个function的源码感触颇深，接下来总结下源码的作用。

####`compose.js`
https://github.com/reactjs/redux/blob/master/src/compose.js#L21
```javascript
return funcs.reduce((a, b) => (...args) => a(b(...args)))
```
一头雾水啊，函数编程功力不够，第一眼懵逼，细细琢磨才领悟其中的奥妙。
先不谈奥妙之处我们先写段代码，慢慢解析。

下面代码我们需要组合2个函数，构建成一个新的函数
```javascript
var f1 = function(a) {
	return a * 10;
}

var f2 = function(a) {
	return a + 1;
}

function compose(f1, f2) {
	return function(x) {
		return f1(f2(x))
	}
}

var number = compose(f1, f2)(4) 
number == 50 // true
```
让代码从右向左运行变成f1(f2(x))，4 -> f2 -> f1 -> 50，当然了你也可以在内部reverse一下让函数从第一个开始执行。
 接下来我们看下实际运用的compose

```javascript
let compose = (...funs) => (result) => {
	for (var i = funs.length - 1; i > -1; i--) {
      result = funs[i].call(this, result);
    }
    
	return result;
}

var number = compose(Math.round, parseFloat)('5.8');
// number => 6
```
parseFloat函数return的结果作为Math.round函数的参数
Math.round(parseFloat('5.8'))`

我们在回到redux compose.js 

	funcs.reduce((a, b) => (...args) => a(b(...args)))

跟上面的compose 的原理其实是一样一样的，就是写法很精妙。
先分析`reduce` 这个method
	
	[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)

reduce()把返回的结果继续和序列的下一个元素做累积计算，其效果就是上面这样。

拆分上面的源码步骤如下：
第一次 返回 (...args) => a(b(...args) 且与下一个c函数做计算
第二次 a 等于 (...args) => a(b(...args) ，b 等于 c 这个function ， 然后再一次做 (...args) => a(b(...args)) 计算，就形成了
		
		 (c(...args)) => a(b(...args))
		 //返回 a(b(c(...args)))
第三次也是如此
	
		(d(...args)) => a(b(c(...args)))
		//返回 a(b(c(d(...args))))

结果就如注释的一样
	
```javascript
	// from right to left. For example, compose(f, g, h) is identical to doing
	 // (...args) => f(g(h(...args))).
```

到这里我们这点了compose 的实现原理，接下来我们看下`applyMiddleware.js`
中如何实现中间件的。
[源码](https://github.com/reactjs/redux/blob/master/src/applyMiddleware.js#L30) 
```javascript
	let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
```
然后我们看下middleware函数的签名
({ getState, dispatch }) => next => action => {...}

1. 第一步把middlewares数组里的函数带着middlewareAPI这个参数都挨个执行个遍且，且保存在chain数组中。也就是middleware中的第一个参数，返回 next => action => {...}
2. 第二步 就是上面composeJs 中组合chain中的函数。变成f1(f2(f3(store.dispatch)))，并且最终保存在dispatch 变量中。里面的函数最终会返回action => {...} 这个函数 作为上一个函数的next参数保存在上个函数的scope中，所以每个middleware 中必须执行next(action)才能进入下个middleware。而最后一个middleware传入的next正是原始的store.dispatch。
		
		//演示代码
		const f1 = ({ getState, dispatch }) => next => action => {
			...
		}
		
		compose(f1)(store.dispatch)  
		dispatch = (action) => {  /* next = store.dispatch */ }
		
		compose(f1, f2)(store.dispatch) 
		// f1 = next => action => { ... }
		// (action) => {  /* next = store.dispatch */ }  作为f2的返回值赋值给next 参数
		//其中的next就是f2的函数体

基本的源码分析到此就差不多了，要注意的是为什么异步middleware中可以使用dispatch让action在重新执行一遍。因为其中的dispatch就是源码中的
	
	dispatch = compose(...chain)(store.dispatch)

这样异步middleware就非常容易理解，也很好巧妙的实现异步流。而next则是进入下一个middleware。如果在middleware里面滥用store.dispatch，就会造成无限的循环。
		
		const f2 = store => next => action => {
			next(action) //进入下一个middleware
			store.dispatch(action) //从左边的第一个middleware开始
		}
redux-thunk的实现就是判断action是否是function，如果是就执行action()，action就可以是一个异步请求的函数，具体可以看https://github.com/gaearon/redux-thunk/blob/master/src/index.js#L3的源码！

就写到这里，函数编程的巧妙还需多多学习呀，不足之处还请指正。


参考
[Middleware](http://cn.redux.js.org/docs/advanced/Middleware.html)




