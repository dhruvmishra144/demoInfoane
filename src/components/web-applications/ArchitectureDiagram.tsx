/**
 * Isometric cloud-architecture diagram drawn in code: two stacked zones, a row
 * of server racks above, orange compute nodes below, linked by orange traces.
 * Decorative; the surrounding copy carries the meaning.
 */

const K = 17;
const OX = 280;
const OY = 190;

/** Project an isometric (x, y, z) grid point to screen space. */
function p(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * 0.866 * K, OY + (x + y) * 0.5 * K - z * K];
}

const pts = (list: [number, number][]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

function Box({
  x,
  y,
  z,
  w,
  d,
  h,
  top,
  left,
  right,
  stroke = "#7d8798",
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
}) {
  return (
    <g stroke={stroke} strokeWidth="0.8" strokeLinejoin="round">
      <polygon points={pts([p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)])} fill={left} />
      <polygon points={pts([p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)])} fill={right} />
      <polygon points={pts([p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)])} fill={top} />
    </g>
  );
}

const racks = [0, 1, 2, 3, 4];
const nodes: [number, number][] = [
  [2.2, 2],
  [5.2, 2],
  [2.2, 5.2],
  [5.2, 5.2],
];

export function ArchitectureDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 560 400" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <pattern id="wa-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#dbe1ea" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="560" height="400" fill="url(#wa-grid)" opacity="0.7" />
      <text x="280" y="22" textAnchor="middle" fontSize="9" letterSpacing="1" fill="#3b3f52" fontWeight="600">
        {label.toUpperCase()}
      </text>

      {/* Upper zone: compute racks (z = 7). */}
      <g>
        <Box x={0} y={0} z={5.5} w={9} d={3} h={0.35} top="#ffffff" left="#e3e8f0" right="#d3dae6" />
        {racks.map((i) => (
          <Box key={i} x={0.5 + i * 1.7} y={0.6} z={5.85} w={1.1} d={1.6} h={2.4} top="#f4f6fa" left="#cfd6e2" right="#b9c2d2" />
        ))}
      </g>

      {/* Lower zone: elastic database cluster (z = 0..). */}
      <Box x={-1} y={-1} z={0} w={11} d={11} h={0.45} top="#ffffff" left="#e3e8f0" right="#d3dae6" />
      <Box x={0} y={0} z={0.45} w={9} d={9} h={0.25} top="#eef1f6" left="#d8dfea" right="#c8d0de" />
      {nodes.map(([x, y]) => (
        <Box key={`${x}-${y}`} x={x} y={y} z={0.7} w={1.7} d={1.7} h={1.5} top="#ff9a7c" left="#ff6b4a" right="#e4512f" stroke="#c8431f" />
      ))}
      <Box x={0.6} y={7} z={0.7} w={1.2} d={1.2} h={0.8} top="#f4f6fa" left="#cfd6e2" right="#b9c2d2" />
      <Box x={7.3} y={0.4} z={0.7} w={1.2} d={1.2} h={2} top="#f4f6fa" left="#cfd6e2" right="#b9c2d2" />
      <Box x={7.2} y={6.8} z={0.7} w={1.4} d={1.4} h={2.6} top="#f4f6fa" left="#cfd6e2" right="#b9c2d2" />

      {/* Orange traces between the nodes and up to the racks. */}
      <g fill="none" stroke="#ff6b4a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={pts([p(3, 2.9, 2.2), p(3, 5.9, 2.2), p(6, 5.9, 2.2), p(6, 2.9, 2.2), p(3, 2.9, 2.2)])} strokeDasharray="4 3" />
        <polyline points={pts([p(4.5, 3, 0.7), p(4.5, 4.4, 0.7)])} />
        <polyline points={pts([p(4.5, 3, 5.5), p(4.5, 3, 2.2)])} strokeDasharray="3 3" />
      </g>
      <g fill="#ff6b4a">
        {[p(3, 2.9, 2.2), p(6, 2.9, 2.2), p(3, 5.9, 2.2), p(6, 5.9, 2.2)].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>
      <g fontSize="6.5" fill="#6a7285" letterSpacing="0.5">
        <text x="70" y="102">AWS AZ / ZONE A</text>
        <text x="410" y="86">CLOUD COMPUTE</text>
        <text x="64" y="204">ELASTIC DATABASE CLUSTER</text>
        <text x="420" y="196">ZONE B</text>
        <text x="236" y="290">VIRTUAL PRIVATE CLOUD (VPC)</text>
      </g>
    </svg>
  );
}
