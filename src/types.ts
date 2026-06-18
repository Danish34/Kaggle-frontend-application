export enum EffectType {
  None = 'NONE',
  Snowflakes = 'SNOWFLAKES',
  Balloons = 'BALLOONS',
}

export interface SnowflakeParticle {
  id: string;
  x: number; // horizontal percentage (0-100)
  size: number; // width/height in pixels (medium)
  duration: number; // animation duration in seconds
  rotation: number; // initial rotation degree
  wobbleSpeed: number; // horizontal drift speed frequency
  wobbleRange: number; // horizontal drift speed amplitude
}

export interface BalloonParticle {
  id: string;
  x: number; // horizontal percentage (0-100)
  width: number; // pixel width (medium)
  height: number; // pixel height (medium)
  duration: number; // animation ascent speed in seconds
  color: string; // solid or gradient elegant color spec
  rotation: number; // slight initial tilt
  swaySpeed: number; // horizontal sway frequency
  swayRange: number; // horizontal sway amplitude
}
