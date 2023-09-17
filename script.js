const primaryButtons = document.querySelectorAll('.primary-button');
const secondaryButtons = document.querySelectorAll('.secondary-button');
const partTwo = document.querySelectorAll('.part2');
const primbuttnColorClass = document.querySelector('.primbuttn');
const secbuttnColorClass = document.querySelector('.secbuttn');
const accentColorClass = document.querySelector('.accent');


// showing hex value

const colorPickers = document.querySelectorAll('.colorpicker');
const hexInputs = document.querySelectorAll('.hex-input');

function attachColorPickerListeners(colorPickers, hexInputs) {
  for (let i = 0; i < colorPickers.length; i++) {
    colorPickers[i].addEventListener('change', function() {
      const colorValue = this.value;
      const index = Array.prototype.indexOf.call(colorPickers, this);
      hexInputs[index].value = colorValue;

      updateUrlParams();
    });

    hexInputs[i].addEventListener('change', function() {
      let hexValue = this.value.trim().substring(0, 7);
      if (hexValue.length === 3 || hexValue.length === 4 || hexValue.length === 6 || hexValue.length === 7) {
        if (hexValue[0] === '#') {
          hexValue = hexValue.substring(1);
        }
        if (hexValue.length === 3) {
          hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
        } else if (hexValue.length === 4) {
          hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2] + hexValue[3];
        } else if (hexValue.length === 5) {
          hexValue += 'FF';
        }
        if (hexValue.length === 6) {
          hexValue = '#' + hexValue;
        }
        const index = Array.prototype.indexOf.call(hexInputs, this);
        colorPickers[index].value = hexValue;
        updateUrlParams();
      } else {
        this.value = hexValue;
      }
    });
    
    hexInputs[i].addEventListener('paste', function(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      let hexValue = clipboardData.getData('text').trim();
    
      hexValue = hexValue.substring(0, 6);
      if (hexValue.length > 0 && !isNaN(parseInt(hexValue, 16))) {
        if (hexValue.length === 3 || hexValue.length === 4 || hexValue.length === 6 || hexValue.length === 7) {
          if (hexValue[0] === '#') {
            hexValue = hexValue.substring(1);
          }
          if (hexValue.length === 3) {
            hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
          } else if (hexValue.length === 4) {
            hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2] + hexValue[3];
          } else if (hexValue.length === 5) {
            hexValue += 'FF';
          }
          if (hexValue.length === 6) {
            hexValue = '#' + hexValue;
          }
          const index = Array.prototype.indexOf.call(hexInputs, this);
          colorPickers[index].value = hexValue;
          updateUrlParams();
        }
      }
    });
    
    hexInputs[i].addEventListener('textInput', function(event) {
      const maxLength = 7;
      const hexValue = this.value;
      const selectionStart = this.selectionStart;
      const selectionEnd = this.selectionEnd;
      let newValue = hexValue.substring(0, selectionStart) + event.data + hexValue.substring(selectionEnd, hexValue.length);
    
      if (newValue.length > maxLength) {
        event.preventDefault();
        newValue = newValue.substring(0, maxLength);
    
        const index = Array.prototype.indexOf.call(hexInputs, this);
        colorPickers[index].value = newValue;
        updateUrlParams();
      }
    });
  }
}

function updateUrlParams() {
  const primaryColorValue = primaryColor.value.replace('#', '');
  const secondaryColorValue = secondaryColor.value.replace('#', '');
  const primbuttnColorValue = primbuttnColor.value.replace('#', '');
  const secbuttnColorValue = secbuttnColor.value.replace('#', '');
  const accentColorValue = accentColor.value.replace('#', '');

  const defaultSlug = `${primaryColorValue}-${secondaryColorValue}-${primbuttnColorValue}-${secbuttnColorValue}-${accentColorValue}`;

  window.history.replaceState({}, document.title, `?colors=${defaultSlug}`);
}

attachColorPickerListeners(colorPickers, hexInputs);




// Inputs

const primaryColor = document.getElementById('prim');
const secondaryColor = document.getElementById('sec');
const primbuttnColor = document.getElementById('primbuttn');
const secbuttnColor = document.getElementById('secbuttn');
const accentColor = document.getElementById('accent');
const randomizeButton = document.getElementById('randomize');



let lastSelectedColorSet = null;

randomizeButton.addEventListener('click', () => {
  randomizeColors();
  updateSlug();
  attachColorPickerListeners(colorPickers, hexInputs);

});

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    randomizeColors();
    updateSlug();
    event.preventDefault();
    attachColorPickerListeners(colorPickers, hexInputs);

  }
});


