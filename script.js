const passwordInput = document.getElementById("passwordInput");
const usernameInput = document.getElementById("usernameInput");
const shyPaws = document.getElementById("shyPaws");
const eyesOpen = document.getElementById("eyesOpen");
const pawsNormal = document.getElementById("pawsNormal");
const dogSvg = document.getElementById("dogSvg");

function setShy(isShy) {
  shyPaws.style.display = isShy ? "block" : "none";
  eyesOpen.style.display = isShy ? "none" : "block";
  pawsNormal.style.display = isShy ? "none" : "block";
}

passwordInput.addEventListener("focus", () => setShy(true));
passwordInput.addEventListener("blur", () => setShy(false));
usernameInput.addEventListener("focus", () => {
  setShy(false);
  dogSvg.classList.add("ears-perked");
});
usernameInput.addEventListener("blur", () =>
  dogSvg.classList.remove("ears-perked"),
);

document.addEventListener("mousemove", (e) => {
  if (document.activeElement === passwordInput) return;
  trackEyes(e.clientX, e.clientY);
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (document.activeElement === passwordInput) return;
    const t = e.touches[0];
    if (t) trackEyes(t.clientX, t.clientY);
  },
  { passive: true },
);

function trackEyes(x, y) {
  const rect = dogSvg.getBoundingClientRect();
  const cx = rect.left + rect.width * 0.5;
  const cy = rect.top + rect.height * 0.5;
  const angle = Math.atan2(y - cy, x - cx);
  const dist = 3;
  const pupils = eyesOpen.querySelectorAll('circle[r="5"]');
  const offsets = [
    { bx: 48, by: 61 },
    { bx: 82, by: 61 },
  ];
  pupils.forEach((p, i) => {
    p.setAttribute("cx", offsets[i].bx + Math.cos(angle) * dist);
    p.setAttribute("cy", offsets[i].by + Math.sin(angle) * dist);
  });
}
