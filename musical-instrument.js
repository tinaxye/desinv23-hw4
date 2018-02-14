// A wind direction vector
var angle;
// Circle position
var windmag;
//Chime sounds
var chime1, chime2, chime3, chime4;
var chimes = [chime1, chime2, chime3, chime4];
// don't trigger new chimes if 'e' was pressed
var is_playing = false;

function preload() {
  for (var i = 1; i <= chimes.length; i += 1) {
    chimes[i-1] = loadSound('chime' + i + '.mp3');
  }
}


function setup() {
  createCanvas(720, 200);
  // Request the data from apixu.com
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=NYC';
  loadJSON(url, gotWeather);
}

function draw() {
  if (!is_playing) {
  	wait((60 * 60)/ windmag);
    playRate = 1 + windmag / 20.0;
    var randomIndex = random(0, chimes.length);
  	chimes[randomIndex].rate(playRate);
    chimes[randomIndex].play();
  }
  
}

function gotWeather(weather) {
  // Get the angle (convert to radians)
  angle = radians(Number(weather.current.wind_degree));
  // Get the wind speed
  windmag = Number(weather.current.wind_mph);
}

//if 's' is pressed, start playing; 
function keyPressed() {
	if (key == 's') {
    is_playing = true;
  }
  if (key == 'e') {
    for (var i = 0; i < chimes.length; i += 1) {
    	chimes[i].pause();
    }
    is_playing = false;
	}
}
  
//https://stackoverflow.com/questions/14226803/javascript-wait-5-seconds-before-executing-next-line
function wait(ms) {
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) { //noprotect
     end = new Date().getTime();
   }
}
