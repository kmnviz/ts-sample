import { IIpController } from '../types/custom';
import IpService from '../services/ipService';

class IpController implements IIpController {
  constructor(private readonly service: IpService) {}

  async lookupIp(ipAddress: string): Promise<void> {
    try {
      return await this.service.lookupIp(ipAddress);
    } catch (error) {
      throw error;
    }
  }

  async removeIpCache(ipAddress: string): Promise<void> {
    try {
      await this.service.removeIpCache(ipAddress);
    } catch (error) {
      throw error;
    }
  }
}

export default IpController;
