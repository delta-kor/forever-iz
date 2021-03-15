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
    // currentSection = 2;

    document.getElementsByClassName('section')[currentSection].scrollIntoView({
      behavior: 'smooth',
      top: window.innerHeight,
    });

    void UI.move(currentSection);
    currentSection++;
  }

  static async move(index) {
    const lines = document.querySelectorAll('.fixed > .content > .line');
    const scroll = document.querySelector('.fixed > .scroll');

    scroll.classList.remove('active');
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

      await delay(1000);
      scroll.classList.add('active');
    }

    if (index === 1) {
      lines[0].innerHTML = '꿈이라도 좋아 빨갛게 칠해봐';
      lines[1].innerHTML = '언제든 깨어날 수 있게 내가 불러 줄게';

      audio.src = 'music/rose.mp3';

      await delay(500);
      await audio.play();

      await delay(500);
      lines[0].classList.add('active');

      await delay(3800);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 2) {
      lines[0].innerHTML = '힘들었던 시간은 이제 사라져 버리고';
      lines[1].innerHTML = '밝은 빛이 되어 노래 할게';

      audio.src = 'music/memory.mp3';

      await delay(500);
      await audio.play();

      await delay(500);
      lines[0].classList.add('active');

      await delay(4900);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
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

document.querySelectorAll('.scroll').forEach(element => {
  element.addEventListener('click', async () => {
    if (!element.classList.contains('active')) return;

    const lines = document.querySelectorAll('.fixed > .content > .line');
    const scroll = document.querySelector('.fixed > .scroll');

    scroll.classList.remove('active');
    lines.forEach(element => element.classList.remove('active'));

    if (element.dataset.type !== 'top') {
      for (let i = 0; i < 99; i++) {
        await delay(5);
        audio.volume -= 1 / 100;
      }
      audio.pause();
      audio.volume = 1;
    }

    UI.scroll();
  });
});
