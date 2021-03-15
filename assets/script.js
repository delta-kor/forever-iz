class UI {
  static followCursor(x, y) {
    const landingCover = document.querySelector('.landing > .cover');
    const { clientWidth: width, clientHeight: height } = document.body;

    const deltaX = (x / width - 0.5) * -3;
    const deltaY = (y / height - 0.5) * -3;

    landingCover.style.left = `${50 + deltaX}%`;
    landingCover.style.top = `${50 + deltaY}%`;
  }

  static highlight(state) {
    const highlight = document.querySelector('.landing > .description > span.highlight');
    state ? highlight.classList.add('active') : highlight.classList.remove('active');
  }
}

window.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  UI.followCursor(x, y);
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function land() {
  await delay(500);
  UI.highlight(true);
}

void land();
