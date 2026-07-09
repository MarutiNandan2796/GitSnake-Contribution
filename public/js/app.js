document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const usernameInput = document.getElementById('username-input');
  const skinsGrid = document.getElementById('skins-grid');
  const themesGrid = document.getElementById('themes-grid');
  const speedSlider = document.getElementById('speed-slider');
  const speedVal = document.getElementById('speed-val');
  
  // Toggles
  const toggleGlow = document.getElementById('toggle-glow');
  const toggleParticles = document.getElementById('toggle-particles');
  const toggleTail = document.getElementById('toggle-tail');
  const toggleWave = document.getElementById('toggle-wave');
  const toggleBlink = document.getElementById('toggle-blink');

  // Custom Colors
  const enableCustomColors = document.getElementById('enable-custom-colors');
  const colorBg = document.getElementById('color-bg');
  const colorHead = document.getElementById('color-head');
  const colorBody = document.getElementById('color-body');
  const colorFood = document.getElementById('color-food');
  const colorEmpty = document.getElementById('color-empty');
  const colorL1 = document.getElementById('color-l1');
  const colorL2 = document.getElementById('color-l2');
  const colorL3 = document.getElementById('color-l3');
  const colorL4 = document.getElementById('color-l4');

  // Preview / Actions
  const previewImg = document.getElementById('snake-preview-img');
  const statusTag = document.getElementById('status-tag');
  const downloadSvgBtn = document.getElementById('download-svg-btn');
  const downloadPngBtn = document.getElementById('download-png-btn');
  const embedCodeArea = document.getElementById('embed-code-area');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const soundBtn = document.getElementById('sound-btn');

  // Tabs
  const tabs = document.querySelectorAll('.tab');
  
  // Collapsible Content
  const customThemeTrigger = document.getElementById('custom-theme-trigger');
  const customThemeContent = document.getElementById('custom-theme-content');

  // --- State Variables ---
  let activeSkin = 'classic';
  let activeTheme = 'classic-dark';
  let activeTab = 'markdown';
  let audioCtx = null;
  let audioInterval = null;
  let isSoundOn = false;

  // --- Collapsible Handler ---
  customThemeTrigger.addEventListener('click', () => {
    customThemeTrigger.classList.toggle('collapsed');
    customThemeContent.classList.toggle('collapsed');
  });

  // --- Grid Selection Handlers ---
  skinsGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.select-item');
    if (!item) return;
    
    skinsGrid.querySelectorAll('.select-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeSkin = item.dataset.skin;
    updatePreview();
  });

  themesGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.select-item');
    if (!item) return;
    
    themesGrid.querySelectorAll('.select-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeTheme = item.dataset.theme;
    updatePreview();
  });

  // --- Input Change Handlers ---
  let usernameTimeout = null;
  usernameInput.addEventListener('input', () => {
    clearTimeout(usernameTimeout);
    statusTag.textContent = 'Typing...';
    usernameTimeout = setTimeout(() => {
      updatePreview();
    }, 800); // Debounce preview load
  });

  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(usernameTimeout);
      updatePreview();
    }
  });

  speedSlider.addEventListener('input', (e) => {
    speedVal.textContent = e.target.value;
  });
  
  speedSlider.addEventListener('change', () => {
    updatePreview();
  });

  // Toggle handlers
  [toggleGlow, toggleParticles, toggleTail, toggleWave, toggleBlink, enableCustomColors].forEach(el => {
    el.addEventListener('change', () => {
      updatePreview();
    });
  });

  // Color inputs handlers
  [colorBg, colorHead, colorBody, colorFood, colorEmpty, colorL1, colorL2, colorL3, colorL4].forEach(el => {
    el.addEventListener('input', () => {
      if (enableCustomColors.checked) {
        // Only update preview if custom colors are active
        clearTimeout(usernameTimeout);
        usernameTimeout = setTimeout(() => {
          updatePreview();
        }, 300);
      }
    });
  });

  // --- URL Builder ---
  function buildApiUrl(action) {
    const user = usernameInput.value.trim() || 'octocat';
    const theme = activeTheme;
    const skin = activeSkin;
    const speed = speedSlider.value;
    
    // Convert boolean options to query strings
    const glow = toggleGlow.checked;
    const particles = toggleParticles.checked;
    const tail = toggleTail.checked;
    const wave = toggleWave.checked;
    const blink = toggleBlink.checked;

    let url = `${window.location.origin}/api/${action}?user=${encodeURIComponent(user)}`;
    url += `&theme=${theme}&skin=${skin}&speed=${speed}`;
    url += `&tailAnimation=${tail}&foodGlow=${glow}&particleEffects=${particles}&eyeBlinking=${blink}&waveMotion=${wave}`;

    // Add custom colors if enabled
    if (enableCustomColors.checked) {
      url += `&custom=true`;
      url += `&bg=${colorBg.value.substring(1)}`;
      url += `&head=${colorHead.value.substring(1)}`;
      url += `&body=${colorBody.value.substring(1)}`;
      url += `&food=${colorFood.value.substring(1)}`;
      url += `&empty=${colorEmpty.value.substring(1)}`;
      url += `&l1=${colorL1.value.substring(1)}`;
      url += `&l2=${colorL2.value.substring(1)}`;
      url += `&l3=${colorL3.value.substring(1)}`;
      url += `&l4=${colorL4.value.substring(1)}`;
    }

    return url;
  }

  // --- Preview Update Handler ---
  function updatePreview() {
    statusTag.textContent = 'Generating...';
    const url = buildApiUrl('preview');
    
    // Prevent image caching by adding a timestamp
    const cacheBusterUrl = `${url}&_t=${Date.now()}`;
    
    // Create new image to load in background before setting src
    const imgLoader = new Image();
    imgLoader.src = cacheBusterUrl;
    imgLoader.onload = () => {
      previewImg.src = cacheBusterUrl;
      statusTag.textContent = 'Active Animation';
      updateEmbedCode();
      if (isSoundOn) {
        playRetroPowerupSound();
      }
    };
    imgLoader.onerror = () => {
      statusTag.textContent = 'Generation Error';
    };
  }

  // --- Download Handlers ---
  downloadSvgBtn.addEventListener('click', () => {
    const url = buildApiUrl('download') + '&format=svg';
    window.location.href = url;
  });

  downloadPngBtn.addEventListener('click', () => {
    statusTag.textContent = 'Compiling PNG...';
    const url = buildApiUrl('download') + '&format=png';
    window.location.href = url;
    setTimeout(() => {
      statusTag.textContent = 'Active Animation';
    }, 2000);
  });

  // --- Embed Code Handler ---
  function updateEmbedCode() {
    const url = buildApiUrl('preview');
    const user = usernameInput.value.trim() || 'octocat';
    
    if (activeTab === 'markdown') {
      embedCodeArea.value = `![GitSnake Pro Contribution Board](${url})`;
    } else if (activeTab === 'html') {
      embedCodeArea.value = `<img src="${url}" alt="GitSnake Pro Contribution Board" />`;
    } else if (activeTab === 'url') {
      embedCodeArea.value = url;
    }
  }

  // Tab controls
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      updateEmbedCode();
    });
  });

  // Copy button
  copyCodeBtn.addEventListener('click', () => {
    embedCodeArea.select();
    document.execCommand('copy');
    
    const prevText = copyCodeBtn.textContent;
    copyCodeBtn.textContent = 'Copied!';
    copyCodeBtn.style.borderColor = 'var(--accent-green)';
    copyCodeBtn.style.color = 'var(--accent-green)';

    if (isSoundOn) playCoinSound();

    setTimeout(() => {
      copyCodeBtn.textContent = prevText;
      copyCodeBtn.style.borderColor = '';
      copyCodeBtn.style.color = '';
    }, 1500);
  });

  // --- Web Audio Retro Synthesizer ---
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playCoinSound() {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'square';
    // Arpeggio frequencies for classic 8-bit sound
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(880.00, now + 0.08); // A5
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }

  function playRetroPowerupSound() {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'triangle';
    
    osc.frequency.setValueAtTime(330, now); // E4
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.12); // E5
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25); // E6
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    soundBtn.classList.toggle('active');
    
    if (isSoundOn) {
      soundBtn.textContent = '🔊 Arcade Sound: ON';
      initAudio();
      playRetroPowerupSound();
      
      // Simulate eating sounds at random intervals to align with preview movement
      audioInterval = setInterval(() => {
        if (Math.random() > 0.45) {
          playCoinSound();
        }
      }, 1200);
    } else {
      soundBtn.textContent = '🔊 Arcade Sound: OFF';
      clearInterval(audioInterval);
      audioInterval = null;
    }
  });

  // --- Initial Page Load ---
  updatePreview();
});