const colorSchemes = [
  {
    name: "Monochromatic",
    generateColors: function() {
      const baseHue = Math.floor(Math.random() * 360);
      const baseSaturation = Math.floor(Math.random() * 100);
      const baseLightness = Math.floor(Math.random() * 100);

      const firstLightness = baseLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);
      const secondLightness = firstLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);

      let modifiedSecondLightness;
      do {
        const adjustment = Math.random() < 0.5 ? Math.floor(Math.random() * 5) + 3 : -Math.floor(Math.random() * 5) - 3;
        modifiedSecondLightness = Math.max(0, Math.min(100, secondLightness + adjustment));
      } while (modifiedSecondLightness === secondLightness);

      const adjustedLightness = secondLightness <= 20 ? Math.floor(Math.random() * 61) + 20 : Math.floor(Math.random() * 61) + 20;

      const colors = [
        `hsl(${baseHue}, ${baseSaturation}%, ${firstLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${secondLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${adjustedLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${modifiedSecondLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${adjustedLightness +- 5}%)`
      ];
    

      return colors;
    }
  },
  {
    name: "Analogous",
    generateColors: function() {
      const baseHue = Math.floor(Math.random() * 360);
      const baseSaturation = Math.floor(Math.random() * 100);
      const baseLightness = Math.floor(Math.random() * 100);
      const analogousHue1 = (baseHue + 30) % 360;
      const analogousHue2 = (baseHue + 60) % 360;
      const analogousHue3 = (baseHue + 60) % 360;

      const firstLightness = baseLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);
      const secondLightness = firstLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);

      let modifiedSecondLightness;
      do {
        const adjustment = Math.random() < 0.5 ? Math.floor(Math.random() * 5) + 3 : -Math.floor(Math.random() * 5) - 3;
        modifiedSecondLightness = Math.max(0, Math.min(100, secondLightness + adjustment));
      } while (modifiedSecondLightness === secondLightness);


      const adjustedLightness = secondLightness <= 20 ? Math.floor(Math.random() * 61) + 20 : Math.floor(Math.random() * 61) + 20;

      const colors = [
        `hsl(${baseHue}, ${baseSaturation}%, ${firstLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${secondLightness}%)`,
        `hsl(${analogousHue1}, ${baseSaturation}%, ${adjustedLightness}%)`,
        `hsl(${analogousHue2}, ${baseSaturation}%, ${modifiedSecondLightness}%)`,
        `hsl(${analogousHue3}, ${baseSaturation}%, ${adjustedLightness +- 10}%)`
      ];

      return colors;
    }
  },
  {
    name: "Complementary",
    generateColors: function() {
      const baseHue = Math.floor(Math.random() * 360);
      const baseSaturation = Math.floor(Math.random() * 100);
      const baseLightness = Math.floor(Math.random() * 100);
      const complementaryHue = (baseHue + 180) % 360;

      const firstLightness = baseLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);
      const secondLightness = firstLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);

      let modifiedSecondLightness;
      do {
        const adjustment = Math.random() < 0.5 ? Math.floor(Math.random() * 5) + 3 : -Math.floor(Math.random() * 5) - 3;
        modifiedSecondLightness = Math.max(0, Math.min(100, secondLightness + adjustment));
      } while (modifiedSecondLightness === secondLightness);

      const adjustedLightness = secondLightness <= 20 ? Math.floor(Math.random() * 61) + 20 : Math.floor(Math.random() * 61) + 20;

      const colors = [
        `hsl(${baseHue}, ${baseSaturation}%, ${firstLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${secondLightness}%)`,
        `hsl(${complementaryHue}, ${baseSaturation}%, ${adjustedLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${modifiedSecondLightness}%)`,
        `hsl(${complementaryHue}, ${baseSaturation}%, ${adjustedLightness +- 10}%)`
      ];

      return colors;
    }
  },
  {
    name: "Triadic",
    generateColors: function() {
      const baseHue = Math.floor(Math.random() * 360);
      const baseSaturation = Math.floor(Math.random() * 100);
      const baseLightness = Math.floor(Math.random() * 100);
      const triadicHue1 = (baseHue + 120) % 360;
      const triadicHue2 = (baseHue + 240) % 360;

      const firstLightness = baseLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);
      const secondLightness = firstLightness <= 10 ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 11);

      let modifiedSecondLightness;
      do {
        const adjustment = Math.random() < 0.5 ? Math.floor(Math.random() * 5) + 3 : -Math.floor(Math.random() * 5) - 3;
        modifiedSecondLightness = Math.max(0, Math.min(100, secondLightness + adjustment));
      } while (modifiedSecondLightness === secondLightness);


      const adjustedLightness = secondLightness <= 20 ? Math.floor(Math.random() * 61) + 20 : Math.floor(Math.random() * 61) + 20;

      const colors = [
        `hsl(${baseHue}, ${baseSaturation}%, ${firstLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${secondLightness}%)`,
        `hsl(${triadicHue1}, ${baseSaturation}%, ${adjustedLightness}%)`,
        `hsl(${baseHue}, ${baseSaturation}%, ${modifiedSecondLightness}%)`,
        `hsl(${triadicHue2}, ${baseSaturation}%, ${adjustedLightness +- 10}%)`
      ];

      return colors;

    }
  }
];



