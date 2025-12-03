const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 550, w: 40, h: 40, speed: 6 };
let blocks = [];
let gameOver = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
});

function spawnBlock() {
  const size = 40;
  const x = Math.random() * (canvas.width - size);
  blocks.push({ x, y: -40, w: size, h: size, speed: 3 });
}

function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.h + a.y > b.y
  );
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#f33";
  blocks.forEach((b) => {
    b.y += b.speed;
    ctx.fillRect(b.x, b.y, b.w, b.h);

    if (collide(player, b)) {
      gameOver = true;
      alert("GAME OVER");
    }
  });

  blocks = blocks.filter((b) => b.y < canvas.height);

  requestAnimationFrame(update);
}

setInterval(spawnBlock, 800);
update();