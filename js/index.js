(function(){
	var imgArr=['images/1.jpg',
				'images/2.jpg',
				'images/3.jpg',
				'images/4.jpg',
				'images/5.jpg',
				'images/6.jpg',
				'images/7.jpg',
				'images/8.jpg',
				'images/9.jpg',
				'images/happy_cover.jpg'
	];
	var dom=document.getElementById('precent');
	var loading=document.getElementById('loading');
	var text_der=document.querySelectorAll('.text-der');
	var text_der2=document.querySelectorAll('.text-der2');
	function loadingImg(imgArr,afterLoad){
		var num=0;
		var per=0;
		for(var i=0;i<imgArr.length;i++){
			var oimg=new Image();
			oimg.src=imgArr[i];
			oimg.onload=function(){
				num++;
				per=((num/imgArr.length).toFixed(2))*100+'%';
				//console.log(per)
				dom.innerHTML=per;
				if(num==imgArr.length){
					afterLoad();
				};
			};
		}
	}

	function printText(num){
		if(timer){
			clearInterval(timer);
		}
		if(text_der[num]){
			var text=text_der[num].innerHTML;
			text_der2[num].innerHTML='';
			var timer=null;
			var textArr=text.split('');
			var next=0;
			timer=setInterval(function(){
				next++;
				if(next==textArr.length){
					clearInterval(timer);
				}
				text_der2[num].innerHTML=text.substring(0,next);
			},200);

		}
		
	}
	//音乐播放
	function createAudio(){
		var audio=document.createElement('audio');
		audio.src='lovesong.mp3';
		var controlBtn=document.getElementById('music-btn')
		var audioArr=[];
		audioArr.push(audio);
		document.body.appendChild(audio);
		audioArr[0].load();
		audioArr[0].addEventListener('canplaythrough',function(){
			//alert('1')
			this.play();
			this.loop=true;
		},false);
		//console.log(controlBtn);
		controlBtn.addEventListener('touchstart',function(){
			if(controlBtn.className=='music-play'){
				controlBtn.className='music-pause';
				audioArr[0].pause();
			}else{
				controlBtn.className='music-play';
				audioArr[0].play();
			}
				
		});
	}
	
	loadingImg(imgArr,function(){
		loading.style.opacity=0;
		setTimeout(function(){
			loading.style.display='none';
			
			 var swiper = new Swiper('.swiper-container',{
		         direction: 'vertical',
		         onInit:function(swiper){
		         	createAudio();
		         	printText(swiper.activeIndex);
		         },
		         onSlideChangeStart:function(swiper){
		         	if(text_der2[swiper.activeIndex]){
		         		text_der2[swiper.activeIndex].innerHTML='';
		         	}
		         	
		         },
		         onSlideChangeEnd:function(swiper){
		         	printText(swiper.activeIndex);
		         }
			  });
			 //printText(0);
			
		},500);
	})
})();