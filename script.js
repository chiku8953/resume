// Select Elements
const audio = new Audio(); // Audio object for playing songs
const playlist = document.getElementById('playlist');
const progressBar = document.getElementById('progress-bar');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentImage = document.getElementById('current-image');

// Song List
const songs = playlist.querySelectorAll('li');
let currentIndex = 0; // Currently playing song index
let isPlaying = false;

// Load a song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.dataset.src;
  currentImage.src = song.dataset.image || 'default.jpg';
  
  // Highlight active song
  songs.forEach((s) => s.classList.remove('active'));
  song.classList.add('active');
}

// Play/Pause toggle
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '';
  } else {
    audio.play();
    playBtn.textContent = '||';
  }
  isPlaying = !isPlaying;
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  progressBar.max = audio.duration;
});

// Seek in song
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

// Next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

// Previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
}

// Play song from playlist
songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    currentIndex = index;
    loadSong(currentIndex);
    audio.play();
  });
});

// Button Listeners
playBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Auto-play next song
audio.addEventListener('ended', nextSong);

// Load the first song on page load
loadSong(currentIndex);

// Select time elements
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

// Function to format time (e.g., 75 seconds → 1:15)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Update current time and duration
audio.addEventListener('timeupdate', () => {
  // Update current time
  currentTimeEl.textContent = formatTime(audio.currentTime);

  // Update total duration if not already set
  if (audio.duration) {
    totalDurationEl.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration; // Sync progress bar
  }

  // Sync progress bar with current time
  progressBar.value = audio.currentTime;
});

// Seek functionality when user interacts with progress bar
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});
