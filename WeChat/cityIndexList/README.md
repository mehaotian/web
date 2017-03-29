
---
title: 小程序城市索引列表选择
date: 2017-03-29 10:20
categories:
tags:
     - 微信小程序
     - 城市列表选择
---
#### 引言：
> 在写项目的时候碰到一个问题，需要一个城市的索引列表，然而小程序并没有提供，寻找了好久，都没有找到效果满意的。
索性就自己写一个了。先贡献代码出来，希望可以帮助到更多人，当然bug在所难免，与君共勉。

**效果如下**

![img](http://omw93wh60.bkt.clouddn.com/movie.gif)

#### wxml代码实现

1.城市列表整体利用的是 <scroll-view /> 的滚动视图标签 ，布局比较简单 ，这里的滚动视图
的高度是 js 自动控制的。

```

<scroll-view scroll-y="true" style="height: {{winHeight}}px;" scroll-into-view="{{scrollTopId}}" class="city_list">
    <block wx:for="{{city}}" wx:for-index="idx" wx:for-item="cityName">
      <text id="{{idx}}" class="list_tit">{{idx}}</text>
      <block wx:for="{{cityName}}">
         <view class="list_con">{{item.name}}</view>
      </block>

    </block>
</scroll-view>

```

2.右侧的字母选择列表布局,需要注意的是 ，这个列表的高度，字母框的 height 、 line-height也是js控制的。这个高度需要js计算。之后详细说明



###### *scroll-into-view	值应为某子元素id，则滚动到该元素，元素顶部对齐滚动区域顶部*

```

<view class="scroll_list" 
      bindtouchstart="chStart"
      bindtouchend="chEnd"
      catchtouchmove="chMove"
      style="background: rgba(0,0,0,{{trans}});"
      >
   <block wx:for="{{city}}" wx:for-index="idx" wx:for-item="cityName">
      <block wx:if="{{idx != '热门城市'}}">
       <view id="{{idx}}" class="scroll_list_chi" style="line-height:{{lineHeight}}px ; height:{{lineHeight}}px ;font-size:{{lineHeight/1.7}}px;" bindtouchstart="getWords" bindtouchend="setWords">{{idx}}</view>
      </block>
    </block>
</view>

```

3.右侧选择之后，中间圆形字母的显示

```

<!--选择显示-->
<view hidden="{{hidden}}" class="showwords">
  {{showwords}}
</view>

```


#### js代码实现

1.引入城市的json数据,最下面有完整代码实例  （可能实际中远程请求是最多的，为了方便演示，我用的是假数据）

```

var city = require('../../utils/allcity.js')

```

2.在页面初次渲染（onReady）完成的时候 ，设置<scroll-view /> 的高度

```
//将this赋值到that ，这应该不用多说
var that = this;
//获取allcity.js 中city的数据
var cityChild = city.City[0];

// wx.getSystemInfo 获取屏幕参数，不懂的可以去参考一下 微信小程序API ，这里不多说
wx.getSystemInfo({
    success: function (res) {
    	//计算单个的字母高度 
    	//这里为什么是减去一个100 然后除以22 诸位可以想一想哈
    	// 赋值给全局变量 lineHeight ，后面是要用到这个变量的;
        lineHeight =(res.windowHeight - 100)/22 ;
        
        //赋值给 data  已供 wxml 调用
        that.setData({
            city: cityChild,
            winHeight: res.windowHeight - 40, //<scroll-view /> 的高度,减去40 是因为有一个40的页头
            lineHeight:lineHeight
        })

    }
})

```

3. 注意看wxml 右侧字母列表选择的 class="scroll_list" ，绑定了三个事件 和 一个 style，这里解释一下这几个事件
* bindtouchstart 手指触摸
* bindtouchend    手指触摸结束
* catchtouchmove 手指触摸后移动

 *注:手指触摸后移动需要阻止冒泡 ，所以用的是catchtouchmove 因为后面的其他事件会影响这个事件 ，所以需要阻止冒泡
 关于冒泡事件和非冒泡事件（bind or catch）如果不太清楚，请关注小程序API*
 
**手指触摸事件**
```

//触发全部开始选择
chStart:function(){
    this.setData({
        trans:".3", // 设置 右侧选择列表背景透明度 为 0.3  应用到 style
        hidden:false // 显示屏幕中心圆形字母框
    })
},
//触发结束选择
chEnd:function(){       
    this.setData({
        trans:"0",// 设置 右侧选择列表背景透明度 为 0  应用到 style
        hidden:true, // 隐藏屏幕中心圆形字母框
        scrollTopId:this.endWords  //更新 scroll 顶部位置 为选择字母
    })
},

/**
 *  这两个事件绑定在单个字母按钮上，更新圆形字母框
 */
 //获取文字信息，点击单个字母框的时候，更新圆形字母框
getWords:function(e){
    var id = e.target.id ;
    this.endWords = id ;
    isNum = id ;
    this.setData({
        showwords:this.endWords
    })
},
//设置文字信息 ，手指离开的时候 ，更新scroll 的 顶部位置，这个时候还没有出发 手指移动（catchtouchmove ）事件
setWords:function(e){
    var id = e.target.id ;
    this.setData({
        scrollTopId:id
    })
},

```

**手指触摸移动事件**

```

 // 滑动选择城市
chMove:function(e){
	//获取手指在的屏幕y轴位置
    var y = e.touches[0].clientY ;
    //获取当前区域距离可视区域的 顶部位置 offsettop 
    var offsettop = e.currentTarget.offsetTop ;
    var height = 0 ;
    var that =this;
    
    var cityarr = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
        success: function (res) {
            height = res.windowHeight - 10;
        }
    });
    
    //判断选择区域,只有在选择区才会生效
    if(y > offsettop && y < height ){
        // console.log((y-offsettop)/lineHeight)
        //获取手指在那个字母上
        var num = parseInt((y-offsettop)/lineHeight);
        endWords = cityarr[num];
        // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
        that.endWords = endWords;
    };


    //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    //DOTO 这里暂时还有问题，还是比较卡，待优化
    if(isNum != num){
        // console.log(isNum);
        isNum = num ;
        that.setData({
            showwords:that.endWords
        })
    }
    
}

```


到此，基本结束 ,欢迎来信咨询 
WeChat ：wuhaotian0