const primaryLock = document.getElementById('text-lock');
const secondaryLock = document.getElementById('bg-lock');
const primbuttnLock = document.getElementById('primbuttn-lock');
const secbuttnLock = document.getElementById('secbuttn-lock');
const accentLock = document.getElementById('accent-lock');



let isPrimaryLocked = false;
let isSecondaryLocked = false;
let isPrimbuttnLocked = false;
let isSecbuttnLocked = false;
let isAccentLocked = false;

primaryLock.addEventListener('click', function() {
  primaryLock.classList.toggle('locked');
  isPrimaryLocked = !isPrimaryLocked;

  if (isPrimaryLocked) {
    const hue = primaryColor.value.split(',')[0];
    colorSchemes.forEach(function(scheme) {
      scheme.baseHue = hue;
    });
  } else {
    colorSchemes.forEach(function(scheme) {
      delete scheme.baseHue;
    });
  }

  updateLockButtons();
});

secondaryLock.addEventListener('click', function() {
  secondaryLock.classList.toggle('locked');
  isSecondaryLocked = !isSecondaryLocked;

  if (isSecondaryLocked) {
    const hue = secondaryColor.value.split(',')[0];
    colorSchemes.forEach(function(scheme) {
      scheme.baseHue = hue;
    });
  } else {
    colorSchemes.forEach(function(scheme) {
      delete scheme.baseHue;
    });
  }

  updateLockButtons();
});

primbuttnLock.addEventListener('click', function() {
  primbuttnLock.classList.toggle('locked');
  isPrimbuttnLocked = !isPrimbuttnLocked;

  if (isPrimbuttnLocked) {
    const hue = primbuttnColor.value.split(',')[0];
    colorSchemes.forEach(function(scheme) {
      scheme.baseHue = hue;
    });
  } else {
    colorSchemes.forEach(function(scheme) {
      delete scheme.baseHue;
    });
  }

  updateLockButtons();
});

secbuttnLock.addEventListener('click', function() {
  secbuttnLock.classList.toggle('locked');
  isSecbuttnLocked = !isSecbuttnLocked; 

  if (isSecbuttnLocked) {
    const hue = secbuttnColor.value.split(',')[0];
    colorSchemes.forEach(function(scheme) {
      scheme.baseHue = hue;
    });
  } else {
    colorSchemes.forEach(function(scheme) {
      delete scheme.baseHue;
    });
  }

  updateLockButtons();
});

accentLock.addEventListener('click', function() {
  accentLock.classList.toggle('locked');
  isAccentLocked = !isAccentLocked;

  if (isAccentLocked) {
    const hue = accentColor.value.split(',')[0];
    colorSchemes.forEach(function(scheme) {
      scheme.baseHue = hue;
    });
  } else {
    colorSchemes.forEach(function(scheme) {
      delete scheme.baseHue;
    });
  }

  updateLockButtons();
});


function updateLockButtons() {
  const lockButtons = document.querySelectorAll('.lock-button');
  const lockedCount = document.querySelectorAll('.locked').length;

  if (lockedCount >= 4) {
    lockButtons.forEach((button, index) => {
      if (!button.classList.contains('locked')) {
        button.classList.add('lock-disabled');
      }
    });
  } else {
    lockButtons.forEach((button) => {
      button.classList.remove('lock-disabled');
    });
  }
}







// lock open / close
const lockButtons = document.querySelectorAll('.lock-button');

lockButtons.forEach(lockButton => {
  lockButton.addEventListener('click', () => {
    lockButton.querySelector('.lock-closed').classList.toggle('show');
    lockButton.querySelector('.lock-open').classList.toggle('show');
  });
});





function randomizeColors() {
  const randomColorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

  const colors = randomColorScheme.generateColors();

  const hexColors = colors.map(color => {
    const [h, s, l] = color.match(/\d+/g);
    return hslToHex(parseInt(h), parseInt(s), parseInt(l));
  });

  if (!isPrimaryLocked) {
    primaryColor.value = hexColors[0];
  }
  if (!isSecondaryLocked) {
    secondaryColor.value = hexColors[1];
  }
  if (!isPrimbuttnLocked) {
    primbuttnColor.value = hexColors[2];
  }
  if (!isSecbuttnLocked) {
    secbuttnColor.value = hexColors[3];
  }
  if (!isAccentLocked) {
    accentColor.value = hexColors[4];
  }

  document.documentElement.style.setProperty('--primary', isPrimaryLocked ? primaryColor.value : hexColors[0]);
  document.documentElement.style.setProperty('--secondary', isSecondaryLocked ? secondaryColor.value : hexColors[1]);
  document.documentElement.style.setProperty('--primbuttn', isPrimbuttnLocked ? primbuttnColor.value : hexColors[2]);
  document.documentElement.style.setProperty('--secbuttn', isSecbuttnLocked ? secbuttnColor.value : hexColors[3]);
  document.documentElement.style.setProperty('--accent', isAccentLocked ? accentColor.value : hexColors[4]);

  lastSelectedColorSet = randomColorScheme.name;

  function setHexInputValues(hexInputs, colors) {
    for (let i = 0; i < hexInputs.length; i++) {
      hexInputs[i].value = colors[i];
    }
  }
  setHexInputValues(hexInputs, colors);
  attachColorPickerListeners(colorPickers, hexInputs);

  getBrightnessAbs();
}




