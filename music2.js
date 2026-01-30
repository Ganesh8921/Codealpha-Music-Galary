const songs = [
 { title:"Finding Her", artist:"Tanishka Bahl", src:"Finding Her (Female Version) _ Tanishka Bahl Kushagra Bharath Saaheal UR Debut.mp3" },
 { title:"Dhadkan (Slowed Reverb)", artist:"LoFi Mix", src:"dhadkan.mp3" },
 { title:"Dil Cheez Tujhe Dedi", artist:"Ankit Tiwari, Arijit Singh", src:"dil-cheez.mp3" },
  { title:"Madhurashtakam", artist:"Radha Krishna LoFi", src:"madhurashtakam.mp3" },
 { title:"Nasha x Let The Music Play", artist:"Mashup LoFi", src:"nasha.mp3" },
 { title:"Dil Mera tod Ke ", artist:"Sad Mashup LoFi", src:"dil-mera.mp3" }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const container = document.getElementById("progress-container");
const volume = document.getElementById("volume");
const current = document.getElementById("current-time");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playIcon = document.getElementById("playIcon");

loadSong(index);
createPlaylist();

function loadSong(i){
 title.innerText = songs[i].title;
 artist.innerText = songs[i].artist;
 audio.src = songs[i].src;
 audio.load();              // <-- important
 playIcon.className = "fas fa-play";
 updateActive();
}


function playPause(){
 if(audio.paused){
  audio.play();
  playIcon.className = "fas fa-pause";
 }else{
  audio.pause();
  playIcon.className = "fas fa-play";
 }
}

function nextSong(){
 index = (index + 1) % songs.length;
 loadSong(index);
}

function prevSong(){
 index = (index - 1 + songs.length) % songs.length;
 loadSong(index);
}

audio.addEventListener("timeupdate", () => {
 if (!audio.duration) return;
 const percent = (audio.currentTime / audio.duration) * 100;
 progress.style.width = percent + "%";
 current.innerText = format(audio.currentTime);
 duration.innerText = format(audio.duration);
});

audio.addEventListener("ended", nextSong);

container.addEventListener("click", e => {
 if (!audio.duration) return;
 const w = container.clientWidth;
 audio.currentTime = (e.offsetX / w) * audio.duration;
});

volume.addEventListener("input", () => {
 audio.volume = volume.value;
});

function format(t){
 let m = Math.floor(t / 60);
 let s = Math.floor(t % 60).toString().padStart(2,"0");
 return `${m}:${s}`;
}

function createPlaylist(){
 playlist.innerHTML = "";
 songs.forEach((s,i)=>{
  let li = document.createElement("li");
  li.innerText = s.title;
  li.onclick = () => { index = i; loadSong(i); };
  playlist.appendChild(li);
 });
}

function updateActive(){
 document.querySelectorAll("#playlist li").forEach((li,i)=>{
  li.classList.toggle("active", i === index);
 });
}

