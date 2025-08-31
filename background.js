// Create layered audio
const layers = {
  rainVol: new Audio(browser.runtime.getURL("sounds/rain.mp3")),
  birdVol: new Audio(browser.runtime.getURL("sounds/bird.mp3")),
};

Object.values(layers).forEach(audio => {
  audio.loop = true;
  audio.volume = 0.5;
  audio.play().catch(() => {}); // Prevent autoplay errors
});

// Set volumes from storage
browser.storage.local.get(["rainVol", "windVol"]).then(data => {
  for (const [key, audio] of Object.entries(layers)) {
    audio.volume = data[key] ?? 0.5;
  }
});

// Listen for volume adjustments
browser.runtime.onMessage.addListener((msg) => {
  if (msg.action === "setVolume" && layers[msg.layer]) {
    layers[msg.layer].volume = msg.volume;
  }
});

