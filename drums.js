let func = {
  bank1: [
    ["Heater 1", "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"],
    ["Heater 4", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"],
    [
      "Kick n' Hat",
      "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    ],
    ["Heater 2", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"],
    ["Clap", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"],

    ["Kick", "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"],

    ["Heater 3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"],
    ["Open HH", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"],

    ["Closed HH", "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"],
  ],
  bank2: [
    ["Chord 1", "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"],
   
   
    [
      "Shaker",
      "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    ],
    
   [
      "Punchy kick",
      "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    ],
    
    ["Chord 2", "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"],
    
     
    ["Open HH", "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"],
    
    [
      "Side stick",
      "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    ],
    
    
    ["Chord 3", "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"],
    
    ["Closed HH", "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"],
    
    ["Snare", "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"],
  ],
  keyCodes: [81, 65, 90, 87, 83, 88, 69, 68, 67],
};

let sound = document.getElementsByTagName("audio")[0],
  display = document.getElementById("display"),
  music = func.bank1,
  volume = document.getElementById("volume"),
  drumPads = document.getElementsByClassName(" drum-pad");

Power("on");
function Power(a) {
  if (a === "on") {
    volume.addEventListener("input", vol);
  } else {
    volume.removeEventListener("input", vol);
  }
  for (let i = 0; i < drumPads.length; i++) {
    if (a === "on") {
      document.getElementById("display").style.background = "#84ceeb";
      document.addEventListener("keydown", keyPress);
      drumPads[i].dataset.index = i;
      drumPads[i].addEventListener("click", whenClick);
    } else {
      document.getElementById("display").style.background = "#181818";
      document.removeEventListener("keydown", keyPress);
      drumPads[i].removeEventListener("click", whenClick);
      displayClear(500);
    }
  }
}

function keyPress(e) { 
  let i = func.keyCodes.indexOf(e.keyCode);
  if (e.keyCode === func.keyCodes[i]) {
    display.innerHTML = music[i][0];
    sound.src = music[i][1];
    sound.play();
    drumPads[i].style.background = "#FC4445";
    bg(i);
  }
}

function whenClick(e) {
  const i = e.currentTarget.dataset.index;
  drumPads[i].style.background = "#FC4445";
  display.innerHTML = music[i][0];
  sound.src = music[i][1];
  sound.play();
  bg(i);
}

function vol(e) {
  sound.volume = e.target.value;
  display.innerHTML = `Volume:${Math.round(e.target.value * 100)}%`;
  displayClear(2000);
}

function bg(i) {
  setTimeout(() => {
    drumPads[i].style.background = "";
  }, 100);
}

function displayClear(t) {
  setTimeout(() => {
    display.innerHTML = "";
  }, t);
}

let togglePower = document.getElementById("power");
let toggleBank = document.getElementById("bank");

$(document).ready(() => {
  togglePower.style.float = "right";
  $("#toggle-power").on("click", function () {
    if (togglePower.style.float !== "left") {
      $("#power").css("float", "left");
      $("#power").css("background", "#950740");
      Power("off");
    } else {
      $("#power").css("float", "right");
      $("#power").css("background", "#116466");
      Power("on");
    }
  });
  $("#toggle-bank").on("click", function () {
    if (toggleBank.style.float !== "right" && music === func.bank1) {
      $("#bank").css("float", "right");
      $("#bank").text("2");
      music = func.bank2;
    } else {
      $("#bank").css("float", "left");
      $("#bank").text("1");
      music = func.bank1;
    }
  });
});
