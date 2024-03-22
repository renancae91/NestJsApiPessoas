import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  config = dotenv.config();

  getDatabaseHost(): string {
    return this.config.parsed.PGHOST;
  }

  getDatabaseName(): string {
    return this.config.parsed.PGDATABASE;
  }

  getDatabaseUser(): string {
    return this.config.parsed.PGUSER;
  }

  getDatabasePassword(): string {
    return this.config.parsed.PGPASSWORD;
  }

  getEndpointId(): string {
    return this.config.parsed.ENDPOINT_ID;
  }
}