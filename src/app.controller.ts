import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './service/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private databaseService: DatabaseService,
  ) {}

  @Get('pessoas')
  async getHello() {
    const data = await this.databaseService.query(`select * from pessoas`);
    return data.rows;
  }
  @Post('pessoas')
  create(@Body() createPessoa: any) {
    const { nome, idade, nacionalidade } = createPessoa
    const values = [nome, idade, nacionalidade];
    return this.databaseService.query(
      `insert into pessoas ( nome, idade, nacionalidade) VALUES ( $1, $2, $3 )`,
      values,
    );
  }
  @Patch('pessoas/:id')
  @HttpCode(202)
  update(@Param('id') id: string, @Body() updatePessoa: any) {
    const { nome, idade, nacionalidade } = updatePessoa;
    const values = [nome, idade, nacionalidade, id];
    try {
      this.databaseService.query(
        `update pessoas set nome = $1, idade = $2, nacionalidade = $3 WHERE id = $4`,
        values,
      ); 
      return { menssagem: 'alterado com sucesso'}
    } catch {
      return { menssagem: 'erro ao editar' };
    }
  }

  @Delete('pessoas/:id')
  remove(@Param('id') id: string) {
    const values = [id];

    this.databaseService.query(`delete from pessoas WHERE id = $1`, values);
  }
}


