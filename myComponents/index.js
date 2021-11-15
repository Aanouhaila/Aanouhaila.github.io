import './libs/webaudio-controls.js';

const getBaseURL = () => {
  return new URL('.', import.meta.url);
};
//timer
const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayCurrentTime = (player, timer) => {
  timer.innerHTML = calculateTime(player.currentTime);
}
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>

  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    }

  div.first {
    float: left;
    margin: 32px;
    border:1px solid;
    border-radius:15px;
    background-color:black;
    padding:10px;
    width:450px;
    height: 550px;
    box-shadow: 10px  0px 5px #f44336;
    text-align:center;
    font-family: "Open Sans";
    font-size: 12px;
  }

  *,*:after,*:before{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .text-blinking{
    font-size: 30px;
    color: #1a3470;
    text-align: center;
  }
  .text-blinking span{
    animation:TextBlinking 3s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
  .active{
    color: #0080ff;
    text-shadow: 0px 0px 20px #0652ff, 
    0px 0px 30px #0652ff, 
    0px 0px 40px #0652ff,
    0px 0px 50px #0652ff;
  }
  .text-blinking span:nth-child(1){animation-delay: 0s;}
  .text-blinking span:nth-child(2){animation-delay: 0.2s;}
  .text-blinking span:nth-child(3){animation-delay: 0.4s;}
  .text-blinking span:nth-child(4){animation-delay: 0.6s;}
  .text-blinking span:nth-child(5){animation-delay: 0.8s;}
  .text-blinking span:nth-child(6){animation-delay: 1s;}
  .text-blinking span:nth-child(7){animation-delay: 1.2s;}
  .text-blinking span:nth-child(8){animation-delay: 1.4s;}
  .text-blinking span:nth-child(9){animation-delay: 1.6s;}
  .text-blinking span:nth-child(10){animation-delay: 1.8s;}
  .text-blinking span:nth-child(11){animation-delay: 2s;}
  .text-blinking span:nth-child(12){animation-delay: 2.2s;}
    
  @keyframes TextBlinking{
    0%{
      color: #1a3470;
      text-shadow: none;
    }
    4%{
      color: #0080ff;
      text-shadow: 0px 0px 20px #0652ff, 
      0px 0px 30px #0652ff, 
      0px 0px 40px #0652ff,
      0px 0px 50px #0652ff;
    }
    5%{
      color: #1a3470;
      text-shadow: none;
    }
    100%{
      color: #1a3470;
      text-shadow: none;
    }
  
  }
  
  canvas {
    margin-top:30px;
    margin-left:10px;
    margin-right:10px;
    margin-bottom:10px;
    border:1px solid black;
    background-color: 	#181818;
      

  }
  #timer{
    margin-top:130px;
    text-align: center;
    color:white;
    margin-top: 150px;
    font-size: 15px;
  }

  button{
    background-color: black; 
    border-color: black;
    margin-bottom:20px;
    margin-left: 15px;
  }
  div.controls:hover {
    color: #FFD700;
    font-weight:bold;
  }
  div.controls label {
    display: inline-block;
    text-align: center;
    width: 50px;
    color:white;
  }

  
  div.controls label, div.controls input, output {
    
    vertical-align: middle;
      padding: 0;
      margin: 1px;
     font-family: "Open Sans",Verdana,Geneva,sans-serif,sans-serif;}


     div.live{
      position: absolute;
      background: #f44336;
      padding: 5px;
      width: 455px;
      margin-right: 500px;
      margin-top: 584px;
      color:#fff;
      border-bottom: 7px solid #f44336;
      border-radius: 100px;
      box-shadow: black 10px 10px 20px;
    }
  .live marquee{
    position: absolute;
      width: 260px;
      font-size: 13px;
  
    }
    input[type=range].pro{
      -webkit-appearance: none;     
      padding: 0;                   
      font: inherit;                
      outline: none;
      color: #069;                  
      opacity: .8;
      background: #FFD700;             
      box-sizing: border-box;      
      transition: opacity .2s;
      cursor: pointer;
    }
    input[type=range].pro::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 10px;
      height: px;
      background: #FFFFFF;
      cursor: pointer;
    }
    

    input[type=range]{
    
      -webkit-appearance: none;     
      padding: 0;                   
      font: inherit;                
      outline: none;
      color: #069;                  
      opacity: .8;
      background: white;             
      box-sizing: border-box;      
      transition: opacity .2s;
      cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 12px;
      background: #FFD700;
      cursor: pointer;
    }

    #progress_bar {
      height: 5px;
      width: 200px;
      background-color: white;
      margin-top: 10px;
      margin-left: 120px;
      margin-right: 50px;

  }

  #bprogress {
      height: 5px;
      background-color: #FFD700 ;
      width: 0%;
      transition: all 1s;
      position: relative;
  }

  #bprogress:after {
      content: '';
      position: absolute;
      right: -10px;
      top: -5px;
      width: 10px;
      height: 18px;
      border-radius: 10px;
      background-color:  #f44336 ;
  }

  .playlist {
    margin: 32px;
    background-color: black;
    border-radius: 5px 5px 5px 5px;
    list-style-type: none;
    float: right; 
    width:450px;
    height: 550px;
    z-index: 1;
    position: center;
    box-shadow: 10px 8px 5px #1a3470;
    border-radius:15px

   
}
.playlist li {
    color: #EEEEEE;
    cursor: pointer;
    margin: 50 0 0px 20px;
    text-decoration: non;
    list-style-type: none;
}

