var slideBox = document.getElementsByClassName('slideBox')[0],
	dotBox = document.getElementsByClassName('dotBox')[0],
	slideEle = slideBox.children,
	dotEle = dotBox.children,
    curIndex = 0,
	length = slideEle.length,
	canClick = true,
	orient = true,
	time = 1200;
//判断是否为当前页，不是则隐藏
for (var i=0;i<length;i++){
		dotEle[i].classList.add('dot_noli');
		if(slideEle[i] != slideEle[curIndex]){
			slideEle[i].classList.add('hide');		
		}else{
			dotEle[i].classList.add('dot_li');
		}
	}
//next函数
function next () {
	(function (i){
		$(dotEle[i]).removeClass('dot_li');
		$(slideEle[i]).animate(orient?{left:'-100%'}:{top:'-100%'},time,function(){
			$(slideEle[i]).css({left:'0%'}).addClass('hide');
		});
	})(curIndex);
	++curIndex;
	if (curIndex == length){
		curIndex = 0;
	}
	
	$(slideEle[curIndex]).css(orient?{left:'100%'}:{top:'100%'}).removeClass('hide').animate(orient?{left:'0%'}:{top:'0%'},time,function(){
		canClick = true;
	});
	$(dotEle[curIndex]).addClass('dot_li');
}
//pre函数
function pre () {
	(function (i){
		$(slideEle[i]).animate(orient?{left:'100%'}:{top:'100%'},time,function(){
		$(slideEle[i]).css(orient?{left:'0%'}:{top:'0%'}).addClass('hide');
	});
	})(curIndex);		
	--curIndex;
	if (curIndex < 0){
		curIndex = length-1;
	}
	$(slideEle[curIndex]).css(orient?{left:'-100%'}:{top:'-100%'}).removeClass('hide').animate(orient?{left:'0%'}:{top:'0%'},time,function(){
		canClick = true;
	});
}
var isCan = true;
$('.dot').on('click',function(){
	if(!isCan){
		return;
	}
	clearInterval(timeId);
	isCan = false;
	var s = $(this).index();
	goToPage(s);
	
})
function goToPage (end) {
	if(curIndex == end) return;
	$(dotEle[curIndex]).removeClass('dot_li');
	if (curIndex < end){
		(function(i){
		$(slideEle[curIndex]).animate(orient?{left:'-100%'}:{top:'-100%'},time,function (){
			$(slideEle[i]).css(orient?{left:'0%'}:{top:'0%'}).addClass('hide');
		});
		})(curIndex);
		curIndex = end;
		$(dotEle[curIndex]).addClass('dot_li');
		(function(i){
			$(slideEle[curIndex]).css(orient?{left:'100%'}:{top:'100%'}).removeClass('hide').animate(orient?{left:'0%'}:{top:'0%'},time,function(){
			 isCan = true;
			 timeId = setInterval(next,3000);
			});
		})(curIndex);	
	}else {
		(function (i){
				$(slideEle[i]).animate(orient?{left:'100%'}:{top:'100%'},time,function (){
				$(slideEle[i]).css(orient?{left:'0%'}:{top:'0%'}).addClass('hide');
			});
		})(curIndex);	
		curIndex = end;
		$(dotEle[curIndex]).addClass('dot_li');
		(function(i){
				$(slideEle[i]).css(orient?{left:'-100%'}:{top:'-100%'}).removeClass('hide').animate(orient?{left:'0%'}:{top:'0%'},time,function(){
					isCan = true;
					timeId = setInterval(next,3000);
				});
		})(curIndex);
		
	}
}
var timeId = setInterval(next,3000);
var oT = $('.act').map(function(){
	return $(this).offset().top;
});
//var oH = $('.act').map(function(){
//	return $(this).outerHeight();
//});
var len = oT.length,
	winH = $(window).height();
$(window).scroll(function(e) {
	for(var i = 0 ; i < len ; i++){
		if($(this).scrollTop() >= oT[i] - 300){
			$('.act').eq(i).find('img').addClass('active');
		}else{
			$('.act').eq(i).find('img').removeClass('active');
		}
	}
		
})
//- winH + oH[i]