function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = Math.round(l * 255);
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    g = Math.round(hue2rgb(p, q, h) * 255);
    b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  }

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}







// COLOR INPUT 


primaryColor.addEventListener('input', () => {
  const primaryColorValue = primaryColor.value;
  document.documentElement.style.setProperty('--primary', primaryColorValue);
});

secondaryColor.addEventListener('input', () => {
    const secondaryColorValue = secondaryColor.value;
    document.documentElement.style.setProperty('--secondary', secondaryColorValue);
});

primbuttnColor.addEventListener('input', () => {
    const primbuttnColorValue = primbuttnColor.value;
    document.documentElement.style.setProperty('--primbuttn', primbuttnColorValue);
});

secbuttnColor.addEventListener('input', () => {
    const secbuttnColorValue = secbuttnColor.value;
    document.documentElement.style.setProperty('--secbuttn', secbuttnColorValue);
});

accentColor.addEventListener('input', () => {
    const accentColorValue = accentColor.value;
    document.documentElement.style.setProperty('--accent', accentColorValue);
});

primaryColor.addEventListener('input', checkContrast);
secondaryColor.addEventListener('input', checkContrast);
primbuttnColor.addEventListener('input', checkContrast);
secbuttnColor.addEventListener('input', checkContrast);
accentColor.addEventListener('input', checkContrast);





// EXPORT

const exportButton = document.getElementById('export');
exportButton.addEventListener('click', () => {
  const colorValues = [
    primaryColor.value,
    secondaryColor.value,
    primbuttnColor.value,
    secbuttnColor.value,
    accentColor.value
  ];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = colorValues.length * 100;
  canvas.height = 100;
  for (let i = 0; i < colorValues.length; i++) {
    ctx.fillStyle = colorValues[i];
    ctx.fillRect(i * 100, 0, 100, 100);
  }

  const paletteImage = canvas.toDataURL('image/png');
  const paletteBlob = dataURItoBlob(paletteImage);
  const paletteFile = new File([paletteBlob], 'palette.png', { type: 'image/png' });

  const colorText = `Your selected colors:\n
    Primary: ${primaryColor.value} (RGB: ${hexToRgb(primaryColor.value)})
    Secondary: ${secondaryColor.value} (RGB: ${hexToRgb(secondaryColor.value)})
    Primary Button: ${primbuttnColor.value} (RGB: ${hexToRgb(primbuttnColor.value)})
    Secondary Button: ${secbuttnColor.value} (RGB: ${hexToRgb(secbuttnColor.value)})
    Accent: ${accentColor.value} (RGB: ${hexToRgb(accentColor.value)})\n
Realtime Colors link for selected colors: ${window.location.href}\n
Thanks for using RealtimeColors.com!`;
  const colorBlob = new Blob([colorText], { type: 'text/plain' });
  const colorFile = new File([colorBlob], 'colors.txt', { type: 'text/plain' });

  const zip = new JSZip();
  zip.file(paletteFile.name, paletteFile);
  zip.file(colorFile.name, colorFile);
  zip.generateAsync({ type: 'blob' }).then(function (blob) {
    saveAs(blob, 'colors.zip');
  });
});

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1,3), 16);
  const g = parseInt(hex.substring(3,5), 16);
  const b = parseInt(hex.substring(5,7), 16);
  return `${r}, ${g}, ${b}`;
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}


document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'e') {
    event.preventDefault();
    document.getElementById('export').click();
  }
});


// 
// 
// 

// CONTRAST CHECKER

function getBrightness(color) {
  let hex = color;

  if (color.substring(0, 3) === "rgb") {
    const [r, g, b] = color.match(/\d+/g);
    hex = "#" + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
  }

  if (hex === "#000000") return 0;
  if (hex === "#FFFFFF") return 100;

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  return l * 100 / 255;
}


function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}






// CONTRAST CHECKING RULES




