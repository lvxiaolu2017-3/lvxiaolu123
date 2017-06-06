
//->动态计算REM的换算比例
function freshRem() {
    var desW = 750,
        winW = document.documentElement.clientWidth,
        ratio = winW / desW;
    document.documentElement.style.fontSize = ratio * 100 + 'px'
}
freshRem();
window.addEventListener('resize', freshRem);

//->给滑屏区域进行初始化设置
~function () {
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
       onTransitionEnd:function (swiper) {
           var slides=swiper.slides,
               curIndex=swiper.activeIndex,
               total=slides.length,
               targetId='page0';
           switch (curIndex){
               case 0:
                   targetId+=total-2;
                   break;
               case total-1:
                   targetId+=1;
                   break;
               default:
                   targetId+=curIndex
           }
           [].forEach.call(slides,function (item,index) {
               if (index===curIndex){
                   item.id=targetId
               }else{
                   item.id=null;
               }
           })
       }
    });
}();
//->音频的自动播放
~function () {
    var audioBox = document.querySelector(".audio"),
        myAudio = audioBox.getElementsByTagName("audio")[0];

    //->延时播放音频文件,先让其他的内容加载
    window.setTimeout(function () {
        myAudio.play();
        myAudio.addEventListener("canplay", function () {
            //->当音频可以播放的时候触发这个事件
            audioBox.style.display = "block";
            audioBox.className += " audioMove";
        }, false);
    }, 1000);

    //->点击音乐图标,实现音频的暂停或者播放
    audioBox.addEventListener("click", function () {
        if (myAudio.paused) {//->当前是暂停的,我让其播放
            myAudio.play();
            audioBox.className = "audio audioMove";
            return;
        }
        //->当前是播放的,我让其暂停
        myAudio.pause();
        audioBox.className = "audio";
    }, false);
}();
