# isrcoll5-fresh-demo

### iscroll4之前有上拉刷新，下拉加载的功能，但是在iscroll5中被移除了，要做这个功能要引入iscroll-probe.js

* iscroll.js，这个版本是常规应用的脚本。它包含大多数常用的功能，有很高的性能和很小的体积。
* iscroll-lite.js，精简版本。它不支持快速跳跃，滚动条，鼠标滚轮，快捷键绑定。但如果你所需要的是滚动(特别是在移动平台) iScroll 精简版 是又小又快的解决方案。
* iscroll-probe.js，探查当前滚动位置是一个要求很高的任务,这就是为什么我决定建立一个专门的版本。如果你需要知道滚动位置在任何给定的时间,这是iScroll给你的。（我正在做更多的测试,这可能最终在常规iscroll.js脚本，请留意）。
* iscroll-zoom.js，在标准滚动功能上增加缩放功能。
* iscroll-infinite.js，可以做无限缓存的滚动。处理很长的列表的元素为移动设备并非易事。 iScroll infinite版本使用缓存机制,允许你滚动一个潜在的无限数量的元素。

##### 先全局安装fis3 执行 <code>fis3 release</code> ,然后执行 <code>fis3 server start</code>
