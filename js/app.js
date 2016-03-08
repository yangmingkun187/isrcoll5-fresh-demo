var testScroll,
    pullDownFlag,pullUpFlag,
    pullDown,pullUp,
    flag = true,//用于防止数据重复提交
    pageIndex = 1,// 此参数作为分页请求的当前页数，在每一次请求成功的回调函数中执行pageIndex++，下面并未用到
    count = 0;// 为例子中记录新加了几条数据，
(function (doc, win) {
    function positionJudge(){
        if (this.y > 50 && !pullDown.className.match('flip')) { // 此处this指向Iscroll
            pullDown.className = 'flip';
            pullDown.querySelector('.pullDownLabel').innerHTML = '松开立即刷新…';
            pullDownFlag = 1;
        } else if (this.y < 50 && pullDown.className.match('flip')) {
            pullDown.className = '';
            pullDown.querySelector('.pullDownLabel').innerHTML = '下拉立即刷新…';
            pullDownFlag = 1;
        } else if (this.y < (this.maxScrollY - 50) && !pullUp.className.match('flip') && !pullUp.className.match('noData')) {
            pullUp.className = 'flip';
            pullUp.querySelector('.pullUpLabel').innerHTML = '松开立即刷新…';
            pullUpFlag = 1;
        } else if (this.y > (this.maxScrollY + 50) && pullUp.className.match('flip') && !pullUp.className.match('noData')) {
            pullUp.className = '';
            pullUp.querySelector('.pullUpLabel').innerHTML = '上拉加载更多…';
            pullUpFlag = 1;
        }
    }
    function action(){
        if (pullDownFlag==1 &&!pullDown.className.match('flip')) {
            pullDown.className = 'loading';
            pullDownAction();
            pullDown.querySelector('.pullDownLabel').innerHTML = "加载中…";
            pullDownFlag = 0;
        } else if (pullUpFlag==1 && pullUp.className.match('flip')) {
            pullUp.className = 'loading';
            pullUpAction();
            pullUp.querySelector('.pullUpLabel').innerHTML = "加载中…";
            pullUpFlag = 0;
        }
    }
    function toHtml() {
      setTimeout(function () {
        var el, li;
    		el = document.getElementById('list');
        // 模拟对页面的处理
		    for (var i=0; i<3; i++) {
    			li = document.createElement('li');
    			li.innerText = '新加的第' + (++count) + '条数据';
    			el.appendChild(li, el.childNodes[0]);
		    }
        if(count >= 6) {// 如果此处是最后一次请求(判断条件根据不同条件写，此处依照count大于6)
            pullUp.className = 'noData';
            pullUp.querySelector('.pullUpLabel').innerHTML = '没有更多了…';
            pullUp.querySelector('.pullUpIcon').style.background = 'none';
            pullUp.querySelector('.pullUpIcon').style.width = 0;
        } else if (pullUpFlag==0 && pullUp.className.match('loading')) {  // 此处需要将pullUp的状态设置为初始状态
            pullUp.className = '';
            pullUp.querySelector('.pullUpLabel').innerHTML = "上拉加载更多…";
        }
        flag=true;//成功后设置为true
        testScroll.refresh(); // 更新iscroll
      }, 1000);//故意延时1秒模拟异步请求的延时
    }
    function pullDownAction(){
        location.reload();//上拉直接重新刷新改页面，也可以做异步请求
    }
    function pullUpAction(){
        if(flag) {
            //利用flag来防止ajax重复提交
            flag=false;
            // 此处写异步请求，在成功的回调函数中将flag设置为true；
            toHtml();
        }
    }
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; // rem 根据不同设备宽度设置单位
                pullDownFlag = 0;
                pullUpFlag = 0;
                pullDown = document.getElementById("pullDown");
                pullUp = document.getElementById("pullUp");
                testScroll = new IScroll('.iscroll',{
                    useTransition:true,
                    scrollX: true,
                    freeScroll: true,
                    probeType: 3,
                    useTransform: true,//CSS转化
                    startX: 0,
                    startY: 0
                });
                testScroll.on('scroll',positionJudge); // 滚动中，此处需要注意要引入iscroll-probe.js
                testScroll.on("scrollEnd",action); // 滚动结束
            };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();//阻止touchmove默认事件
    }, false);
})(document, window);
