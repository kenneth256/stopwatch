const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('StopBtn'); 
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const laps = document.getElementById('lap-list');

// Stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

// Adding event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 10); 
    startButton.disabled = true;
}

function stopTimer() {
    clearInterval(interval); 
    startButton.disabled = false;
    addLap();
}

function pauseTimer() {
    clearInterval(interval); 
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(interval); 
    startButton.disabled = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
    laps.innerHTML = ''; // Clear the lap list on reset
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time){
    return time.toString().padStart(2, '0');
}

function addLap() {
    const lap = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>Lap ${laps.childElementCount + 1}: </span>${lap}`;
    laps.appendChild(lapItem);
}
