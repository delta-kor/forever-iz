let currentSection = 0;
const totalSection = document.querySelectorAll('.section').length;
const audio = new Audio();
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const search = new URLSearchParams(location.search);
const isEnding = search.has('ending');

const version = document.querySelector('.startup > .version');
version.textContent = 'vc54-210319';

if (isEnding) version.textContent += ' (#ending)';

const session = Math.random().toString(36).substring(3);
function log(type) {
  void fetch(`./log.json?type=${type}&iz=${session}`);
}

class UI {
  static fullScreen(full) {
    const doc = document.documentElement;
    if (full) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.mozRequestFullScreen) {
        doc.mozRequestFullScreen();
      } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
      } else if (doc.msRequestFullscreen) {
        doc.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

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
    document.querySelector('.landing > .scroll').classList.add('active');
    document.querySelector('.landing > .cover').classList.add('light');
  }

  static async slowJourney() {
    log('journey');

    document.body.classList.add('journey');

    audio.src = 'music/slow.mp3';
    await audio.play();

    const element = document.querySelector('.fixed > .lyrics');
    const timestamps = Object.keys(lyrics);
    const timeDelta = [];

    let index = 0;
    for (const timestamp of timestamps) {
      const delta = timestamps[index + 1] - timestamp;
      timeDelta.push(delta);
      index++;
    }

    await delay(5000);
    UI.setMusic('느린 여행', 'One-reeler / Act IV');
    document.querySelector('.fixed > .music').classList.add('left', 'active');
    document.querySelector('.fixed > .izone').classList.add('active');

    await delay(timestamps[0] - 5000);
    element.classList.add('active');
    document.querySelectorAll('.sns').forEach(element => element.classList.add('active'));

    log('journey_lyrics');

    let current = 1;
    for await (const delta of timeDelta) {
      await delay(delta);
      element.textContent = lyrics[timestamps[current]];
      current++;
    }
  }

  static scroll() {
    if (currentSection === 13) {
      const indicator = document.querySelector('.fixed > .indicator');

      indicator.style.width = '100vw';
      delay(500).then(() => {
        indicator.style.opacity = '0';
      });

      const image = document.querySelector('.section.last > .cover');
      image.classList.remove('active');

      void UI.slowJourney();
      return true;
    }

    log(`scroll_${currentSection}`);

    document.getElementsByClassName('section')[currentSection].scrollIntoView({
      behavior: 'smooth',
      top: window.innerHeight,
    });

    void UI.move(currentSection);
    currentSection++;

    document.querySelector('.fixed > .indicator').style.width = `${
      ((currentSection - 1) / totalSection) * 100
    }vw`;
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

      await delay(1500);
      await audio.play();

      await delay(300);
      lines[0].classList.add('active');
      music.classList.add('active');
      UI.displayScreen();

      await delay(4000);
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

      await delay(0);
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

      await delay(0);
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

      await delay(0);
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

      await delay(2700);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 7) {
      UI.setMusic('SPACESHIP', 'BLOOM*IZ');

      lines[0].innerHTML = '세상은 넓고 우리는 달려갈 거야';
      lines[1].innerHTML = '하나의 꿈을 그리는 시간은 빛이 될 거야';

      audio.src = 'music/spaceship.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(4900);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 8) {
      UI.setMusic('YOU & I', 'BLOOM*IZ');

      lines[0].innerHTML = '떨리는 네 손잡아 줄게 온기 돼줄게';
      lines[1].innerHTML = '기억해 지금 이 순간의 우리를';

      audio.src = 'music/uni.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(4200);
      lines[1].classList.add('active');

      await delay(3000);
      scroll.classList.add('active');
    }

    if (index === 9) {
      UI.setMusic('언젠가 우리의 밤도 지나가겠죠', 'BLOOM*IZ');

      lines[0].innerHTML = '언젠가 우리의';
      lines[1].innerHTML = '밤도 모두 지나가겠죠';

      audio.src = 'music/someday.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(0);
      lines[0].classList.add('active');

      await delay(2500);
      lines[1].classList.add('active');

      await delay(2000);
      scroll.classList.add('active');
    }

    if (index === 10) {
      UI.setMusic('환상동화', 'Oneiric Diary');

      lines[0].innerHTML = '상상했던 모든 순간들이<br>눈앞에 다가올 그때까지';
      lines[1].innerHTML = '너를 위한 춤을 춰';

      audio.src = 'music/swan.mp3';

      await delay(500);
      await audio.play();
      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(4000);
      lines[1].classList.add('active');

      await delay(2000);
      scroll.classList.add('active');
    }

    if (index === 11) {
      UI.setMusic('With*One', 'Oneiric Diary');

      lines[0].innerHTML = '예쁘던 우리 기억들로 꽃이 필 거야';
      lines[1].innerHTML = '설레던 우리 만남처럼';

      audio.src = 'music/with1.mp3';

      await delay(500);
      await audio.play();

      music.classList.add('active');

      await delay(100);
      lines[0].classList.add('active');

      await delay(4800);
      lines[1].classList.add('active');

      await delay(2000);
      scroll.classList.add('active');
    }

    if (index === 12) {
      UI.setMusic('Panorama', 'One-reeler / Act IV');

      lines[0].innerHTML = '깊은 어둠 속 빛나는 별처럼';
      lines[1].innerHTML = '우린 어디서든 서로 알아볼 수 있어';

      audio.src = 'music/pano.mp3';

      await delay(500);
      await audio.play();

      music.classList.add('active');

      await delay(1500);
      lines[0].classList.add('active');

      await delay(3200);
      lines[1].classList.add('active');

      await delay(2500);
      scroll.classList.add('active');
    }
  }

  static hideStartUp() {
    document.querySelector('.startup').classList.add('hide');
    if (isEnding) {
      document.querySelector('.landing').classList.add('hide');
      UI.displayScreen('replay');
      return UI.slowJourney();
    }
    UI.fullScreen(true);
    return land();
  }

  static updateLoadIndicator(percent) {
    document.querySelector('.startup > .button > .indicator').style.width = `${percent * 100}%`;
    if (percent === 1) {
      document.querySelector('.startup > .button > .content').textContent = '시작하기';
      const button = document.querySelector('.startup > .button');
      button.style.cursor = 'pointer';
      button.addEventListener('click', UI.hideStartUp);
    }
  }

  static displayScreen(type) {
    const screen = document.querySelector('.fixed > .screen');

    if (type === 'replay') {
      screen.addEventListener('load', () => {
        screen.classList.add('active');
      });
      screen.src = 'assets/icon/replay.svg';
      screen.dataset.type = 'replay';
    } else {
      screen.classList.add('active');
    }
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function land() {
  log('land');

  audio.src = 'music/universe.mp3';

  await audio.play();
  audio.currentTime = 3;

  await delay(1800);
  UI.highlight(true);
}

window.addEventListener('resize', () => {
  if (currentSection === 0) return window.scrollTo(0, 0);
  document.getElementsByClassName('section')[currentSection - 1].scrollIntoView({
    top: window.innerHeight,
  });
});

window.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  UI.followCursor(x, y);
});

