/* This instrument auto-generates a series of chimes, 
played in various different ways dependent on the JSON 
data from NYC weather. Press 's' to start the instrument, 
and 'e' to pause. 
Playable link: http://alpha.editor.p5js.org/tinaye/sketches/Bk9NnIZDG
*/

// A wind direction vector
var angle;
// Circle position
var windmag = 0.0;
//Chime sounds
var chime1, chime2, chime3, chime4;
var chimes;
// don't trigger new chimes if 'e' was pressed
var is_playing = true;
var windowWidth;

function preload() {
  chimes = [];
  for (var i = 1; i < 5; i += 1) {
    append(chimes, loadSound('assets/chime' + i + '.mp3'));
  }
  // Request the data from apixu.com
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=NYC';
  loadJSON(url, gotWeather);
}


function setup() {
  createCanvas(500, 300);
  colorMode(RGB);
  background(255, 255, 255);
  colorMode(HSB);
  strokeWeight(10);
  windowWidth = width - 2 * (width / 5);
}

function draw() {
  push();
  colorMode(RGB);
  background('rgba(255, 255, 255, 0.2)');
  pop();
  if (is_playing) {
    waitTime = int(random(180, 330));
  	wait(waitTime);
    wait((250)/ (windmag+1) );
    playRate = 1 + windmag / 5.0;
    var randomIndex = int(random(0, chimes.length));
  	chimes[randomIndex].rate(playRate);
    chimes[randomIndex].play();
    fill(360 / 5 * randomIndex, 100, 80);
    line((width / 5) + (windowWidth / 5) * randomIndex, height / 2 - (20 * playRate), (width / 5) + (windowWidth / 5) * randomIndex, height/2 + (20 * playRate));
  }
  push();
  noStroke();
  fill('gray');
  text('p - play | e - pause', width/2, height - 40);
  pop();
}

function gotWeather(weather) {
  // Get the angle (convert to radians)
  angle = radians(Number(weather.current.wind_degree));
  // Get the wind speed
  windmag = Number(weather.current.wind_mph);
}

//if 's' is pressed, start playing; 
function keyPressed() {
	if (key == 'S') {
    is_playing = true;
  }
  if (key == 'E') {
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
