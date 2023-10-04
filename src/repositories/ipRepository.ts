import { Collection, MongoClient } from 'mongodb';

class IpRepository {
  private readonly collection: Collection;

  constructor(client: MongoClient) {
    this.collection = client.db().collection('ipInfo');
  }

  async findIpInfo(ipAddress: string): Promise<any | null> {
    return this.collection.findOne({ ipAddress });
  }

  async saveIpInfo(ipInfo: any): Promise<void> {
    const expirationTime = new Date(Date.now() + 60 * 1000);
    await this.collection.updateOne(
      {},
      { $set: { ...{ttl: expirationTime}, ...ipInfo } },
      { upsert: true }
    );
    await this.collection.createIndex({ ttl: 1 }, { expireAfterSeconds: 0 });
  }

  async removeIpInfo(ipAddress: string): Promise<void> {
    await this.collection.deleteOne({ ip: ipAddress });
  }
}

export default IpRepository;
