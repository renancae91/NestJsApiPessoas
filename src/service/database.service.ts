import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;
  private config = dotenv.config();

  constructor() {
    this.pool = new Pool({
      connectionString: this.config.parsed.DATABASE_URL, // Use a variável de ambiente para a string de conexão
      ssl: {
        rejectUnauthorized: false, // Opção para evitar erros de autenticação no PostgreSQL
      },
    });
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    try {
      return await client.query(sql, params);
    } finally {
      client.release();
    }
  }
}