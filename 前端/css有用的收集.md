### css有些属性容易忘记，半天不写就要去查api，有时候api还不好使，于是还是记下来以后方便用，后续会慢慢补充进来的。

#####  `outline` 移除当选中input元素的时候会出现状态线
<input placeholder ="你试试 点这个框框"/> 

	An outline is a line that is drawn around elements (outside the borders) to make the element "stand out".
	包裹elements 的一个线，一般设置成none 。
	
	div {
	    outline: none; //一般情况下移除它
	    // outline: 5px dotted red; 也可以设置样式
	}

##### `contenteditable` 设置element是否可编辑

    <p contenteditable="true">可编辑</p>

可以通过input, blur事件来监听element的输入和输入完后鼠标离开。

---

##### `webkit-playsinline `
手机video 都可以在页面中播放，而不是全屏播放了。

	<video src="test.mp4" webkit-playsinline="true"></video>


##### position: absolute， 让margin有效的

	设置left:0, right:0 margin: 0 auto; 就可以。原因是2边都是0不存在边距，element就可以得出距离，并居中。
	
	div {
	    position: absolute;
	    left: 0;
	    right: 0;
	    margin: 0 auto;
	}

##### 使用clearfix 清除浮动，解决父类高度崩塌。

	.clearfix {
		zoom: 1;
	}
	
	.clearfix:after {
		 visibility: hidden;
	     display: block;
	     font-size: 0;
	     content: " ";
	     clear: both;
	     height: 0;
	 }


##### user-select 禁止用户选中文本

    div {
        user-select: none; /* Standard syntax */
    }


##### 清除手机tap事件后element 时候出现的一个高亮

	* {
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

#### ::-webkit-scrollbar-thumb

	可以修改浏览器的滚动条样式。IE火狐可能不支持。

---

#### -webkit-appearance:none

> 1. To apply platform specific styling to an element that doesn't have it by default
> 2. To remove platform specific styling to an element that does have it by default

移除浏览器默认的样式，比如chrome的input默认样式，然后就可以定义需要的样式。
	
	input, button, textarea, select {
		*font-size: 100%;
		-webkit-appearance:none;
	}

##### CSS开启硬件加速
http://www.cnblogs.com/rubylouvre/p/3471490.html

	-webkit-transform: translateZ(0);


##### 使用CSS transforms 或者 animations时可能会有页面闪烁的bug

	-webkit-backface-visibility: hidden;


##### -webkit-touch-callout 禁止长按链接与图片弹出菜单

	-webkit-touch-callout: none;

#####  transform-style: preserve-3d   让元素支持3d

	div {
	    transform: rotateY(60deg);
	    transform-style: preserve-3d;
	}

##### perspective 透视
这个属性的存在决定你看到的元素是2d还是3d。一般设置在包裹元素的父类上。
	
	.div-box {
		perspective: 400px; 
	}

##### css实现不换行、自动换行、强制换行

	//不换行
	white-space:nowrap;
	
	//自动换行
	word-wrap: break-word; 
	word-break: normal; 
	
	//强制换行
	word-break:break-all;


##### box-sizing 让元素的宽度、高度包含border和padding

	{
		box-sizing: border-box;
	}


##### calc() function, 计算属性值
https://www.w3schools.com/cssref/func_calc.asp
    
    div {
        width: calc(100% - 100px);
    }

上面的例子就是让宽度为100%减去100px的值，项目中很适用，IE9以上

---

##### css3 linear-gradient 线性渐变
默认开始在top, 也可以自定义方向。
    
    div {
    		linear-gradient(red, yellow)
    }
    
    background: linear-gradient(direction, color-stop1, color-stop2, ...);

##### 常用的选择器 :nth-child() Selector
选择父类下第一个子节点，p元素

    p:nth-child(1) {
        ...
    }


##### -webkit-font-smoothing 字体抗锯齿
使用该属性能让页面上的字体变得清晰，但是也会造成font-weight: bold 加粗变得异常。不信你试试...

    div {
        -webkit-font-smoothing: antialiased; 
    }

---
`更新3-31`
##### CSS3 filter Property 图片过滤

    img {
        filter: grayscale(100%); //灰度
        filter: blur(5px); //模糊
        filter:brightness(200%); //高亮
        filter:saturate(8); //饱和
        filter:sepia(100%); //怀旧
        ...
    }

移动端可以使用，IE兼容不好。更多请看
https://www.w3schools.com/cssref/css3_pr_filter.asp

#### 使用css创建三角形
这个很多面试题好像问到，但实际中我也确实使用了。
    
    div {
        border-bottom: 10px solid white;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        height: 0px; 
        width: 0px; 
    }

transparent 透明

##### clip属性，截取你想要显示的图片

    img {
        position: absolute;
        clip: rect(0px,60px,200px,0px);
    }

你有兴趣可以看
https://tympanus.net/codrops/2013/01/16/understanding-the-css-clip-property/

##### 设置文字，字母间距，很实用 letter-spacing

    h1 {
        letter-spacing: *px; //也可以是负数
    }

---

`更新4-3 补充`

关于display: box 和 display: flex，前者是2009实施，后者2012年，如果你的安卓比较老请使用display: box，但是2者的表现可能有点不同。下面是兼容方法。

    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */

[知乎一丝](https://www.zhihu.com/question/22991944/answer/23302749)具体问题可以参考这篇文章。

---

##### 图片运动过程中，图片模糊问题
在animation过程中，图片会出现模糊的情况，可以设置如下在图片上面。

    transform: translate3d(0, 0, 0);


​    
##### 使用margin aotu 
```css
  div {
    width: 100px;
    position: absolute;
    right: 0;
  }

  // 使用margin-left: auto 自动算出做左边宽度，实现内容贴右边
  div {
    width: 100px;
    margin-left: auto;
  }
```
---

##### overflow: scroll 使滚动流畅（解决ios上滑动不流畅）
```css
-webkit-overflow-scrolling: touch;
```


下面是一些CSS的网站，项目中也经常使用的。

[Css3动画手册](http://isux.tencent.com/css3/)
[Css参考手册](http://css.doyoe.com/)
[Anicollection 动画库](http://anicollection.github.io/#/)
[Animate 动画库](https://daneden.github.io/animate.css/)
[csshake 抖动很逗](http://elrumordelaluz.github.io/csshake/)
[字体图标](http://weloveiconfonts.com/)
[w3schools](https://www.w3schools.com/cssref/pr_pos_clip.asp)
