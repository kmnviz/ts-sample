import { IIpController } from '../types/custom';

declare global {
  namespace Express {
    export interface Request {
      controller: IIpController;
    }
  }
}