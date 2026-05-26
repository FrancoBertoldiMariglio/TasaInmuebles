import React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

export interface IsotipoProps {
  size?: number;
}

/**
 * Logo de 4 pétalos con gradiente coral → rojo → teal.
 * Cada pétalo es un óvalo rotado 45° entre sí alrededor del centro.
 * Un círculo blanco cubre el centro.
 */
export default function Isotipo({ size = 40 }: IsotipoProps) {
  const cx = size / 2;
  const cy = size / 2;

  // Petal geometry: elongated ellipse from center toward each cardinal direction
  const r = size * 0.26; // petal major radius
  const rMinor = size * 0.13; // petal minor radius

  // Build petal paths using cubic bezier approximation of an ellipse rotated at angle deg
  function petalPath(angleDeg: number): string {
    const angle = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // tip of the petal (along the major axis)
    const tx = cx + r * cos;
    const ty = cy + r * sin;

    // perpendicular unit vector
    const px = -sin;
    const py = cos;

    // control point distance for bezier
    const k = 0.55; // standard bezier circle approximation constant

    const cp1x = cx + k * r * cos + k * rMinor * px;
    const cp1y = cy + k * r * sin + k * rMinor * py;
    const cp2x = tx - k * r * cos + k * rMinor * px;
    const cp2y = ty - k * r * sin + k * rMinor * py;

    const cp3x = tx - k * r * cos - k * rMinor * px;
    const cp3y = ty - k * r * sin - k * rMinor * py;
    const cp4x = cx + k * r * cos - k * rMinor * px;
    const cp4y = cy + k * r * sin - k * rMinor * py;

    return [
      `M ${cx} ${cy}`,
      `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}`,
      `C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${cx} ${cy}`,
      'Z',
    ].join(' ');
  }

  const petalAngles = [270, 0, 90, 180]; // top, right, bottom, left

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <LinearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FB923C" />
          <Stop offset="50%" stopColor="#F87171" />
          <Stop offset="100%" stopColor="#2DD4BF" />
        </LinearGradient>
      </Defs>

      {petalAngles.map((angle) => (
        <Path
          key={angle}
          d={petalPath(angle)}
          fill="url(#petalGrad)"
          opacity={0.92}
        />
      ))}

      {/* Central white circle */}
      <Circle cx={cx} cy={cy} r={size * 0.14} fill="#FFFFFF" />
    </Svg>
  );
}
