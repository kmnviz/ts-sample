import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
import IpRepository from './repositories/ipRepository.ts';
import IpService from './services/ipService.ts';
import IpController from './controllers/ipController.ts';
import IpRoutes from './routes/ipRoutes.ts';
import { IIpController } from './types/custom';

if (!process.env.MONGO_DB_URI || typeof process.env.MONGO_DB_URI !== 'string') {
    console.log('MongoDB ENV Variable is not set!');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_DB_URI;

const client = new MongoClient(mongoUri);

const ipRepository = new IpRepository(client);
const ipService = new IpService(ipRepository, process.env.IPWHOIS_API);
const ipController = new IpController(ipService);

(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.use(express.json());
    app.use((req, res, next) => {
        req.controller = ipController as IIpController;
        next();
    });
    app.use('/ip', IpRoutes);

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed. error:', error);
  }
})();
