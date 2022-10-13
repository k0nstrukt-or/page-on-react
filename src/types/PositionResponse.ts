import { Position } from "./Position";

export interface PositionResponse {
  success: Boolean,
  positions: Position[],
}