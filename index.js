const music = new Audio("assets/music/alagaasmaan.mp3");

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];

masterPlay.addEventListener("click", function () {
   if (music.paused || music.currentTime <= 0) {
      music.play();
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
   } else {
      music.pause();
      masterPlay.classList.add("bi-play-fill");
      masterPlay.classList.remove("bi-pause-fill");
      wave.classList.remove("active2");
   }
});

const makeAllPlays = function () {
   Array.from(document.getElementsByClassName("playListPlay")).forEach(
      function (element) {
         element.classList.add("bi-play-circle-fill");
         element.classList.remove("bi-pause-circle");
      }
   );
};
const makeAllBackgrounds = function () {
   Array.from(document.getElementsByClassName("songItem")).forEach(function (
      element
   ) {
      element.style.background = "rgb(105,105,170,0)";
   });
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");

Array.from(document.getElementsByClassName("playListPlay")).forEach(function (
   element
) {
   element.addEventListener("click", function (e) {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle");
      music.src = "assets/music/" + index + ".mp3";
      poster_master_play.src = "assets/imgs/" + index + ".jpg";
      music.play();
      let song_title = songs.filter(function (ele) {
         return ele.id == index;
      });

      song_title.forEach(function (ele) {
         let { songName } = ele;
         title.innerHTML = songName;
      });
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      music.addEventListener("ended", function () {
         masterPlay.classList.add("bi-play-fill");
         masterPlay.classList.remove("bi-pause-fill");
         wave.classList.remove("active2");
      });
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName("songItem"))[
         "${index-1}"
      ].style.background = "rgb(105,105,170,0.1)";
   });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", function () {
   let music_curr = music.currentTime;
   let music_dur = music.duration;

   let min = Math.floor(music_dur / 60);
   let sec = Math.floor(music_dur % 60);
   if (sec < 10) {
      sec = "0" + sec;
   }
   currentEnd.innerText = min + ":" + sec;

   let min1 = Math.floor(music_curr / 60);
   let sec1 = Math.floor(music_curr % 60);
   if (sec1 < 10) {
      sec1 = "0" + sec1;
   }
   currentStart.innerText = min1 + ":" + sec1;

   let progressbar = parseInt((music.currentTime / music.duration) * 100);
   seek.value = progressbar;
   let seekbar = seek.value;
   bar2.style.width = seekbar + "%";
   dot.style.left = seekbar + "%";
});

