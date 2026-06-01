// Pure-CSS 3D prism that rolls through N words, one per face, all in the
// accent color. The geometry (face angle + depth) and the roll keyframes are
// computed from the word count so it works cleanly for any number of words —
// no blank faces. Animation is driven by the injected @keyframes below.
export default function CubeWord({ words }: { words: string[] }) {
  const faces = words.filter(Boolean);
  const n = faces.length;
  // Widest word sizes the box so shorter, absolutely-positioned faces aren't
  // clipped (an invisible in-flow sizer).
  const longest = faces.reduce((a, b) => (b.length >= a.length ? b : a), "");

  const step = 360 / n; // degrees between faces
  // Prism apothem: half the face height (~0.44em, tuned to the cap height)
  // divided by tan(pi/n) so adjacent faces meet edge-to-edge for any n.
  const radius = (0.44 / Math.tan(Math.PI / n)).toFixed(4);
  const anim = `cube-roll-${n}`;
  const dur = (n * 2.1).toFixed(1); // ~2.1s per word

  // Build keyframes: in each slot, roll quickly into place then hold.
  const slot = 100 / n;
  const rollPart = 0.42; // fraction of the slot spent turning
  let kf = "";
  for (let k = 0; k < n; k++) {
    const start = (k * slot).toFixed(3);
    const arrive = (k * slot + rollPart * slot).toFixed(3);
    kf += `${start}%{transform:rotateX(${-k * step}deg);animation-timing-function:var(--ease-out-cubic);}`;
    kf += `${arrive}%{transform:rotateX(${-(k + 1) * step}deg);}`;
  }
  kf += `100%{transform:rotateX(${-n * step}deg);}`;

  return (
    <span className="cube">
      <style>{`@keyframes ${anim}{${kf}}`}</style>
      <span
        className="cube__inner"
        style={{ animation: `${anim} ${dur}s infinite` }}
      >
        <span className="cube__sizer" aria-hidden>
          {longest}
        </span>
        {faces.map((word, i) => (
          <span
            key={word + i}
            className="cube__face"
            aria-hidden={i !== 0}
            style={{ transform: `rotateX(${i * step}deg) translateZ(${radius}em)` }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
