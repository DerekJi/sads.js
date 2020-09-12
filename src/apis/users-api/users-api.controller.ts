import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersApiService } from './users-api.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './models/user.dto';
import { parseDyanmoModle } from '../../core/utils/base-model-converter.utils';

const controllerName = 'Users';

@ApiTags(controllerName)
@Controller(`api/v1/${controllerName.toLowerCase()}`)
export class UserApiController {
  constructor(private readonly apiService: UsersApiService) {
  }

  @Get(':key')
  async findByKey(@Param('key') key: string): Promise<any> {
    const result = await this.apiService.findByKeyAsync(key);
    return result;
  }

  @Get()
  async findAll(): Promise<any> {
    const result = await this.apiService.findAllAsync();
    return result;
  }
  
  @Post()
  async create(@Body() dto: UserDto): Promise<any> {
    // const result = await this.apiService.createAsync(model);
    // return result;
    const model = parseDyanmoModle(dto);

    return model;
  }

  @Patch()
  async update(@Body() model: UpdateUserDto): Promise<any> {
    // const result = await this.apiService.createAsync(model);
    // return result;

    return {};
  }
}
