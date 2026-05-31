// Pure-CSS 3D cube that rotates a word through alternating white/orange faces.
// No client JS needed — the animation lives in globals.css (.cube / @keyframes cube-spin).
export default function CubeWord({ text }: { text: string }) {
  return (
    <span className="cube">
      <span className="cube__inner">
        <span className="cube__face cube__face--a">{text}</span>
        <span className="cube__face cube__face--b" aria-hidden>
          {text}
        </span>
        <span className="cube__face cube__face--c" aria-hidden>
          {text}
        </span>
        <span className="cube__face cube__face--d" aria-hidden>
          {text}
        </span>
      </span>
    </span>
  );
}
