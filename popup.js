const sliders = {
  rainVol: document.getElementById("rainVol"),
  birdVol: document.getElementById("birdVol")
};

// Load saved volumes
browser.storage.local.get(["rainVol", "windVol"]).then(data => {
  sliders.rainVol.value = data.rainVol ?? 0.5;
  sliders.windVol.value = data.windVol ?? 0.5;
  sliders.chimeVol.value = data.chimeVol ?? 0.5;
});

// Handle slider changes
Object.keys(sliders).forEach(key => {
  sliders[key].addEventListener("input", () => {
    const volume = parseFloat(sliders[key].value);
    browser.storage.local.set({ [key]: volume });
    browser.runtime.sendMessage({ action: "setVolume", layer: key, volume });
  });
});

