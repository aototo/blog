## 如何合理布置React/Redux的目录结构

项目的结构改过很多次，每次根据需求的复杂度慢慢的修改，总结下几种结构的特点。

按照文件类型划分，不是很复杂的项目可以这样规划。
```
|—— actions
    |—— CommandActions.jsx
    └── newAction.jsx      <- here
|—— components
    |—— Command.jsx
    └── newComponent.jsx   <- here
|—— containers
    |—— Command.jsx
    └── newContainers.jsx  <- here
└── reducers
    |—— command.jsx
    └── newReducers.jsx    <- here
```
上面这种是官方demo http://redux.js.org/docs/advanced/ExampleRedditAPI.html
结构，actions，reducers，containers中放着每个模块的对应的结构文件，看过去很清晰，但是有一个麻烦的地方，就是当你添加一个组件的时候你就需要在3个目录下操作，以及跨文件的管理对应的文件，有点不方便。

---

按照组件划分，一个组件包含自身action，reducers，style等相关的文件，这样在修改某些文件的时候就非常的容易。对于项目不存在很复杂的异步逻辑等可以参考这样的结构。
```
    |—— app
        |—— App.jsx
        |—— reducers.jsx
        |—— routes.jsx
    |—— home
        |—— index.jsx
        |—— Home.jsx
        |—— HomeActions.jsx
        └── HomeReducer.jsx
    |——  product
        |—— index.jsx
        |—— ProductList.jsx
        |—— ProductActions.jsx
        └── ProductReducer.jsx
```

---

如果项目十分的巨大，大量的模块用以上的2个方案不可行，首先复用模块和特定场景下的模块需要分开进行处理，页面的布局view必须整理出来,可以参考[react boilerplate](https://github.com/react-boilerplate/react-boilerplate)。

```
|——app
   |—— component                 # 这里放的都是公共部分的组件
       |—— Header 	   	 # 使用 styled-components 来定义基础组件
       └── Fotter
   |—— containers                # 页面容器
       |—— HomePage
	   |—— ...
	   |—— index.js   	 # 组织了页面的结构, 私有模块
	   |—— reducer.js 	 # Home下的reducer逻辑
	   |—— component         # 私有模块
	   |—— sagas.js   	 # Home下的异步数据
	   |—— action.js
	   |——...
           └── reducers.js 
```

可以说这套项目结构很适合大型项目的组织，component下面包括了大量的通用组件，不管是项目的平台移植，模块复用都很好管理。containers下如HomePage/index.js有复用的模块以及页面场景下特殊的模块构成，同时index.js负责模块跟Store数据的connect，对应的每个场景都拥有自身saga，reducer等。构建大型的项目结构参考这个也是一个非常棒的。

---


react boilerplate 确实可以解决大型项目的结构问题，但是component 和布局结构混合在一起，并没有分离出去，下面这种结构分离了组件，布局模块，更好的管理项目（文件结构同时也增加了复杂度）。

```
|── src/
|  |── views
   |  |—— Home.js         # Home Page 页面
   |  |—— HomeRedux.js    # Home Redux 集合
   |  └── Detail.js       # Detail Page 页面
   |—— redux
   |   └── reducers.js    # 统一了views下的所有reducer
   |—— layouts            # layouts 负责整个app 的布局结构
   |   |—— Frame.js      
   |   |—— Nav.js       
   |—— components
   |   |—— Common          # 通用组件
   |   |—— Home            # Home Page下用到的组件
   |   |   |—— Preview.js
   |   |   └── PreviewRedux.js   # Preview组件用到的reducer, 以及action
```
`layouts` 代码
```
return (
      <div className="frame">
        <div className="header">
          <Nav />
        </div>
        <div className="container">
	      // View下面的Page 都会在此
          { this.props.children }
        </div>
      </div>
    );
```

有了layout页面的布局细分就更加直观，明晰了。在管理reducer的时候会相对的麻烦，views/ 下的主入口页面不但负责页面的结构，还需要整合 components/Home/ 文件下所有的模块的reducer，需要跨文件的处理。Home下Preview组件的reducer、action合并在一起，方便了修改同时控制自身的reducer业务逻辑（对于细分到组件的reducer,action本身逻辑也不会很庞大）。
比如 listReducer -> List ，确实很适合大型团队的分工合作。

---

接下来我们来看看[react-starter-kit](https://github.com/kriasoft/react-starter-kit)，
https://github.com/bodyno/react-starter-kit，2个项目，不过他们的名字好像一样。
> https://github.com/bodyno/react-starter-kit 这个项目的结构使用的是 fractal(不规则碎片形：适合大型项目)*，方法的分组主要是依照特性而不是文件类型。注意，这个目录结构只是一个指引，并不一定要按这个来。这种结构谐在让程序更容易扩展

```
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── layouts              # 主页结构
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
```

routes 作为主入口。

```
export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    ZenRoute(store),
    ElapseRoute(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})
```
一个Counter 模块包含了自身的assets，components，containers
```
Counter/
	components/   # 页面的组件
 	containers/   # view 和 modules 数据对接
	modules/      # 包含对应的 reducer, action
	index.js      # 页面入口，定义path
```

index.js 自动的注入reducer 到store，这样在顶层的store就无需要手动去整合每个模块自身的reducer。代码如下：

```
// 导入对应的redicer
const reducer = require('./modules/counter').default
 /*  Add the reducer to the store on key 'counter'  */
injectReducer(store, { key: 'counter', reducer })

```

看完这套方案真的非常酷，个人觉得多人开发项目迭代产品更新，手动的修改整合顶层reducer是一件不好的事情。

项目的结构并非要跟上面相同，根据自己的需求和理解来构建自己的项目也是一件非常美好的事情。
