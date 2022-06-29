# css 布局部分
## 两栏布局   三栏布局  
1. 浮动  固定侧浮动  适应侧 margin
2. 定位  固定侧定位  适应侧 margin
2. 弹性盒  固定侧 

## 圣杯布局  双飞翼布局  浮动和负边距 实现
1. 圣杯 
    - 结构 中间最前 宽 100%
    - 左中右均浮动 清除浮动
    - 父元素 padding 预留左右侧区域
    - 负 margin 将左右移动到上一行
    - 相对定位 左右 移动到 预留空白位置
2. 双飞翼 
    - 中间 包一层 最前 100%
    - 左 中右均浮动 清除浮动
    - 包住中间的元素 设置 margin 预留左右侧区域
    - 负 margin 将左右移动  预留区域

## 水平垂直居中
1. 定位 
    ```css
        .parent{
            position:relative;
            position:relative;
        }
        //宽高已知
        .child{
            position:absolute;
            top:50%;
            left:50%;
            margin-top:-(child 自身高度的一半);
            margin-left:-(child 自身宽度的一半);
        }
        //宽高已知
        .child{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto
        }
        //兼容性
        .child{
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%)
        }
    ```
2. 弹性盒
    ```css
        .parent{
            display:flex;
            justify-contnet:center;
            aligin-item:center
        }
    ```
    



## 浮动
### 原理
- 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
- 浮动元素碰到包含它的边框或者其他浮动元素的边框停留
### 引发的问题
- 高度塌陷 ：父元素没有高度 由 子元素撑开 当子元素浮动时 脱离文档流 父元素的高度会发生改变
### 如何清除浮动带来的影响
1. 父元素定高度  不能自适应
2. 给最后一个浮动元素的后面加空div 添加clear:both  多了标签 不好
3. BFC  overflow  会造成内容缺失
4. 伪元素 zoom:1


## BFC  块级格式化上下文
### 特点 
1. 垂直方向上，自上而下排列，和文档流的排列方式一致。
2. 在BFC中上下相邻的两个容器的margin会重叠
3. 计算BFC的高度时，需要计算浮动元素的高度
4. BFC区域不会与浮动的容器发生重叠
5. BFC是独立的容器，容器内部元素不会影响外部元素
6. 每个元素的左margin值和容器的左border相接触


### 怎样触发
1. 根元素：html；
2. 浮动：float 除 none 以外的值；
3. 定位：position (absolute、fixed)；
4. display 值为：inline-block、table-cell、table-caption、flex等；
5. overflow 值为：hidden、auto、scroll；