.playlist li.active{
  background-color:green;
}


.playlist li.active a {
    color:#fff;
    font-weight:bold;
}
  </style>

  <div class="flex-container">
  
  <div class="first">
  <div class="text-blinking">
		<span>C</span>
		<span>u</span>
		<span>s</span>
		<span>t</span>
		<span>o</span>
		<span>m</span>
		
		<span>P</span>
		<span>l</span>
		<span>a</span>
		<span>y</span>
		<span>e</span>
		<span>r</span>
	</div>
  <canvas id="myCanvas" width=400></canvas>
  
  <span id="timer">00:00</span>
  <div id="progress_bar">
  <div id="bprogress"></div>
</div>


  <audio id="myPlayer" crossorigin="anonymous" ></audio>
    <br>
    
    <webaudio-knob id="volumeKnob" 
      src="./assets/imgs/JP8000.png" 
      value=0,5 min=0 max=1 step=0.01 
      diameter="45" 
      tooltip="Volume: %d">
    </webaudio-knob>

    <webaudio-knob id="vitesseKnob" 
      src="./assets/imgs/JP8000.png" 
      value=1 min=0.2 max=4 step=0.1 
      diameter="45" 
      tooltip="Vitesse: %d">
    </webaudio-knob>

    <webaudio-switch midilearn="1" id="loop"
      src="./assets/imgs/switch_toggle.png" 
      value="0" height="56" width="56"
      tooltip="Loop">
    </webaudio-switch>

    <webaudio-knob midilearn="1" id="aigvitesse"
      src="./assets/imgs/Vintage_VUMeter_2.png"
        min=0.2 max=4 step=0.1 value=1 
      height="56" width="56"
      tooltip="variation en fonction de la vitesse ">
    </webaudio-knob>

    <webaudio-switch midilearn="1" id="freq"
      src="./assets/imgs/switch_toggle.png" 
      value="0" height="56" width="56"
      tooltip="Changer de canvas">
    </webaudio-switch>
    

    
    <br>
   
    <br>
  <button id="playPause">
  <svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" 
  fill="red" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10">
  </circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
  
  </button> 

  <button id="backward"  ><svg  xmlns="http://www.w3.org/2000/svg"
  width="34" height="34" viewBox="0 0 24 24" fill="#FFD700" 
  stroke="#f44336"  stroke-width="2" 
  stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon>
  <polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
  </button>

  <button id="forward">
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#FFD700" 
  stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
  </button>


  <button id="stop">
  <svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="red" 
  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>
  </button>
 
  <div class="controls">
    <label>60Hz</label>
    <input  class="gain0" type="range" value="0" step="1" min="-30" max="30" ></input>
  <output id="gain0">0 dB</output>
  </div>

  <div class="controls">
    <label>170Hz</label>
    <input class="gain1" type="range" value="0" step="1" min="-30" max="30" ></input>
    <output id="gain1">0 dB</output>
  </div>

  <div class="controls">
    <label>350Hz</label>
    <input class="gain2" type="range" value="0" step="1" min="-30" max="30" ></input>
    <output id="gain2">0 dB</output>
  </div>

  <div class="controls">
    <label>1000Hz</label>
    <input class="gain3" type="range" value="0" step="1" min="-30" max="30" ></input>
    <output id="gain3">0 dB</output>
  </div>

  <div class="controls">
    <label>3500Hz</label>
    <input  class="gain4" type="range" value="0" step="1" min="-30" max="30" ></input>
    <output id="gain4">0 dB</output>
  </div>

  <div class="controls">
    <label>10000Hz</label>
    <input class="gain5" type="range" value="0" step="1" min="-30" max="30"></input>
    <output id="gain5">0 dB</output>
  </div>

  </div>
  <div class="live">
  <strong>Now Playing</strong>
  <marquee behavior="scroll" direction="right" scrollamount="8" ><span id="titre">Alan Walker Lily Cover Violin.mp3</span></marquee>
  </div>

  <div class="playList">
  <div class="text-blinking">
  <span>P</span>
  <span>L</span>
  <span>A</span>
  <span>Y</span>
  <span>L</span>
  <span>I</span>
  <span>S</span>
  <span>T</span>
 </div>

    <ul id="myPlayList">
        <li id="first" audiourl="./myComponents/assets/audio/audio1.mp3"><a>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style="margin-right:10px" viewBox="0 0 172 172" >
            <g fill="#ffff">
                <path d="M144.996,13.932c0,0 -79.636,16.4088 -85.2432,17.6472c-3.3712,0.7224 -4.7128,2.9584 -4.7128,6.2608v72.24c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-64.32456c0,-1.6168 1.10424,-3.01 2.6832,-3.35744c17.89488,-3.91472 56.2956,-12.27392 75.70752,-16.52576c2.14656,-0.47128 4.16928,1.16272 4.16928,3.36088v39.56688c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-96.32c0,-8.1872 -6.364,-6.708 -6.364,-6.708z">
                </path>
            </g>
          </svg>Alan Walker Lily Cover Violin.mp3
        </a></li>


      <li id="second" audiourl="./myComponents/assets/audio/audio2.mp3">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style="margin-right:10px" viewBox="0 0 172 172" >
          <g fill="#ffff">
              <path d="M144.996,13.932c0,0 -79.636,16.4088 -85.2432,17.6472c-3.3712,0.7224 -4.7128,2.9584 -4.7128,6.2608v72.24c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-64.32456c0,-1.6168 1.10424,-3.01 2.6832,-3.35744c17.89488,-3.91472 56.2956,-12.27392 75.70752,-16.52576c2.14656,-0.47128 4.16928,1.16272 4.16928,3.36088v39.56688c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-96.32c0,-8.1872 -6.364,-6.708 -6.364,-6.708z">
              </path>
          </g>
        </svg>Duomo Wildest Dreams Taylor Swift Cover.mp3
      </li>

      <li id="third" audiourl="./myComponents/assets/audio/audio3.mp3">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style="margin-right:10px" viewBox="0 0 172 172" >
          <g fill="#ffff">
              <path d="M144.996,13.932c0,0 -79.636,16.4088 -85.2432,17.6472c-3.3712,0.7224 -4.7128,2.9584 -4.7128,6.2608v72.24c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-64.32456c0,-1.6168 1.10424,-3.01 2.6832,-3.35744c17.89488,-3.91472 56.2956,-12.27392 75.70752,-16.52576c2.14656,-0.47128 4.16928,1.16272 4.16928,3.36088v39.56688c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-96.32c0,-8.1872 -6.364,-6.708 -6.364,-6.708z">
              </path>
          </g>
        </svg>Chopin Spring Waltz.mp3
      </li>
      <li id="fourth" audiourl="./myComponents/assets/audio/audio4.mp3">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style="margin-right:10px" viewBox="0 0 172 172" >
          <g fill="#ffff">
              <path d="M144.996,13.932c0,0 -79.636,16.4088 -85.2432,17.6472c-3.3712,0.7224 -4.7128,2.9584 -4.7128,6.2608v72.24c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-64.32456c0,-1.6168 1.10424,-3.01 2.6832,-3.35744c17.89488,-3.91472 56.2956,-12.27392 75.70752,-16.52576c2.14656,-0.47128 4.16928,1.16272 4.16928,3.36088v39.56688c0,7.6024 -3.5432,13.76 -17.2,13.76c-19.4704,0 -27.52,5.0224 -27.52,17.2c0,8.1872 1.6856,20.64 27.3136,20.64c23.7704,0 24.2864,-18.3008 24.2864,-27.52v-96.32c0,-8.1872 -6.364,-6.708 -6.364,-6.708z">
              </path>
          </g>
        </svg>Save Me Piano Cover.mp3
      </li>
    </ul>
  </div>

 
