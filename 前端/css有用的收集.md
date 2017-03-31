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
  

##### `webkit-playsinline `
手机video 都可以在页面中播放，而不是全屏播放了。

	<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>


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

#### -webkit-appearance:none
	
1. To apply platform specific styling to an element that doesn't have it by default
2. To remove platform specific styling to an element that does have it by default

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
	    -webkit-transform: rotateY(60deg); /* Chrome, Safari, Opera */
	    -webkit-transform-style: preserve-3d; /* Chrome, Safari, Opera */
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
##### CSS3 filter Property 图片过滤，控制灰度
    
    img {
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }

移动端可以使用，IE兼容不好。

#### 使用css创建三角形
这个很多面试题好像又问到，但实际中我也确实使用了。
    
    div {
        border-bottom: 10px solid white;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        height: 0px; 
        width: 0px; 
    }
    
transparent 透明

---

后续追加...有错误的地方请指正，谢谢。

下面是一些CSS的网站，项目中也经常使用的。

[Css3动画手册](http://isux.tencent.com/css3/)

[Css参考手册](http://css.doyoe.com/)

[Anicollection 动画库](http://anicollection.github.io/#/)

[Animate 动画库](https://daneden.github.io/animate.css/)

[csshake 抖动很逗](http://elrumordelaluz.github.io/csshake/)

[字体图标](http://weloveiconfonts.com/)
