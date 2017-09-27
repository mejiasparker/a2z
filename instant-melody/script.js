function setup() {

noCanvas();

// select text input field
  
  

input = select('#sentence');
  
let submitbutton = select('#submit');
submitbutton.mousePressed(createSpans);
  
let clearbutton = select('#clear');
clearbutton.mousePressed(clearP);
  
function clearP(){
  
  let textresult = select('#results');
  textresult.style('border-style', 'hidden');
  textresult.html('');
  
}

function createSpans(){
  let string = input.value();
  string = string.replace(/[.,:;!@#$%&*()\n]+/, '');
  let wordarray = string.split(' ');

  //console.log(wordarray);

  let output = '';
  let textresult = select('#results');
  // textresult.class('text');
  // textresult.style('border-style', 'solid');
  
  //let par = createP(output).class('text');

  for (let i=0; i < wordarray.length; i++){
    let span = createSpan(wordarray[i]);
    span.parent(textresult);
    createSpan(' ').parent(textresult);

    span.mouseOver(highlight);
    span.mouseOut(unhighlight);
    span.mousePressed(clickWord);

  //if you want to chain it
  //createSpan(‘ ’).parent(‘id_name’);

  }
}

  
posobject = {
  "cd": 277.18,
  "dt": 293.66,
  "ex": 311.13,
  "fw": 329.63,
  "in": 349.23,
  "jj": 369.99,
  "jjr": 392,
  "jjs": 415.3,
  "ls": 440,
  "md": 466.16,
  "nn": 494,
  "nns": 523.25,
  "nnp": 554.37,
  "nnps": 587.33,
  "pdt": 622.25,
  "pos": 659.25,
  "prp": 698.46,
  "prp$": 739.99,
  "rb": 783.99,
  "rbr": 830.61,
  "rbs": 880,
  "rp": 932.33,
  "sym": 987.77,
  "to": 1046.5,
  "uh": 1108.73,
  "vb": 1174.66,
  "vbd": 1244.51,
  "vbg": 1318.51,
  "vbn": 1396.91,
  "vbp": 1479.98,
  "vbz": 1567.98,
  "wdt": 1661.22,
  "wp": 1760,
  "wp$": 1864.66,
  "wrb": 1975.53
};
  
pentaobject =  {
  "cd": 246.94,
  "dt": 293.66,
  "ex": 329.63,
  "fw": 392,
  "in": 440,
  "jj": 493.88,
  "jjr": 587.33,
  "jjs": 659.25,
  "ls": 783.99,
  "md": 880,
  "nn": 987.77,
  "nns": 1174.66,
  "nnp": 1318.51,
  "nnps": 1567.98,
  "pdt": 1760,
  "pos": 1975.53,
  "prp": 2349.32,
  "prp$": 2637.02,
  "rb": 2349.32,
  "rbr": 1975.53,
  "rbs": 1760,
  "rp": 1567.98,
  "sym": 1318.51,
  "to": 1174.66,
  "uh": 987.77,
  "vb": 880,
  "vbd": 783.99,
  "vbg": 659.25,
  "vbn": 587.33,
  "vbp": 493.88,
  "vbz": 440,
  "wdt": 392,
  "wp": 329.63,
  "wp$": 293.66,
  "wrb": 246.94
};
  
context = new (window.AudioContext || window.webkitAudioContext)();
  
function clickWord() {
  let word = this.html();
  
  let rs = new RiString(word);
  let partofspeech = rs.pos();
  

  let osc = context.createOscillator(); // instantiate an oscillator
  osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = pentaobject[partofspeech]; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + .5); // stop 2 seconds after the current time
  
  // console.log(word);
  // this.html('replace');
}

function highlight() {
  this.style('background-color', '#AAA');
}

function unhighlight() {
  this.style('background-color', 'transparent');
}
  
//   let lexicon = new RiLexicon();

//   // Make a text input field
//   input = select('#sentence');
//   // Make a submit button
//   let button1 = select('#pos');
//   button1.mousePressed(posSwap);
//   let button2 = select('#rhyme');
//   button2.mousePressed(rhymeSwap);

//   function posSwap() {
//     let sentence = input.value();
//     let rs = new RiString(sentence);
//     let pos = rs.pos();

//     let output = '';
//     for (let i = 0; i < pos.length; i++) {
//       output += lexicon.randomWord(pos[i]);
//       output += ' ';
//     }
//     createP(output).class('text');
//   }

//   function rhymeSwap() {
//     let sentence = input.value();
//     let output = sentence.replace(/\b\w+\b/g, replacer);
//     createP(output).class('text');
//     function replacer(match) {
//       let rhymes = lexicon.rhymes(match);
//       if (rhymes.length > 0) {
//         return random(rhymes);
//       } else {
//         return match;
//       }
//     }
//   }
}