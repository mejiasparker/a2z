staffobject = {

  "cc": [329.63, 104],
  "cd": [392, 84],
  "dt": [440, 74],
  "ex": [493.88, 64],
  "fw": [587.33, 44],
  "in": [329.63, 104],
  "jj": [392, 84],
  "jjr": [440, 74],
  "jjs": [493.88, 64],
  "ls": [587.33, 44],
  "md": [329.63, 104],
  "nn": [392, 84],
  "nns": [440, 74],
  "nnp": [493.88, 64],
  "nnps": [587.33, 44],
  "pdt": [329.63, 104],
  "pos": [392, 84],
  "prp": [440, 74],
  "prp$": [493.88, 64],
  "rb": [587.33, 44],
  "rbr": [329.63, 104],
  "rbs": [392, 84],
  "rp": [440, 74],
  "sym": [493.88, 64],
  "to": [587.33, 44],
  "uh": [329.63, 104],
  "vb": [392, 84],
  "vbd": [440, 74],
  "vbg": [493.88, 64],
  "vbn": [587.33, 44],
  "vbp": [329.63, 104],
  "vbz": [392, 84],
  "wdt": [440, 74],
  "wp": [493.88, 64],
  "wp$": [587.33, 44],
  "wrb": [329.63, 104]
  
};

function setup() {
  
  let div = select('#results');
  
  canvas = createCanvas(windowWidth,120);
  canvas.parent(div);
  canvas.style('z-index','-1');
  
  
  line(0,20,windowWidth,20);
  line(0,40,windowWidth,40);
  line(0,60,windowWidth,60);
  line(0,80,windowWidth,80);
  line(0,100,windowWidth,100);
  
//   fill(0, 102, 153);
  
//   text("E", 0, 104);
//   text("G", 0, 84);
//   text("A", 0, 74);
//   text("B", 0, 64);
//   text("D", 0, 44);
  

// select text input field
input = select('#sentence');
  
let submitbutton = select('#submit');
submitbutton.mousePressed(createSpans);
  
let clearbutton = select('#clear');
clearbutton.mousePressed(clearP);
  
  function clearP(){

    let textresult = select('#results');
    // textresult.style('border-style', 'hidden');
    textresult.html('');
    canvas.parent(textresult);
  	canvas.style('z-index','-1');

  }

  function createSpans(){
    
    let string = input.value();
    string = string.replace(/[.,:;!'@"#$%&*()\n?]+/g, '');
    let wordarray = string.split(' ');

    let textresult = select('#results');
    // textresult.class('text');
    // textresult.style('border-style', 'solid');
    
    let spanwidths = [];
    let x = 0;

    for (let i=0; i < wordarray.length; i++){
      let rs = new RiString(wordarray[i]);
      let partofspeech = rs.pos();
      
      
      let span = createSpan(wordarray[i]);
      
      spanwidths.push(span.width);
      span.parent(textresult);

      if (i == 0){
        span.position(40, (staffobject[partofspeech][1] + 85));
          } 
      else {
        x = x + spanwidths[i-1];
        span.position(i * 10 + x + 40, (staffobject[partofspeech][1] + 85));
      }

      span.mouseOver(highlight);
      span.mouseOut(unhighlight);
      span.mousePressed(clickWord);

    }
  }
  
context = new (window.AudioContext || window.webkitAudioContext)();
  
  function clickWord() {
    let word = this.html();

    let rs = new RiString(word);
    let partofspeech = rs.pos();


    let osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = staffobject[partofspeech][0]; // Hz
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
  
}
