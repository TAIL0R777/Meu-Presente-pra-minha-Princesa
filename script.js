document.addEventListener('DOMContentLoaded', () => {
  const photoArea = document.getElementById('photos');
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const letter = document.getElementById('letter');
  const intro = document.getElementById('intro');
  const startBtn = document.getElementById('startBtn');
  const mainContent = document.getElementById('mainContent');

  const photos = [
    {src: 'images/img1.jpg', compliment: 'Sua beleza é surreal!'},
    {src: 'images/img2.jpg', compliment: 'Mulher maravilhosa!'},
    {src: 'images/img3.jpg', compliment: 'Você ilumina o mundo!'},
    {src: 'images/img4.jpg', compliment: 'Encanto de pessoa!'},
    {src: 'images/img5.jpg', compliment: 'Que sorriso incrível!'},
    {src: 'images/img6.jpg', compliment: 'Inspiração diária!'},
    {src: 'images/img7.jpg', compliment: 'Tão incrível e única!'},
    {src: 'images/img8.jpg', compliment: 'Radiante como sempre!'},
    {src: 'images/img9.jpg', compliment: 'Seu charme é inigualável!'},
    {src: 'images/img10.jpg', compliment: 'Amo sua energia!'},
    {src: 'images/img11.jpg', compliment: 'Você é luz pura!'},
    {src: 'images/img12.jpg', compliment: 'Maravilhosa demais!'}
  ];

  let flippedPhoto = null;

  function createPhotoEl(photoObj, index) {
    const wrap = document.createElement('div');
    wrap.className = 'photo';
    wrap.setAttribute('data-index', index);

    const inner = document.createElement('div');
    inner.className = 'photo-inner';

    const img = document.createElement('img');
    img.className = 'photo-front';
    img.src = photoObj.src;
    img.alt = `Foto ${index+1}`;

    const back = document.createElement('div');
    back.className = 'photo-back';
    back.textContent = photoObj.compliment;

    inner.appendChild(img);
    inner.appendChild(back);
    wrap.appendChild(inner);

    wrap.addEventListener('click', () => {
      if (flippedPhoto && flippedPhoto !== wrap) {
        flippedPhoto.classList.remove('flipped');
      }
      wrap.classList.toggle('flipped');
      flippedPhoto = wrap.classList.contains('flipped') ? wrap : null;
    });

    return wrap;
  }

  function displayPhotos() {
    photoArea.innerHTML = '';
    const shuffled = photos.sort(() => 0.5 - Math.random());
    shuffled.forEach((photo, i) => {
      const photoEl = createPhotoEl(photo, i);
      const size = 120 + Math.random() * 60; 
      photoEl.style.width = `${size}px`;
      photoEl.style.height = `${size}px`;
      photoArea.appendChild(photoEl);
      setTimeout(() => photoEl.classList.add('show'), i*100);
    });
  }

  startBtn.addEventListener('click', () => {
    intro.classList.add('hide');
    mainContent.classList.remove('hidden');
    mainContent.setAttribute('aria-hidden', 'false');
    displayPhotos();
    startConfetti();
  });

  // ABRIR carta
  envelope.addEventListener('click', (e) => {
    e.stopPropagation(); // para não fechar imediatamente
    letter.classList.add('show');
    envelopeHint.style.display = 'none';
  });

  // FECHAR carta ao clicar fora
  document.addEventListener('click', (e) => {
    if (!letter.contains(e.target) && !envelope.contains(e.target)) {
      letter.classList.remove('show');
    }
  });

  window.addEventListener('resize', displayPhotos);

  /* ==================== CONFETE ==================== */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const confettiCount = 150;
  const confetti = [];

  function randomColor() {
    const colors = ['#ff0a54','#ff477e','#ff7096','#ff85a1','#fbb1b9','#f9bec7','#f5cad3','#ede7f6','#b28dff','#a3f7bf'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function initConfetti() {
    for(let i=0;i<confettiCount;i++){
      confetti.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*6+4,
        d: Math.random()*confettiCount,
        color: randomColor(),
        tilt: Math.random()*10-10,
        tiltAngleIncrement: Math.random()*0.07+0.05,
        tiltAngle: 0
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0,0,W,H);
    confetti.forEach((c)=>{
      ctx.beginPath();
      ctx.lineWidth = c.r/2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x+c.tilt+c.r/4, c.y);
      ctx.lineTo(c.x+c.tilt, c.y+c.tilt+c.r/4);
      ctx.stroke();
    });
    updateConfetti();
  }

  function updateConfetti(){
    confetti.forEach((c,i)=>{
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d)+3+c.r/2)/2;
      c.tilt = Math.sin(c.tiltAngle)*12;
      if(c.y>H){
        confetti[i] = {
          x: Math.random()*W,
          y: -20,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngleIncrement: c.tiltAngleIncrement,
          tiltAngle: c.tiltAngle
        };
      }
    });
  }

  let confettiInterval;
  function startConfetti() {
    initConfetti();
    confettiInterval = setInterval(drawConfetti, 20);
  }
});