</div>
  `;

class MyAudioPlayer extends HTMLElement {


  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    console.log("URL de base du composant : " + getBaseURL())
  }

  connectedCallback() {

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.fixRelativeURLs();

    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.src = this.getAttribute("src");

    this.plpause = this.shadowRoot.querySelector("#playPause");
    this.bloop = this.shadowRoot.querySelector("#loop");
    this.btimer = this.shadowRoot.querySelector("#timer");
    this.bprogress = this.shadowRoot.querySelector("#bprogress");
    this.progress_bar = this.shadowRoot.querySelector("#progress_bar");
    this.aigvitesse = this.shadowRoot.querySelector("#aigvitesse");

    this.bfreq = this.shadowRoot.querySelector("#freq");

    this.first = this.shadowRoot.querySelector("#first");
    this.second = this.shadowRoot.querySelector("#second");
    this.third = this.shadowRoot.querySelector("#third");
    this.fourth = this.shadowRoot.querySelector("#fourth");



    this.canvas = this.shadowRoot.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.isonpause = true;

    this.audioCtx = new AudioContext();

    this.player.ontimeupdate = (e) => {
      this.bprogress.style.width = Math.floor(100 * this.player.currentTime / this.player.duration) + "%";
      displayCurrentTime(this.player, this.btimer);
    }

    this.defineListeners();

    this.buildAudioGraph();


    requestAnimationFrame(() => {
      this.animationLoop();
    });
  }

  buildAudioGraph() {
    let audioContext = this.audioCtx;

    let playerNode = audioContext.createMediaElementSource(this.player);


    this.analyserNode = audioContext.createAnalyser();
    this.pannerNode = audioContext.createStereoPanner();

    this.analyserNode.fftSize = 256;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    let filters = [];
    //Try changing for lower values: 512, 256, 128, 64...
    [60, 170, 350, 1000, 3500, 10000].forEach(function (freq) {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      filters.push(eq);
    });

    //Connect filters in serie
    playerNode.connect(filters[0]);
    for (var i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i + 1]);
    }

    filters[filters.length - 1].connect(audioContext.destination);

    this.filters = filters;
    //lecteur audio -> analyser -> haut parleurs
    playerNode.connect(this.analyserNode);
    this.analyserNode.connect(audioContext.destination);

    playerNode.connect(this.pannerNode);
    this.pannerNode.connect(audioContext.destination);
  }

  animationLoop() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.analyserNode.getByteFrequencyData(this.dataArray);

    let barWidth = this.canvas.width / this.bufferLength;
    let barHeight;
    let x = 0;


    let heightScale = this.canvas.height / 128;

    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i];

      this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      barHeight *= heightScale;
      this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

    requestAnimationFrame(() => {
      this.animationLoop();
    });
  }


  cutevis() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyserNode.getByteTimeDomainData(this.dataArray);

    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'yellow';
    this.ctx.beginPath();

    let sliceWidth = this.canvas.width / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      let v = this.dataArray[i] / 255;
      let y = v * this.canvas.height;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);

    this.ctx.stroke();

    requestAnimationFrame(() => {
      this.cutevis();
    });
  }
  fixRelativeURLs() {
    const elems = this.shadowRoot.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch, img");
    elems.forEach(e => {
      const path = e.src;
      if (path.startsWith(".")) {
        e.src = getBaseURL() + path;
      }
    });
  }



  defineListeners() {

    //Play audio---Pause audio

    this.shadowRoot.querySelector("#playPause").onclick = () => {
      if (!this.isonpause) {
        this.isonpause = true;
        this.plpause.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" 
            fill="red" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10">
            </circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`;
        this.player.pause();
      }
      else {
        this.isonpause = false;
        this.plpause.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="red" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10">
            </circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line></svg>`;
        this.player.play();
        this.audioCtx.resume();
      }
    }

    //move forward by 10 seconds
    this.shadowRoot.querySelector("#forward").onclick = () => {
      this.player.currentTime += 10;
    }
    //move backward by 10 seconds
    this.shadowRoot.querySelector("#backward").onclick = () => {
      this.player.currentTime -= 10;
    }
    //stop and back to the start
    this.shadowRoot.querySelector("#stop").onclick = () => {
      this.player.currentTime = 0;
    }
    //change the speed
    this.shadowRoot.querySelector("#vitesseKnob").oninput = (event) => {
      this.player.playbackRate = parseFloat(event.target.value);
      console.log("vitesse =  " + this.player.playbackRate);
      this.aigvitesse.value = event.target.value;
    }
    //change the volume
    this.shadowRoot.querySelector("#volumeKnob").oninput = (event) => {
      this.player.volume = parseFloat(event.target.value);
    }

    //manage frequencies
    this.shadowRoot.querySelector(".gain0").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[0].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain0");
      output.value = value + " dB";
    });

    this.shadowRoot.querySelector(".gain1").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[1].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain1");
      output.value = value + " dB";
    });

    this.shadowRoot.querySelector(".gain2").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[2].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain2");
      output.value = value + " dB";
    });

    this.shadowRoot.querySelector(".gain3").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[3].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain3");
      output.value = value + " dB";
    });

    this.shadowRoot.querySelector(".gain4").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[4].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain4");
      output.value = value + " dB";
    });

    this.shadowRoot.querySelector(".gain5").addEventListener('input', (e) => {
      var value = parseFloat(e.target.value);
      this.filters[5].gain.value = value;
      var output = this.shadowRoot.querySelector("#gain5");
      output.value = value + " dB";
    });

    //play it over and over again
    this.shadowRoot.querySelector("#loop").onclick = (event) => {
      if (this.bloop.value == 0) {

        this.player.loop = false;
      }
      else {
        this.player.loop = true;
      }
    }
    //change the canvas

    this.shadowRoot.querySelector("#freq").onclick = (event) => {
      if (this.bfreq.value == 0) {
        requestAnimationFrame(() => {
          this.animationLoop();
        });
      } else {
        requestAnimationFrame(() => {
          this.cutevis();
        });
      }
    }
    //display the current time

    this.shadowRoot.querySelector("#timer").onchange = (event) => {
      let currentTime = Float(this.player.currentTime().value)

    }

    //manage the playlist

    this.first.addEventListener('click', (e) => {
      //to see
      this.plpause.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" 
      fill="red" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10">
      </circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`;
     
      let url = this.first.getAttribute("audiourl");
      this.player.src = url;
      let titre = this.first.innerText;
      this.shadowRoot.querySelector("#titre").textContent = titre;
    

    });

    this.shadowRoot.querySelector("#titre").onclick =  changeColor;   

    function changeColor() {
      this.shadowRoot.querySelector("#titre").style.color = "purple";
        return false;
    } 

    

    this.second.addEventListener('click', (e) => {
      let url = this.second.getAttribute("audiourl");
      this.player.src = url;
      let titre = this.second.innerText;
      this.shadowRoot.querySelector("#titre").textContent = titre;

    });

    this.third.addEventListener('click', (e) => {
      let url = this.third.getAttribute("audiourl");
      this.player.src = url;
      let titre = this.third.innerText;
      this.shadowRoot.querySelector("#titre").textContent = titre;

    });

    this.fourth.addEventListener('click', (e) => {
      let url = this.fourth.getAttribute("audiourl");
      this.player.src = url;
      let titre = this.fourth.innerText;
      this.shadowRoot.querySelector("#titre").textContent = titre;

    });

  }

  // L'API du Web Component

}

customElements.define("my-player", MyAudioPlayer);
