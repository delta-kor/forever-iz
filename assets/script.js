let currentSection = 0;
const audio = new Audio();
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

class UI {
  static followCursor(x, y) {
    const landingCover = document.querySelector('.landing > .cover');
    const { innerWidth: width, innerHeight: height } = window;

    const deltaX = (x / width - 0.5) * -3;
    const deltaY = (y / height - 0.5) * -3;

    landingCover.style.left = `${50 + deltaX}%`;
    landingCover.style.top = `${50 + deltaY}%`;
  }

  static highlight(state) {
    const highlight = document.querySelector('.landing > .description > span.highlight');
    state ? highlight.classList.add('active') : highlight.classList.remove('active');
  }

  static scroll() {
    if (currentSection === 0) {
      document.getElementsByClassName('section')[currentSection].scrollIntoView({
        behavior: 'smooth',
        top: window.innerHeight,
      });
      void UI.move(0);
      return true;
    }
  }

  static async move(index) {
    const lines = document.querySelectorAll('.fixed > .content > .line');
    lines.forEach(element => element.classList.remove('active'));

    if (index === 0) {
      lines[0].innerHTML = 'Have you ever seen anything?';
      lines[1].innerHTML = 'Have you ever seen this <span class="highlight">color?</span>';
      const highlight = document.querySelector('.fixed > .content > .line > .highlight');

      audio.src = 'music/colors.mp3';

      await audio.play();
      audio.currentTime = 1;

      await delay(800);
      lines[0].classList.add('active');

      await delay(4800);
      lines[1].classList.add('active');

      await delay(1350);
      highlight.classList.add('active');

      await delay(100);
      document.querySelector('.section > .cover').classList.add('active');
    }
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function land() {
  await delay(500);
  UI.highlight(true);
}

void land();

window.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  UI.followCursor(x, y);
});

for (const scroll of document.getElementsByClassName('scroll')) {
  scroll.addEventListener('click', () => {
    UI.scroll();
  });
}
