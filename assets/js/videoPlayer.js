const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video")
const playBtn =document.getElementById("jsPlayButton");
const volumBtn = document.getElementById("jsVolumButton");
const fullScrnBtn =document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML='<i class="i fas fa-pause">';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML='<i class="i fas fa-play">';
    }
}

function handleVolumClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumBtn.innerHTML='<i class="fas fa-volume-up"></i>';
    }else{
        videoPlayer.muted=true;
        volumBtn.innerHTML='<i class="fas fa-volume-mute"></i>';
        
    }
}

  
//



function exitFullScreen(){
    fullScrnBtn.innerHTML='<i class="fas fa-expand"></i>';
    fullScrnBtn.addEventListener("click",goFullScreen);

    if(document.exitFullscreen){
        document.exitFullscreen();
    }
    else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }
    else if(document.webkitExitFullScreen){
        document.webkitExitFullscreen();
    }
    else if(document.msExitFullScreen){
        document.msExitFullscreen();
    }
}
function goFullScreen(){
    if(videoContainer.requestFullScreen){
        videoContainer.requestFullScreen();
    }
    else if(videoContainer.mozCancelRequestFullScreen){
        videoContainer.mozCancelRequestFullScreen();
    }
    else if(videoContainer.webkitRequestFullScreen){
        videoContainer.webkitRequestFullScreen();
    }
    else if(videoContainer.msCancelRequestFullScreen){
        videoContainer.msRequestFullScreen();
    }
    
    fullScrnBtn.innerHTML='<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click",goFullScreen);
    fullScrnBtn.addEventListener("click",exitFullScreen);
}


const formatDate = seconds =>{
    const secondsNumber = parseInt(seconds,10);
    let hours = Math.floor(secondsNumber/3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) /60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes *60;
    
    if(hours<10){
        hours= `0${hours}`
    }
    if(minutes<10){
        minutes=`0${minutes}`
    }
    if(totalSeconds<10){
        totalSeconds = `0${totalSeconds}`
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime(){
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}


function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
totalTime.innerHTML=totalTimeString;
setInterval(getCurrentTime, 1000);
}

function init(){
    playBtn.addEventListener("click",handlePlayClick);
    volumBtn.addEventListener("click",handleVolumClick);
    fullScrnBtn.addEventListener("click",goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    
 
}
if(videoContainer){
    init();
}


