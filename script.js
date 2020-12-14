const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sound
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  // length of Outline
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });
  
  //Select sound
  timeSelect.forEach((Option) => {
    Option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Stop & play sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "svg/play.svg";
    }
  };

  //Animated circle**
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    
    // Animate circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    
    // Animate time
    if (seconds < 10 && minutes < 10 ) {
    timeDisplay.textContent = `${0}${minutes}:${0}${seconds}`;
} else {
        timeDisplay.textContent = `${minutes}:${seconds}`;}

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "svg/play.svg";
      video.pause();
    }
  };
};

app();
