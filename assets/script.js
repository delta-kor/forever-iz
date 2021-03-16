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
    // currentSection = 6;

    document.getElementsByClassName('section')[currentSection].scrollIntoView({
      behavior: 'smooth',
      top: window.innerHeight,
    });

    void UI.move(currentSection);
    currentSection++;
  }

  static setMusic(title, album) {
    const music = document.querySelector('.fixed > .music');
    music.querySelector('.title').textContent = title;
    music.querySelector('.album').textContent = album;
  }

  static async move(index) {
    const lines = document.querySelectorAll('.fixed > .content > .line');
    const scroll = document.querySelector('.fixed > .scroll');
    const music = document.querySelector('.fixed > .music');

    scroll.classList.remove('active');
    lines.forEach(element => element.classList.remove('active'));

    if (index === 0) {
      UI.setMusic('아름다운 색', 'COLOR*IZ');

      lines[0].innerHTML = 'Have you ever seen anything?';
      lines[1].innerHTML = 'Have you ever seen this <span class="highlight">color?</span>';
      const highlight = document.querySelector('.fixed > .content > .line > .highlight');

      audio.src = 'music/colors.mp3';

      await audio.play();
      audio.currentTime = 1;

      await delay(800);
      lines[0].classList.add('active');
      music.classList.add('active');

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
      UI.setMusic('라비앙로즈', 'COLOR*IZ');

      lines[0].innerHTML = '꿈이라도 좋아 빨갛게 칠해봐';
      lines[1].innerHTML = '언제든 깨어날 수 있게 내가 불러 줄게';

      audio.src = 'music/rose.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(500);
      lines[0].classList.add('active');

      await delay(3800);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 2) {
      UI.setMusic('비밀의 시간', 'COLOR*IZ');

      lines[0].innerHTML = '힘들었던 시간은 이제 사라져 버리고';
      lines[1].innerHTML = '밝은 빛이 되어 노래 할게';

      audio.src = 'music/memory.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(500);
      lines[0].classList.add('active');

      await delay(4900);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 3) {
      UI.setMusic('비올레타', 'HEART*IZ');

      lines[0].innerHTML = '있는 그대로 지금';
      lines[1].innerHTML = '느낌 그대로 내게 널 보여줘';

      audio.src = 'music/violeta.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(400);
      lines[0].classList.add('active');

      await delay(1800);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 4) {
      UI.setMusic('Really Like You', 'HEART*IZ');

      lines[0].innerHTML = 'Really Like You';
      lines[1].innerHTML = '내 손을 꼭 잡아줘';

      audio.src = 'music/really.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(1800);
      lines[1].classList.add('active');

      await delay(1600);
      lines[0].classList.remove('active');
      lines[1].classList.remove('active');

      await delay(500);
      lines[0].innerHTML = '이 손 놓지 말아줘';
      lines[1].innerHTML = '따스한 두 손을 잡고서 꿈꿀 수 있게';
      lines[0].classList.add('active');

      await delay(2100);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 5) {
      UI.setMusic('기분 좋은 안녕', 'HEART*IZ');

      lines[0].innerHTML = '함께했던 순간이 널 행복하게 할 거야';
      lines[1].innerHTML = '기쁘게 안녕을 말할래';

      audio.src = 'music/bye.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(3800);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 6) {
      UI.setMusic('FIESTA', 'BLOOM*IZ');

      lines[0].innerHTML = '내 맘에 태양을 꾹 삼킨 채';
      lines[1].innerHTML = '영원토록 뜨겁게 지지 않을게';

      audio.src = 'music/fiesta.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(800);
      lines[0].classList.add('active');

      await delay(2900);
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
    const music = document.querySelector('.fixed > .music');

    scroll.classList.remove('active');
    lines.forEach(element => element.classList.remove('active'));

    music.classList.remove('active');

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
