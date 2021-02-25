const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const dots = [];
let mx = canvas.width / 2;
let my = canvas.height / 2;
let moving = false;

const config = {
    minRadius: 2,
    maxRadius: 4,
    minVelocity: 2,
    maxVelocity: 5,
    dotColor: 'rgba(255, 255, 255)',
    lineColor: '0,181,255',
    dotQuantity: canvas.width / 20,
    distance: 300
}

class Dot {
    constructor(x, y, r, v) {
       this.vectorX = randomVector();
       this.vectorY = randomVector();
       this.x = x;
       this.y = y;
       this.r = r;
       this.color = config.dotColor;
       this.v = v;
    }
    draw() {
       ctx.beginPath();
       ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
       ctx.fillStyle = this.color;
       ctx.fill();
       this.x += (this.v * this.vectorX);
       this.y += (this.v * this.vectorY);
    }
}

function initDots(q) {
    for (let i=0; i < q; i++) {
        const dot = new Dot(random(1, canvas.width -1), random(1, canvas.height -1), random(config.minRadius, config.maxRadius), random(config.minVelocity, config.maxVelocity));
        dots.push(dot);
    }
}

initDots(config.dotQuantity);

function randomVector() {
  return Math.random() - 0.5 > 0 ? 1 : -1; 
}

canvas.addEventListener('click', () => moving = !moving);

canvas.addEventListener('mousemove', (e) => {
    if (moving) {
        mx = e.clientX;
        my = e.clientY;
    }
})
animation({
    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    update() {
        
    },
    render(params) {
        collusionDetect();
        ctx.font = '20px sans serif';
        ctx.fillStyle = "white";
        ctx.fillText(params.fps.toString(), canvas.width - 30, 30);
        link();
        dots.forEach(dot => dot.draw());
    }
});

function collusionDetect() {
  for(let i=0; i < dots.length; i++) {
     const d = dots[i];
     if (d.x + d.r > canvas.width || d.x < d.r) d.vectorX *= -1;
     if (d.y + d.r > canvas.height || d.y < d.r) d.vectorY *= -1;
  }
}

function link() {
  for(let i=0; i < dots.length; i++) {
      for(let j=0; j < dots.length; j++) {
        const d1 = dots[i];
        const d2 = dots[j];
        if (dots[i] === dots[j]) {
          continue;
        }
        const difx = d1.x - d2.x;
        const dify = d1.y - d2.y;
        const distance = Math.sqrt(difx * difx + dify * dify);

        const opacity = 1 - distance / config.distance;
        if (distance < config.distance) {
            const ca = config.lineColor.split(',');
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${ca[0]},${ca[1]},${ca[2]},${opacity})`;
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
        }
      }
  }
}