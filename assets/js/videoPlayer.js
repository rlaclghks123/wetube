const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video")
const playBtn =document.getElementById("jsPlayButton");
const volumBtn = document.getElementById("jsVolumButton");
const fullScrnBtn =document.getElementById("jsFullScreen");

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

function exitFullScreen(){
    fullScrnBtn.innerHTML='<i class="fas fa-expand"></i>';
    fullScrnBtn.removeEventListener("click",exitFullScreen);
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

function init(){
    playBtn.addEventListener("click",handlePlayClick);
    volumBtn.addEventListener("click",handleVolumClick);
    fullScrnBtn.addEventListener("click",goFullScreen);
}
if(videoContainer){
    init();
}