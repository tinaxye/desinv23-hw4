var freqs = [130, 146, 164, 174, 196, 220, 246, 261];
var oscs = [];
var octave = 1;
var range = 0;

var names = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'];
var piano = ['f', 'g', 'a', 'b', 'c'];
var playing = [false, false, false, false, false, false, false, false];
var keyPress = [false, false, false, false, false, false, false, false];
var lengths = [0, 0, 0, 0, 0, 0, 0, 0];

function setup() {
  print(typeof names);
  createCanvas(playing.length * 100, 300);
  textAlign(CENTER);
  noStroke();
  
  for (var i = 0; i < freqs.length; i += 1) {
    append(oscs, new p5.Oscillator());
    oscs[i].setType('triangle');
    oscs[i].freq(freqs[i]);
    oscs[i].amp(0);
    oscs[i].start();
  }
}

function draw() {
  background('lightgray');
  for (var i = 0; i < playing.length; i += 1) {
    push();
    stroke('gray');
    line(50 + 100 * i, 40, 50 + 100 * i, height/2 - 20);
    pop();
    colorMode(HSB);
    if (keyPress[i]) {
      fill((360/playing.length) * (i+1), 75, 50);
    	ellipse(50 + 100 * i, height/2 - 20 + lengths[i], 40, 40);
      if (lengths[i] > - (height/2 - 60))
      	lengths[i] -= 1;
    } else {
      fill('gray');
      if (lengths[i] < 0)
      	lengths[i] += 5;
    	ellipse(50 + 100 * i, height/2 - 20 + lengths[i], 40, 40);
    }
    text(names[i], 50 + 100 * i, height - 100);
	}
	push();
		stroke('gray');
		fill('gray');
		line(width/2 - 3 * width/8, height - 50, width/2 + 3 * width/8, height - 50);
		ellipse(width/2 + range * width/8, height - 50, 20, 20);
	pop();
	fill('gray');
	text('8va | Scroll', width/2, height - 20);
	text('-', width/2 - 3 * width/7, height - 46);
	text ('+', width/2 + 3 * width/7, height - 46);
}

function mouseWheel(event) {
	if (event.delta > 0) {
		if (octave > 1/8) {
			octave /= 2
			range -= 1
		}
	} else if (event.delta <= 0) {
		if (octave < 8) {
			octave *= 2
			range += 1
		}
	}
	for (var i = 0; i < freqs.length; i += 1) {
		oscs[i].freq(freqs[i] * octave);
	}
}

function keyPressed() {
  print("got key press for ", key);
  var index;
  if (key == 'A') {
    index = 0;
  } else if (key == 'S') {
    index = 1;
  } else if (key == 'D') {
    index = 2;
  } else if (key == 'F') {
    index = 3;
  } else if (key == 'G') {
    index = 4;
  } else if (key == 'H') {
    index = 5;
  } else if (key == 'J') {
    index = 6;
  } else if (key == 'K') {
    index = 7;
  }
  if (oscs[index]) {
    oscs[index].amp(0.5, 0.1);
    playing[index] = true;
    keyPress[index] = true;
  }
}

function keyReleased() {
  print("got key release for ", key);
  var index;
  if (key == 'A') {
    index = 0;
  } else if (key == 'S') {
    index = 1;
  } else if (key == 'D') {
    index = 2;
  } else if (key == 'F') {
    index = 3;
  } else if (key == 'G') {
    index = 4;
  } else if (key == 'H') {
    index = 5;
  } else if (key == 'J') {
    index = 6;
  } else if (key == 'K') {
    index = 7;
  }
  if (oscs[index]) {
    oscs[index].amp(0, 0.5);
    playing[index] = false;
    keyPress[index] = false;
  }
}
