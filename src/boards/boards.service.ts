import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'nestjs-prisma';
import { Board, Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BoardCreateInput): Promise<Board> {
    return await this.prisma.board.create({ data });
  }

  async findAll(): Promise<Board[]> {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (board === null) {
      throw new NotFoundException('Board not found!');
    }
    return board;
  }

  async update(id: number, data: Prisma.BoardUpdateInput): Promise<Board> {
    return await this.prisma.board.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Board> {
    return await this.prisma.board.delete({ where: { id }});
  }
}
