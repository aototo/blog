## 5分钟配置webpack雏形

网络上很多文章真的是很糟糕鸡肉鸭肉乱炖，包括早期webpack官方的文档，一套完整的配置教程要看个半天，配置起来更是麻烦！不说了开写。

#### 第一步：创建 package
    
    npm init -yes
    
#### 第二步：下载wbepack, babel (注意webpack版本1，babel编译ES6,7等等)
[babel](https://github.com/babel/babel-loader)
[babel-preset-env](https://github.com/babel/babel-preset-env/blob/master/README.md) 文档，一个帮你配置Babel的preset
    
    npm install --save-dev babel-loader babel-core  babel-preset-env webpack@1
    
#### 第三步：创建webpack.config.js配置config
./webpack.config.js

```javascript

module.exports = {
  entry: {                       // 编译入口配置
    app: './app/app.js'          // app/app.js 入口文件
  },
  output: {                      // 编译后输出配置
    path: __dirname + '/dist',   //__dirname指当前目录，生成./dist文件
    filename: '[name].build.js',
    publicPath: '/'              // 资源路径，如：css的背景图片等路径
  },
};

```
然后在package.json中找到scripts添加
    
    "start": "webpack --config webpack.config.js"
    
#### 第四部：启动命令
    
    $ npm start
    
好了，./dist/app.build.js 你可以看到了，编译成功。

#### 第五步：使用babel编译js
    # 对es6的支持
    $ npm install babel-preset-es2015 --save-dev
    
    # 如果你想用es7的功能
    $ npm install babel-preset-stage-0 --save-dev
    
添加module到config
```javascript
...
output:{..},
module: {
    loaders: [
      {
        test: /\.js$/,              //如果jsx 就jsx
        exclude: /node_modules/,    //禁止编译node_modules文件
        loader: 'babel-loader',     //babel-loder
        query: {
            presets: ['es2015', 'stage-0', 'env']  //babel-preset-env
        }
      }
    ]
  },
...
```
好了，你的项目可以使用import, se6, es7等特性了。

#### 创建html
创建html在你的 ./app/index.html

    $ npm install html-webpack-plugin --save-dev
    
使用[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + 'app/index.html', //指向你的index.html
      title: 'Fuck!',  //页面中通过<%= htmlWebpackPlugin.options.title %>使用 具体请看官方具体文档
    })
],
```

好了上面你就会在dist/index.html 查看到了。

#### 还需要一个服务器
[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

    $ npm install webpack-dev-server@1.16.3 --save-dev
    
注意如果使用webpack1的版本，dev-server不能是2的版本不然会报错。

添加devServer 到config里面，服务端口9000
```javascript
devServer: {
    contentBase: __dirname + 'dist',
    compress: true,
    port: 9000
}
```

    $ webpack-dev-server --hot --inline
    
    [HMR] Waiting for update signal from WDS...
    [WDS] Hot Module Replacement enabled.
    


你可以在在package.json 修改成这样
    
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --hot --inline --config webpack.config.js NODE_ENV=development"
    
你就可以通过, 构建项目的命令了。
    
    $ npm start
    $ npm build
    

命令添加 `NODE_ENV=development` 来给项目添加开发环境

到这就差不多可以跑通了，更多的细节大家还是去看git上面比较好的项目配置。一般找一些react的项目看看就可以了。

  ---

你更新文件就会自动刷新页面，但是是强刷。（难玩这东西）


如果你对dev-server有问题看看下面翻译的这篇文章吧
http://www.jianshu.com/p/941bfaf13be1

react hot解决了上面的问题，实现了hot
https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md

如果你没用react-hot 可以使用 [webpack-module-hot-accept](https://github.com/loggur/webpack-module-hot-accept)

但是webpack2 还是需要

---
如果你的css中字体路径失效看这里（我使用url-loader也遇到过）
http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

更多的xxx-loader,sass, img, font等大家自己去看文档吧，相对简单。

---
下面是个人觉得不错的webapck优化

[彻底解决 Webpack 打包性能问题](https://juejin.im/entry/57996222128fe1005411c649)
[webpack打包分析与性能优化](https://github.com/hawx1993/tech-blog/issues/3)
[webpack 进阶](https://zhuanlan.zhihu.com/p/21318102)


