// Inställningar
// -------------------------------------------
const bounceSpeed = 2
const colorShiftSpeed = 0.1
const delayPerCharacter = 0.3
const yDistance = 2
const rotation = 10
// -------------------------------------------


// Kod för "Rainbow" animationen...
// -------------------------------------------
const containers = document.querySelectorAll('[data-rainbow]')
containers.forEach(e => createRainbowEffect(e))

function createRainbowEffect(container) {
  const text = container.innerText;
  container.innerHTML = '';

  const characters = text.split('').map(character => {
    const characterElement = document.createElement('span')
    characterElement.innerHTML = character == ' ' ? '&nbsp;' : character
    container.append(characterElement)
    return characterElement
  });

  let t = characters.length * delayPerCharacter;

  setInterval(() => {
    t += 1/60
    for(let i = 0; i < characters.length; i++) {
      const tWithOffset = t - i * delayPerCharacter
      const y = Math.sin(tWithOffset * -bounceSpeed) * yDistance
      const r = Math.cos(tWithOffset * -bounceSpeed) * rotation
      characters[i].style = `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; display: inline-block; transform: rotate(${r}deg) translateY(${y}px); color: ${hsvToRgb((tWithOffset * colorShiftSpeed) % 1, 0.75, 1)}`
    }
  }, 1/60)
}

function hsvToRgb(h, s, v) {
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}
