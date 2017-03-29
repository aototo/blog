### css有些属性容易忘记，半天不写就要去查api，有时候api还不好使，于是还是记下来以后方便用，后续会慢慢补充进来的。


#####  `outline` 当选中input元素的时候会出现状态线
	An outline is a line that is drawn around elements (outside the borders) to make the element "stand out".
	包裹elements 的一个线，一般设置成none 。
	
##### `contenteditable` 设置element是否可编辑
	
    <p contenteditable="true">可编辑</p>
  

##### `webkit-playsinline `
手机video 都可以在页面中播放，而不是全屏播放了。

	<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>


##### position: absolute， 让margin有效的
	
	设置left:0, right:0 就可以。原因是2边都是0不存在边距，element就可以得出距离，并居中。

##### 使用clearfix 清楚浮动
	
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
	
	-webkit-user-select: none; /* Chrome, Opera, Safari */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard syntax */


##### 清除手机tap事件后element 时候出现的一个高亮
	
	*{
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

#### ::-webkit-scrollbar-thumb
	
	可以修改谷歌的滚动条样式，safari好像也可以

#### -webkit-appearance:none
	
1. To apply platform specific styling to an element that doesn't have it by default
2. To remove platform specific styling to an element that does have it by default

移除浏览器默认的样式，比如chrome的input默认样式
	
	input, button, textarea, select {
		*font-size: 100%;
		-webkit-appearance:none;
	}

#### CSS开启硬件加速
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
---

后续追加...有错误的地方请指正，谢谢。
