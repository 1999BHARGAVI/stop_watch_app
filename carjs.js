let timer;
let elapsedTime = 0; // in milliseconds
let isRunning = false;
let isPaused = false;
let movingInterval;
let position = 0; // Initial position of the GIF


const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');
const timerGif = document.getElementById('timer-gif');

function updateDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsedTime % 1000).padStart(3, '0');
    display.innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
function startMoving() {
    movingInterval = setInterval(() => {
        position += 5; // Move right by 5 pixels
        if (position > window.innerWidth) {
            position = -100; // Reset to the left if off-screen
        }
        timerGif.style.transform = `translateX(${position}px)`;
    }, 100); // Move every 100 milliseconds
}


function startTimer() {
    if (!isRunning) {
        isRunning = true;
        
        document.getElementById('timer-gif-start').style.display = 'none'; // Hide the start GIF
        startMoving(); // Start moving the GIF
        document.getElementById('road').style.display = 'block'; 

        timerGif.style.display = 'block'; // Show the main timer GIF
        timer = setInterval(() => {
            if (!isPaused) {
                elapsedTime += 100; // increment by 100 milliseconds
                updateDisplay();
            }
        }, 100);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    timerGif.src = "./boomb.gif"; // Change to a different GIF when stopped
    timerGif.style.display = 'block'; // Show the new GIF
    setTimeout(() => location.reload(), 2000); // Refresh after 2 seconds
}

function resetTimer() {
    stopTimer(); // Stop the timer first
    elapsedTime = 0; // Reset elapsed time
    updateDisplay(); // Update the display to show 00:00:00.000
    lapList.innerHTML = ''; // Clear lap times
    timerGif.src = "./man.gif"; // Set to the original GIF
    timerGif.style.display = 'none'; // Ensure the GIF is not visible
}

function pauseTimer() {
    if (isRunning) {
        isPaused = true;
        timerGif.src = "./pause.gif"; // Change to paused GIF
    }
}

function resumeTimer() {
    if (isRunning) {
        isPaused = false;
        timerGif.src = "./man.gif"; // Show the original GIF again
    }
}

function recordLap() {
    if (isRunning || isPaused) {
        const lapTime = display.innerText;
        const now = new Date();
        const formattedDate = now.toLocaleString(); // Get current date and time
        const li = document.createElement('li');
        li.textContent = `Lap at ${formattedDate}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

// Event listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('resume').addEventListener('click', resumeTimer);

// Initial display update
updateDisplay();
