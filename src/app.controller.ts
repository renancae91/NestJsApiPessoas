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
  @HttpCode(200)
  async getHello() {
    const data = await this.databaseService.query(`select * from pessoas`);
    return data.rows;
  }
  @Post('pessoas')
  @HttpCode(200)
  create(@Body() createPessoa: any) {
    const { nome, idade, nacionalidade } = createPessoa
    const values = [nome, idade, nacionalidade];
    try {
      this.databaseService.query(
        `insert into pessoas ( nome, idade, nacionalidade) VALUES ( $1, $2, $3 )`,
        values,
      );
      return { menssagem: 'incluido com sucesso' };
    } catch {
      return { menssagem: 'erro ao icluir' };
    }
  }
  @Patch('pessoas/:id')
  @HttpCode(200)
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
  @HttpCode(200)
  remove(@Param('id') id: string) {
    const values = [id];

    this.databaseService.query(`delete from pessoas WHERE id = $1`, values);
  }
}


