
// 首页每周图片加动画

var oImg = document.createElement('div');
var d = new Date().getDay();
var week = [
	{'images':"images/week/one.jpg",'day':'周日','content':'忙完这一阵就可以准备准备忙下一阵了'},
	{'images':"images/week/two.jpg",'day':'周一','content':' 关于新的挑战从未停止过'},
	{'images':"images/week/three.jpg",'day':'周二','content':'  一周生活进入正轨,加油了诸位'},
	{'images':'images/week/four.jpg','day':'周三','content':' 人生总要有一次成功就是证明自己'},
	{'images':'images/week/five.jpg','day':'周四','content':' 只要坚持不是一无是处那就是有用'},
	{'images':'images/week/six.jpg','day':'周五','content':' 整理心情准备好好休息'},
	{'images':'images/week/seven.jpg','day':'周六','content':'河山大好出去走走'},
];
oImg.className = 's-week animated zoomInDown';
oImg.style.backgroundImage = 'url('+week[d].images+')';
var h3 = document.createElement('h3');
var p = document.createElement('p');
h3.innerHTML = week[d].day;
p.innerHTML = week[d].content;
var div = document.createElement('div');
div.className = p.className = h3.className = 'animated bounceInLeft'
div.appendChild(h3)
div.appendChild(p)
oImg.appendChild(div)
document.body.appendChild(oImg)
document.onclick = function(){
	oImg.className = 's-week animated zoomInDown j-hide';
	this.body.children[1].style.display = 'block'
}
div.onclick = function (e) {
	var ev = e || event ;
	ev.cancelBubble = true
}
div.onmouseover = function (){
	this.className = 'animated swing'
}
div.onmouseout = function (){
	this.className = 'animated'
}



// alert弹出框

var obox = document.querySelector('form.request');
var close = document.querySelector('span.fa-close');
var outNode = document.querySelector('.alert');
var send = document.querySelector('.send');
var speedX = 0 , speedY = 0 , t = null;

function startMove(){
	clearInterval(t)
	t = setInterval(function(){
		speedY += 1;
		speedX *=0.98;
		var t = obox.offsetTop + speedY;
		var T = innerHeight - obox.offsetHeight;
		var W = innerWidth - obox.offsetWidth;
		var w = obox.offsetLeft + speedX;
		if(t>T){
			t = T;
			speedY*=-1;
			speedY*=0.75;
		}else if(t<0){
			t = 0;
			speedY*=-1;
			speedY*=0.75;
		}
		if(w>W){
			w = W;
			speedX*=-1;
		}else if(w<0){
			w = 0;
			speedX*=-1;
		}
		obox.style.top = t+'px'
		obox.style.left = w+'px'
	},13)
}


obox.onmousedown = function(e){
	clearInterval(t)
	var ev = e||event;
	var oldX = e.clientX;
	var oldY = e.clientY;
	var l = oldX - obox.offsetLeft - outNode.offsetLeft;
	var t = oldY - obox.offsetTop - outNode.offsetTop;
	document.onmousemove = function(e){
		var ev = e||event;

		var newl = ev.clientX - l;
		var newt = ev.clientY - t;
		var maxL = innerWidth - obox.offsetWidth;
		var maxT = innerHeight - obox.offsetHeight;

		newl = newl < 0?0:newl;
		newl = newl>=maxL?maxL:newl;
		newt = newt < 0?0:newt;
		newt = newt>=maxT?maxT:newt;

		obox.style.left = newl +'px'
		obox.style.top = newt +'px'

		speedY = ev.clientY - oldY;
		speedX = ev.clientX - oldX;
		oldY = ev.clientY;
		oldX = ev.clientX;
		
	}
	document.onmouseup = function(){
		this.onmousemove = this.onmouseup = null;
		startMove()
	}
	return false;
}

var ipt = obox.getElementsByTagName('input')[0];
var textarea = obox.getElementsByTagName('textarea')[0]
ipt.onmousedown = textarea.onmousedown = function(e){
	var ev = e||event
	ev.cancelBubble = true;
}


// 弹出
var alertNode = document.querySelector('.alertInfo');
var clickNode = document.querySelector('.clickAlert');
var main = document.querySelector('.main');
var fix = document.querySelector('.nav');
alertNode.onclick = function(){
	main.style.display = 'none';
	console.log(outNode)
	fix.style.display = 'none'
	outNode.style.transform='scale(1)';
}
clickNode.onclick = alertNode.onclick;
close.onclick = function(){
	main.style.display = 'block';
	console.log(outNode)
	fix.style.display = 'block'
	outNode.style.transform='scale(0)';
}
send.onclick = function(){
	close.onclick()
	return false;
}
outNode.onclick = function(e){
	var ev = e||event;
	ev.cancelBubble = true;
}
main.onclick = function(e){
	var ev = e||event;
	ev.cancelBubble = true;
}


// 添加动画  

var _self = document.querySelector('.self');
var _cont = document.querySelector('.self_cont');
var myPhoto = _cont.children[0].children[0];
var contInfo = _cont.children[1].children;

window.onscroll = function(){
	var t = document.body.scrollTop||document.documentElement.scrollTop;
	if((t+innerHeight)>=_self.getBoundingClientRect().top){
		for (var i = 0; i < _self.children.length; i++) {
			_self.children[i].classList.add('bounceInUp')
		}
	}
	if ((t+innerHeight)>=_cont.getBoundingClientRect().top) {
		myPhoto.classList.add('bounceInLeft');
		for (var i = 0; i < contInfo.length; i++) {
			contInfo[i].classList.add('bounceInRight')
		}
	}
}

// 技能详情展开

var open = document.querySelector('.skill>span')
var skillInfo = document.querySelector('.skillInfo')
var isOpen = true;
open.onclick = function(){
	if (isOpen) {	
		skillInfo.style.height = '635px';
		isOpen = false;
		for (var i = 0; i < skillInfo.children.length; i++) {
			if(i%2){
				skillInfo.children[i].classList.add('start')
			}
		}
	}else{
		skillInfo.style.height = '0px'
		isOpen = true;
		for (var i = 0; i < skillInfo.children.length; i++) {
			if(i%2){
				skillInfo.children[i].classList.remove('start')
			}
		}
	}
}

// 全屏滚动

var linkNode = fix.getElementsByTagName('a')

var aDiv = document.getElementsByClassName('content');
var scrollWin = true, timer = null;
 for (var i = 0; i < linkNode.length; i++) {
    linkNode[i].index = i;
    linkNode[i].onclick = function() {
        scrollWin = false;
        var _this = this;
        
        var _top = aDiv[_this.index].offsetTop-50;
        var _start = document.body.scrollTop;
        
        clearInterval(timer);
        var n=0;
        timer = setInterval(function() {
            if(scrollWin)clearInterval(timer);
            n++;
            
            var st = document.body.scrollTop;
            var speet = (_top - _start) / 20 * n;
            
            if(n==20){
                clearInterval(timer);
                scrollWin = true;
            }
            document.body.scrollTop = _start + speet;

        },10)
    }
}


