// CLOCK -----------------------
function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  timeElement.textContent = `${h}:${m}:${s} ${ampm}`;
}

function updateDate() {
  const dateElement = document.getElementById('date');
  const now = new Date();

  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();

  dateElement.textContent = `${month}/${day}/${year}`;
}

// STOPWATCH -------------------
let startTime = 0;
let elapsedTime = 0;
let animationFrameId = null;

function updateStopwatchDisplay() {
  const display = document.getElementById('stopwatch');

  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  const ms = milliseconds.toString().padStart(2, '0');

  display.textContent = `${h}:${m}:${s}.${ms}`;
}

function animate() {
  elapsedTime = Date.now() - startTime;
  updateStopwatchDisplay();
  animationFrameId = requestAnimationFrame(animate);
}

function startStopwatch() {
  if (animationFrameId) return;
  startTime = Date.now() - elapsedTime;
  animationFrameId = requestAnimationFrame(animate);
}

function pauseStopwatch() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  updateStopwatchDisplay();
}

// RUN EVERYTHING --------------
setInterval(updateTime, 1000);
setInterval(updateDate, 1000);

updateTime();
updateDate();
updateStopwatchDisplay();