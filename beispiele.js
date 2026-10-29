document.querySelectorAll('.preview-live iframe').forEach((frame) => {
  frame.addEventListener('error', () => {
    frame.parentElement.classList.add('preview-live--unavailable');
  });
});
