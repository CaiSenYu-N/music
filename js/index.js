var musicList = [{
"src": "http://www.170mv.com/kw/other.web.ri01.sycdn.kuwo.cn/resource/n2/74/83/2952053681.mp3",
"title": "动物世界",
"auther": "薛之谦",
"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNbjm1RdwFNBDYrbmn-7EsHA25gp_TRv5OCS44kFTTt8uqhrWqw"
}, {
"src": "http://other.web.rf01.sycdn.kuwo.cn/resource/n2/66/79/3849065227.mp3",
"title": "匆匆那年",
"auther": "王菲",
"img": "http://pic1.win4000.com/wallpaper/9/538544aea5bd2.jpg"
}, {
"src": "http://other.web.nf01.sycdn.kuwo.cn/resource/n1/24/81/2042022841.mp3",
"title": "广东爱情故事",
"auther": "广东雨神",
"img": "http://pic.bizhi360.com/bpic/52/3552.jpg"
}, {
"src": "http://other.web.nf01.sycdn.kuwo.cn/resource/n1/32/94/1843537127.mp3",
"title": "体面",
"auther": "于文文",
"img": "http://d.5857.com/dmfjzm_140528/002.jpg"
},{
"src": "http://other.web.nf01.sycdn.kuwo.cn/resource/n2/48/71/2328512906.mp3",
"title": "伤情",
"auther": "吉克隽逸",
"img": "http://d.5857.com/dmfjzm_140528/009.jpg"
}]
var currentIndex = 0
var clock
var audio = new Audio()
audio.autoplay = true
getMusicList(function(list){
 musicList = list
 loadMusic(list[currentIndex])
 generateList(list)
})

//进度条实现
audio.ontimeupdate = function(){
 $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}
audio.onplay = function(){
 clock = setInterval(function(){
   var min = Math.floor(audio.currentTime/60)
   var sec = Math.floor(audio.currentTime)%60 + ''
   sec = sec.length === 2? sec : '0' + sec
   $('.musicbox .time').innerText = min + ':' + sec
 }, 1000)
}
audio.onpause = function(){
 clearInterval(clock)
}
audio.onended = function(){
 console.log('end')
 currentIndex =  (++currentIndex)%musicList.length
 loadMusic(musicList[currentIndex])
}

//播放、暂停实现
$('.musicbox .play').onclick = function(){
 if(audio.paused){
   audio.play()
   this.querySelector('.fa').classList.remove('fa-play')
   this.querySelector('.fa').classList.add('fa-pause')
 }else {
   audio.pause()
   this.querySelector('.fa').classList.add('fa-play')
   this.querySelector('.fa').classList.remove('fa-pause')
 }
}

//上一首、下一首
$('.musicbox .forward').onclick = function(){
 currentIndex =  (++currentIndex)%musicList.length
 loadMusic(musicList[currentIndex])
}
$('.musicbox .back').onclick = function(){
 currentIndex =  (musicList.length + --currentIndex)%musicList.length
 loadMusic(musicList[currentIndex])
}
$('.musicbox .bar').onclick = function(e){
 console.log(e)
 var percent = e.offsetX / parseInt(getComputedStyle(this).width)
 console.log(percent)
 audio.currentTime = audio.duration * percent
}
function $(selector){
 return document.querySelector(selector)
}

//封装AJAX
function getMusicList(callback){
 var xhr = new XMLHttpRequest()
 xhr.open('GET', 'musicList', true)
 xhr.onload = function(){
   if((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
     callback(JSON.parse(this.responseText))
   }else {
     console.log('获取数据失败')
   }
 }
 xhr.onerror = function(){
   console.log('网络异常')
 }
 xhr.send()
}
function loadMusic(musicObj){
 console.log('begin play ', musicObj)
 $('.musicbox .title').innerText = musicObj.title
 $('.musicbox .auther').innerText = musicObj.auther
 $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'
 audio.src = musicObj.src
}
function generateList(list){
}
