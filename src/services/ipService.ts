import axios from 'axios';
import IpRepository from '../repositories/ipRepository';

class IpService {
  constructor(private readonly repository: IpRepository, public ipWhoIsApiUrl: string) {
    this.ipWhoIsApiUrl = ipWhoIsApiUrl;
  }

  async lookupIp(ipAddress: string): Promise<any> {
    const dbRecord = await this.repository.findIpInfo(ipAddress);

    if (dbRecord) {
      delete dbRecord._id;
      return { data: dbRecord };
    }

    try {
      const response = await axios.get(`${this.ipWhoIsApiUrl}/${ipAddress}`);
      const responseData = response.data;

      await this.repository.saveIpInfo(responseData);

      return { data: responseData };
    } catch (error) {
      throw error;
    }
  }

  async removeIpCache(ipAddress: string): Promise<void> {
    try {
      return await this.repository.removeIpInfo(ipAddress);
    } catch (error) {
      throw error;
    }
  }
}

export default IpService;