function checkContrast() {
  primbuttnColor.addEventListener('input', debounce(() => {
    const primbuttnColorValue = primbuttnColor.value;
    
    primaryButtons.forEach(primaryButton => {
      const primaryColorValue = primaryColor.value;
      const secondaryColorValue = secondaryColor.value;

      const primaryBrightness = getBrightness(primaryColorValue);
      const secondaryBrightness = getBrightness(secondaryColorValue);

      const contrastRatio = getContrastRatio(primbuttnColorValue, primaryColorValue);

      if (primaryBrightness < secondaryBrightness) {
        if (contrastRatio < 4.5) {
          primaryButton.style.color = 'var(--secondary)';
          primbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          primaryButton.style.color = 'var(--primary)';
          primbuttnColorClass.style.color = 'var(--primary)';
        }
      }

      if (primaryBrightness > secondaryBrightness) {
        if (contrastRatio < 4.5) {
          primaryButton.style.color = 'var(--secondary)';
          primbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          primaryButton.style.color = 'var(--primary)';
          primbuttnColorClass.style.color = 'var(--primary)';
        }
      }

    });
  }));


  secbuttnColor.addEventListener('input', debounce(() => {
    const secbuttnColorValue = secbuttnColor.value;
    
    faqQuestions.forEach(faqQuestion => {
      const primaryColorValue = primaryColor.value;
      const secondaryColorValue = secondaryColor.value;

      const primaryBrightness = getBrightness(primaryColorValue);
      const secondaryBrightness = getBrightness(secondaryColorValue);

      const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

      if (primaryBrightness < secondaryBrightness) {
        if (contrastRatio < 4.5) {
          faqQuestion.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          faqQuestion.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

      if (primaryBrightness > secondaryBrightness) {
        if (contrastRatio < 4.5) {
          faqQuestion.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          faqQuestion.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

    });
  }));


  secbuttnColor.addEventListener('input', debounce(() => {
    const secbuttnColorValue = secbuttnColor.value;
    
    secondaryButtons.forEach(secondaryButton => {
      const primaryColorValue = primaryColor.value;
      const secondaryColorValue = secondaryColor.value;

      const primaryBrightness = getBrightness(primaryColorValue);
      const secondaryBrightness = getBrightness(secondaryColorValue);

      const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

      if (primaryBrightness < secondaryBrightness) {
        if (contrastRatio < 4.5) {
          secondaryButton.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          secondaryButton.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

      if (primaryBrightness > secondaryBrightness) {
        if (contrastRatio < 4.5) {
          secondaryButton.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          secondaryButton.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

    });

  }));


  secbuttnColor.addEventListener('input', debounce(() => {
    const secbuttnColorValue = secbuttnColor.value;
    
    partTwo.forEach(partTwo => {
      const primaryColorValue = primaryColor.value;
      const secondaryColorValue = secondaryColor.value;

      const primaryBrightness = getBrightness(primaryColorValue);
      const secondaryBrightness = getBrightness(secondaryColorValue);

      const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

      if (primaryBrightness < secondaryBrightness) {
        if (contrastRatio < 4.5) {
          partTwo.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          partTwo.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

      if (primaryBrightness > secondaryBrightness) {
        if (contrastRatio < 4.5) {
          partTwo.style.color = 'var(--secondary)';
          secbuttnColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          partTwo.style.color = 'var(--primary)';
          secbuttnColorClass.style.color = 'var(--primary)';
        }
      }

    });
  }));


  accentColor.addEventListener('input', debounce(() => {
    const accentColorValue = accentColor.value;
    
      const primaryColorValue = primaryColor.value;
      const secondaryColorValue = secondaryColor.value;

      const primaryBrightness = getBrightness(primaryColorValue);
      const secondaryBrightness = getBrightness(secondaryColorValue);

      const contrastRatio = getContrastRatio(accentColorValue, primaryColorValue);

      if (primaryBrightness < secondaryBrightness) {
        if (contrastRatio < 4.5) {
          accentColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          accentColorClass.style.color = 'var(--primary)';
        }
      }

      if (primaryBrightness > secondaryBrightness) {
        if (contrastRatio < 4.5) {
          accentColorClass.style.color = 'var(--secondary)';
        }
        else if (contrastRatio > 4.5) {
          accentColorClass.style.color = 'var(--primary)';
        }
      }

  }));
  
}

function getBrightnessAbs() {
  const primbuttnColorValue = primbuttnColor.value;
  
  primaryButtons.forEach(primaryButton => {
    const primaryColorValue = primaryColor.value;
    const secondaryColorValue = secondaryColor.value;

    const primaryBrightness = getBrightness(primaryColorValue);
    const secondaryBrightness = getBrightness(secondaryColorValue);

    const contrastRatio = getContrastRatio(primbuttnColorValue, primaryColorValue);

    if (primaryBrightness < secondaryBrightness) {
      if (contrastRatio < 4.5) {
        primaryButton.style.color = 'var(--secondary)';
        primbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        primaryButton.style.color = 'var(--primary)';
        primbuttnColorClass.style.color = 'var(--primary)';
      }
    }

    if (primaryBrightness > secondaryBrightness) {
      if (contrastRatio < 4.5) {
        primaryButton.style.color = 'var(--secondary)';
        primbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        primaryButton.style.color = 'var(--primary)';
        primbuttnColorClass.style.color = 'var(--primary)';
      }
    }

  });

  const secbuttnColorValue = secbuttnColor.value;
  
  faqQuestions.forEach(faqQuestion => {
    const primaryColorValue = primaryColor.value;
    const secondaryColorValue = secondaryColor.value;

    const primaryBrightness = getBrightness(primaryColorValue);
    const secondaryBrightness = getBrightness(secondaryColorValue);

    const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

    if (primaryBrightness < secondaryBrightness) {
      if (contrastRatio < 4.5) {
        faqQuestion.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        faqQuestion.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

    if (primaryBrightness > secondaryBrightness) {
      if (contrastRatio < 4.5) {
        faqQuestion.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        faqQuestion.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

  });
  
  secondaryButtons.forEach(secondaryButton => {
    const primaryColorValue = primaryColor.value;
    const secondaryColorValue = secondaryColor.value;

    const primaryBrightness = getBrightness(primaryColorValue);
    const secondaryBrightness = getBrightness(secondaryColorValue);

    const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

    if (primaryBrightness < secondaryBrightness) {
      if (contrastRatio < 4.5) {
        secondaryButton.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        secondaryButton.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

    if (primaryBrightness > secondaryBrightness) {
      if (contrastRatio < 4.5) {
        secondaryButton.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        secondaryButton.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

  });



  partTwo.forEach(partTwo => {
    const primaryColorValue = primaryColor.value;
    const secondaryColorValue = secondaryColor.value;

    const primaryBrightness = getBrightness(primaryColorValue);
    const secondaryBrightness = getBrightness(secondaryColorValue);

    const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

    if (primaryBrightness < secondaryBrightness) {
      if (contrastRatio < 4.5) {
        partTwo.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        partTwo.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

    if (primaryBrightness > secondaryBrightness) {
      if (contrastRatio < 4.5) {
        partTwo.style.color = 'var(--secondary)';
        secbuttnColorClass.style.color = 'var(--secondary)';
      }
      else if (contrastRatio > 4.5) {
        partTwo.style.color = 'var(--primary)';
        secbuttnColorClass.style.color = 'var(--primary)';
      }
    }

  });


  const accentColorValue = accentColor.value;
      
  const primaryColorValue = primaryColor.value;
  const secondaryColorValue = secondaryColor.value;

  const primaryBrightness = getBrightness(primaryColorValue);
  const secondaryBrightness = getBrightness(secondaryColorValue);

  const contrastRatio = getContrastRatio(accentColorValue, primaryColorValue);

  if (primaryBrightness < secondaryBrightness) {
    if (contrastRatio < 4.5) {
      accentColorClass.style.color = 'var(--secondary)';
    }
    else if (contrastRatio > 4.5) {
      accentColorClass.style.color = 'var(--primary)';
    }
  }

  if (primaryBrightness > secondaryBrightness) {
    if (contrastRatio < 4.5) {
      accentColorClass.style.color = 'var(--secondary)';
    }
    else if (contrastRatio > 4.5) {
      accentColorClass.style.color = 'var(--primary)';
    }
  }
}



// CONTRAST CHECKING FUNCTION

function getContrastRatio(background, foreground) {
  const bg = parseColor(background);
  const fg = parseColor(foreground);

  const l1 = getLuminance(bg);
  const l2 = getLuminance(fg);

  if (l1 > l2) {
    return (l1 + 0.05) / (l2 + 0.05);
  } else {
    return (l2 + 0.05) / (l1 + 0.05);
  }
}



function parseColor(color) {
  const regexRgb = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const matchRgb = regexRgb.exec(color);
  if (matchRgb) {
    return {
      r: parseInt(matchRgb[1]),
      g: parseInt(matchRgb[2]),
      b: parseInt(matchRgb[3])
    };
  }

  const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const matchHex = regexHex.exec(color);
  if (matchHex) {
    const hex = matchHex[1];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return {
      r,
      g,
      b
    };
  }

  throw new Error('Invalid color value: ' + color);
}

function getLuminance(color) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const luminance = 0.2126 * Math.pow(r, 2.2) + 0.7152 * Math.pow(g, 2.2) + 0.0722 * Math.pow(b, 2.2);
  return luminance;
}






// SLUG update based on selected colors

function updateSlug() {
  const primaryColorValue = primaryColor.value;
  const secondaryColorValue = secondaryColor.value;
  const primbuttnColorValue = primbuttnColor.value;
  const secbuttnColorValue = secbuttnColor.value;
  const accentColorValue = accentColor.value;

  const primary = primaryColorValue ? encodeURIComponent(primaryColorValue.replace('#', '')) : '';
  const secondary = secondaryColorValue ? encodeURIComponent(secondaryColorValue.replace('#', '')) : '';
  const primbuttn = primbuttnColorValue ? encodeURIComponent(primbuttnColorValue.replace('#', '')) : '';
  const secbuttn = secbuttnColorValue ? encodeURIComponent(secbuttnColorValue.replace('#', '')) : '';
  const accent = accentColorValue ? encodeURIComponent(accentColorValue.replace('#', '')) : '';

  const slug = `${primary}-${secondary}-${primbuttn}-${secbuttn}-${accent}`;

  window.history.replaceState({}, document.title, `?colors=${slug}`);
}


function applyColorsFromSlug() {
  const searchParams = new URLSearchParams(window.location.search);
  const slug = searchParams.get('colors');

  if (slug) {
    const [primary, secondary, primbuttn, secbuttn, accent] = slug.split('-');

    primaryColor.value = `#${decodeURIComponent(primary)}`;
    secondaryColor.value = `#${decodeURIComponent(secondary)}`;
    primbuttnColor.value = `#${decodeURIComponent(primbuttn)}`;
    secbuttnColor.value = `#${decodeURIComponent(secbuttn)}`;
    accentColor.value = `#${decodeURIComponent(accent)}`;

    document.documentElement.style.setProperty('--primary', primaryColor.value);
    document.documentElement.style.setProperty('--secondary', secondaryColor.value);
    document.documentElement.style.setProperty('--primbuttn', primbuttnColor.value);
    document.documentElement.style.setProperty('--secbuttn', secbuttnColor.value);
    document.documentElement.style.setProperty('--accent', accentColor.value);

    hexInputs[0].value = primaryColor.value;
    hexInputs[1].value = secondaryColor.value;
    hexInputs[2].value = primbuttnColor.value;
    hexInputs[3].value = secbuttnColor.value;
    hexInputs[4].value = accentColor.value;
  } 
  else {
    const primaryColorValue = primaryColor.value;
    const secondaryColorValue = secondaryColor.value;
    const primbuttnColorValue = primbuttnColor.value;
    const secbuttnColorValue = secbuttnColor.value;
    const accentColorValue = accentColor.value;

    const defaultSlug = `${encodeURIComponent(primaryColorValue.replace('#', ''))}-${encodeURIComponent(secondaryColorValue.replace('#', ''))}-${encodeURIComponent(primbuttnColorValue.replace('#', ''))}-${encodeURIComponent(secbuttnColorValue.replace('#', ''))}-${encodeURIComponent(accentColorValue.replace('#', ''))}`;

    window.history.replaceState({}, document.title, `?colors=${defaultSlug}`);
  }

  
  attachColorPickerListeners(colorPickers, hexInputs);

    getBrightnessAbs();

    updateColors();

}

applyColorsFromSlug();

primaryColor.addEventListener('change', updateSlug);
secondaryColor.addEventListener('change', updateSlug);
primbuttnColor.addEventListener('change', updateSlug);
secbuttnColor.addEventListener('change', updateSlug);
accentColor.addEventListener('change', updateSlug);

function updateColors() {
  const primaryColorValue = primaryColor.value.replace(/#|%23/g, '');
  const secondaryColorValue = secondaryColor.value.replace(/#|%23/g, '');
  const primbuttnColorValue = primbuttnColor.value.replace(/#|%23/g, '');
  const secbuttnColorValue = secbuttnColor.value.replace(/#|%23/g, '');
  const accentColorValue = accentColor.value.replace(/#|%23/g, '');

  const slug = `${primaryColorValue}-${secondaryColorValue}-${primbuttnColorValue}-${secbuttnColorValue}-${accentColorValue}`;

  window.history.replaceState({}, document.title, `?colors=${slug}`);
  
  document.documentElement.style.setProperty('--primary', `#${primaryColorValue}`);
  document.documentElement.style.setProperty('--secondary', `#${secondaryColorValue}`);
  document.documentElement.style.setProperty('--primbuttn', `#${primbuttnColorValue}`);
  document.documentElement.style.setProperty('--secbuttn', `#${secbuttnColorValue}`);
  document.documentElement.style.setProperty('--accent', `#${accentColorValue}`);  
}
  
primaryColor.addEventListener('change', updateColors);
secondaryColor.addEventListener('change', updateColors);
primbuttnColor.addEventListener('change', updateColors);
secbuttnColor.addEventListener('change', updateColors);
accentColor.addEventListener('change', updateColors);



// redo and undo 

let urlSlugs = [];
let currentSlugIndex = -1;

function addSlugToArray() {
  let url = window.location.href;
  let slug = url.substring(url.indexOf("?"));
  if (urlSlugs.length === 0 || slug !== urlSlugs[currentSlugIndex]) {
    urlSlugs.splice(currentSlugIndex + 1, urlSlugs.length - currentSlugIndex - 1, slug);
    currentSlugIndex++;
  }

  applyColorsFromSlug(slug);
  updateUndoRedoButtons();
}

window.addEventListener("load", addSlugToArray);

window.addEventListener("popstate", function() {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("colors")) {
    addSlugToArray();
  }
});

window.addEventListener("hashchange", function() {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("colors")) {
    addSlugToArray();
  }
});

let oldColors = "";
setInterval(function() {
  let urlParams = new URLSearchParams(window.location.search);
  let newColors = urlParams.get("colors");
  if (newColors !== null && newColors !== oldColors) {
    addSlugToArray();
    oldColors = newColors;
  }
});

document.getElementById("undo").addEventListener("click", function() {
  if (currentSlugIndex > 0) {
    currentSlugIndex--;
    let slug = urlSlugs[currentSlugIndex];
    let url = window.location.origin + window.location.pathname + slug;
    window.history.pushState({}, "", url);
    
    applyColorsFromSlug(slug);

  }
});



document.getElementById("redo").addEventListener("click", function() {
  if (currentSlugIndex < urlSlugs.length - 1) {
    currentSlugIndex++;
    let slug = urlSlugs[currentSlugIndex];
    let url = window.location.origin + window.location.pathname + slug;
    window.history.pushState({}, "", url);
    
    applyColorsFromSlug(slug);
  }
});


document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z') {
    document.getElementById('undo').click();
  } else if (event.ctrlKey && event.shiftKey && (event.key === 'Z' || event.key === 'z')) {
    document.getElementById('redo').click();
  }
});



function updateUndoRedoButtons() {
  let undoButton = document.getElementById("undo");
  let redoButton = document.getElementById("redo");
  
  if (currentSlugIndex === 0) {
    undoButton.classList.add("disabled");
  } else {
    undoButton.classList.remove("disabled");
  }
  
  if (currentSlugIndex === urlSlugs.length - 1) {
    redoButton.classList.add("disabled");
  } else {
    redoButton.classList.remove("disabled");
  }
}










// // Expand button for toolbar

const expandButtonColors = document.querySelector(".colors-rollout");
const expandButtonFonts = document.querySelector(".fonts-rollout");
const colorsOptions = document.querySelectorAll(".colors-option");
const fontsOptions = document.querySelectorAll(".fonts-option");
const colorSpan = document.querySelector('.color-tools-span');
const fontSpan = document.querySelector('.font-tools-span');

const colorsRolloutIcon = document.querySelector('.colors-rollout svg');
const fontsRolloutIcon = document.querySelector('.fonts-rollout svg');


if (window.innerWidth < 1100) {
  expandButtonFonts.addEventListener("click", () => {
    colorSpan.classList.remove('hide');
  });
} else {
  expandButtonFonts.addEventListener("click", () => {
    colorSpan.classList.add('hide');
  });
}

expandButtonColors.addEventListener("click", () => {
  expandButtonColors.classList.add('hide');
  expandButtonFonts.classList.remove('hide');
  colorSpan.classList.toggle('hide');
  fontSpan.classList.add('hide');
  colorsRolloutIcon.classList.toggle('rotateX');
  fontsRolloutIcon.classList.remove('rotateX');
});

expandButtonFonts.addEventListener("click", () => {
  expandButtonFonts.classList.add('hide');
  expandButtonColors.classList.remove('hide');
  fontSpan.classList.toggle('hide');
  fontsRolloutIcon.classList.toggle('rotateX');
  colorsRolloutIcon.classList.remove('rotateX');
});






// expanding fonts

const textFontsButton = document.getElementById('text-fonts-buttn');
const textFontsBox = document.querySelector('.text-fonts-box');
const textFontsIcon = document.querySelector('.text-fonts-buttn svg');

textFontsButton.addEventListener('click', () => {
  textFontsBox.classList.toggle('open');
  textFontsIcon.classList.toggle('rotate');
  headingFontsBox.classList.remove('open');
  headingFontsIcon.classList.remove('rotate');
});


document.addEventListener('click', (event) => {
  if (!textFontsBox.contains(event.target) && event.target !== textFontsButton) {
    textFontsBox.classList.remove('open');
    textFontsIcon.classList.remove('rotate');
  }
});

const headingFontsButton = document.getElementById('heading-fonts-buttn');
const headingFontsBox = document.querySelector('.heading-fonts-box');
const headingFontsIcon = document.querySelector('.heading-fonts-buttn svg');

headingFontsButton.addEventListener('click', () => {
  headingFontsBox.classList.toggle('open');
  headingFontsIcon.classList.toggle('rotate');
  textFontsBox.classList.remove('open');
  textFontsIcon.classList.remove('rotate');
});

document.addEventListener('click', (event) => {
  if (!headingFontsBox.contains(event.target) && event.target !== headingFontsButton) {
    headingFontsBox.classList.remove('open');
    headingFontsIcon.classList.remove('rotate');
  }
});



// updating links based on slug

function updateLinks(slug) {
  const links = document.querySelectorAll('a:not([href^="#"])');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('https://realtimecolors.com')) {

      const url = new URL(href);
      url.searchParams.set('colors', slug);
      link.setAttribute('href', url.toString());
    } else if (!href.startsWith('https://') && !href.startsWith('mailto:')) {

      const url = new URL(href, window.location.origin);
      url.searchParams.set('colors', slug);
      link.setAttribute('href', url.toString());
    }
  });
}

let currentSlug = '';
const checkForUpdates = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const newSlug = urlParams.get('colors');
  if (newSlug && newSlug !== currentSlug) {
    currentSlug = newSlug;
    updateLinks(currentSlug);
  }
  setTimeout(checkForUpdates, 100);
};
checkForUpdates();


//tipDIv
document.addEventListener("DOMContentLoaded", function() {
  const tipBar = document.getElementById("tip-bar");
  tipBar.classList.add("show");
  setTimeout(function() {
      tipBar.classList.remove("show");
      tipBar.classList.add("hide");
  }, 2000);
});