seek.addEventListener("change", function () {
   music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", function () {
   masterPlay.classList.remove("bi-play-fill");
   masterPlay.classList.add("bi-pause-fill");
   wave.classList.add("active2");
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];

vol.addEventListener("change", function () {
   if (vol.value == 0) {
      vol_icon.classList.remove("bi-volume-down-fill");
      vol_icon.classList.add("bi-volume-mute-fill");
      vol_icon.classList.remove("bi-volume-up-fill");
   }
   if (vol.value > 0) {
      vol_icon.classList.add("bi-volume-down-fill");
      vol_icon.classList.remove("bi-volume-mute-fill");
      vol_icon.classList.remove("bi-volume-up-fill");
   }
   if (vol.value > 50) {
      vol_icon.classList.remove("bi-volume-down-fill");
      vol_icon.classList.remove("bi-volume-mute-fill");
      vol_icon.classList.add("bi-volume-up-fill");
   }

   let vol_a = vol.value;
   vol_bar.style.width = vol_a + "%";
   vol_dot.style.left = vol_a + "%";
   music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", function () {
   index -= 1;
   if (index < 1) {
      index = Array.from(document.getElementsByClassName("songItem")).length;
   }
   music.src = "assets/music/" + index + ".mp3";
   poster_master_play.src = "assets/imgs/" + index + ".jpg";
   music.play();
   let song_title = songs.filter(function (ele) {
      return ele.id == index;
   });

   song_title.forEach(function (ele) {
      let { songName } = ele;
      title.innerHTML = songName;
   });
   makeAllPlays();
   document.getElementById(index).classList.remove("bi-play-fill");
   document.getElementById(index).classList.add("bi-pause-fill");
   wave.classList.add("active2");
   makeAllBackgrounds();
   Array.from(document.getElementsByClassName("songItem"))[
      "${index-1}"
   ].style.background = "rgb(105,105,170,0.1)";
});

next.addEventListener("click", function () {
   index -= 0;
   index += 1;
   if (index > Array.from(document.getElementsByClassName("songItem")).length) {
      index = 1;
   }
   music.src = "assets/music/" + index + ".mp3";
   poster_master_play.src = "assets/imgs/" + index + ".jpg";
   music.play();
   let song_title = songs.filter(function (ele) {
      return ele.id == index;
   });

   song_title.forEach(function (ele) {
      let { songName } = ele;
      title.innerHTML = songName;
   });
   makeAllPlays();
   document.getElementById(index).classList.remove("bi-play-fill");
   document.getElementById(index).classList.add("bi-pause-fill");
   wave.classList.add("active2");
   makeAllBackgrounds();
   Array.from(document.getElementsByClassName("songItem"))[
      "${index-1}"
   ].style.background = "rgb(105,105,170,0.1)";
});

let left_scroll = document.getElementById("left_scroll");
let right_scroll = document.getElementById("right_scroll");
let pop_song = document.getElementsByClassName("pop_song")[0];

left_scroll.addEventListener("click", function () {
   pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener("click", function () {
   pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", function () {
   item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", function () {
   item.scrollLeft += 330;
});

const songs = [
   {
      id: "kesariya",
      songName: ' Kesariya <br/><div class="subtitle">Arijit Singh</div>',
      poster: "assets/imgs/kesariya.jpg",
   },
   {
      id: "pasoori",
      songName: 'Pasoori<div class="subtitle">Ali Sethi and Shae Gill</div>',
      poster: "assets/imgs/pasoori.jpg",
   },
   {
      id: "headinghome",
      songName: ' Heading Home<div class="subtitle">Alan Walker</div>',
      poster: "assets/imgs/headinghome.jpg",
   },
   {
      id: "srivalli",
      songName: ' Srivalli <div class="subtitle">Pushpa</div>',
      poster: "assets/imgs/srivalli.jpg",
   },
   {
      id: "holdon",
      songName: ' Hold On <div class="subtitle">Justin Beiber</div>',
      poster: "assets/imgs/holdon.jpg",
   },
   {
      id: "alagaasmaan",
      songName: ' Alag Aasmaan <br /><div class="subtitle">Anuv Jain</div>',
      poster: "assets/imgs/alagaasmaan.jpg",
   },
   {
      id: "bhoolbhulaiya",
      songName:
         ' Bhool Bhulaiya 2<br />      <div class="subtitle">         Pritam Chakraborty and Tanishk Bagchi      </div>',
      poster: "assets/imgs/bhoolbhulaiya.jpg",
   },
   {
      id: "pehlidafa",
      songName:
         ' Pehli Dafa <br />      <div class="subtitle">Atif Aslam</div>',
      poster: "assets/imgs/pehlidafa.jpg",
   },
   {
      id: "aziyat",
      songName: ' Aziyat <br />      <div class="subtitle">Pratsofficial</div>',
      poster: "assets/imgs/aziyat.jpg",
   },
   {
      id: "chaandbaaliyan",
      songName:
         'ChaandBaaliyan <br />      <div class="subtitle">Aditya A</div>',
      poster: "assets/imgs/chaandbaaliyan.jpg",
   },

   {
      id: "countingstars",
      songName:
         'Counting Stars <br />      <div class="subtitle">OneRepublic</div>',
      poster: "assets/imgs/countingstars.jpg",
   },

   {
      id: "rangisaari",
      songName:
         ' Rangisaari <br />      <div class="subtitle">Kavita Seth, Kanishk Seth</div>',
      poster: "assets/imgs/rangisaari.jpg",
   },

   {
      id: "stereohearts",
      songName:
         ' Stereo Hearts <br />      <div class="subtitle">Gym Class Heroes</div>',
      poster: "assets/imgs/stereohearts.jpg",
   },

   {
      id: "waktkibaatien",
      songName:
         'Wakt Ki Baatien <br />      <div class="subtitle">Dream Note</div>',
      poster: "assets/imgs/waktkibaatien.jpg",
   },

   {
      id: "mairangsharbatonka",
      songName:
         'Main Rang Sharbaton Ka <br />      <div class="subtitle">Atif Aslam</div>',
      poster: "assets/imgs/mairangsharbatonka.jpg",
   },
];

// Array.from(document.getElementsByClassName("songItem")).forEach(function (
//    ele,
//    i
// ) {
//    ele.getElementsByTagName("img")[0].src = songs[i].poster;
//    ele.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
// });
