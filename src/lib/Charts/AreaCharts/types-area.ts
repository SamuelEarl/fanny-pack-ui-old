// This file will contain types that are only used in the area chart components.

// TODO: Turn this into a generic type to fit different data structures.
export interface Data {
  timestamp: Date;
  uv: number;
  pv: number;
  amt: number;
}