document.querySelectorAll('.scroll').forEach(element => {
  element.addEventListener('click', async () => {
    if (!element.classList.contains('active')) return;

    const lines = document.querySelectorAll('.fixed > .content > .line');
    const music = document.querySelector('.fixed > .music');

    element.classList.remove('active');
    lines.forEach(element => element.classList.remove('active'));

    music.classList.remove('active');

    for (let i = 0; i < 99; i++) {
      await delay(5);
      audio.volume -= 1 / 100;
    }
    audio.pause();
    audio.volume = 1;

    UI.scroll();
  });
});

document.querySelector('.fixed > .screen').addEventListener('click', e => {
  if (e.target.dataset.type === 'replay') {
    log('replay');
    return (location.href = './');
  }
  const isFullScreen = document.webkitIsFullScreen || document.mozFullScreen || false;
  log(`fullscreen_${!isFullScreen}`);
  UI.fullScreen(!isFullScreen);
});

async function load() {
  log('load');

  let passed = false;
  let loaded = 0;

  const images = [...document.querySelectorAll('img.cover')];
  const total = images.length;

  function onLoaded() {
    loaded++;
    if (passed) return false;
    UI.updateLoadIndicator(loaded / total);
  }

  for (/** @type {HTMLImageElement} */ const image of images) {
    if (image.complete) {
      onLoaded();
      continue;
    }

    image.addEventListener('load', onLoaded);
  }

  delay(5000).then(() => {
    UI.updateLoadIndicator(1);
    passed = true;
    window.scroll(0, 0);
  });
}

void load();
