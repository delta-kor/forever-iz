const landingCover = document.querySelector('.landing > .cover');

window.addEventListener('mousemove', e => {
  const { clientWidth: width, clientHeight: height } = document.body;
  const { clientX: x, clientY: y } = e;

  const deltaX = (x / width - 0.5) * -3;
  const deltaY = (y / height - 0.5) * -3;

  landingCover.style.left = `${50 + deltaX}%`;
  landingCover.style.top = `${50 + deltaY}%`;
});
