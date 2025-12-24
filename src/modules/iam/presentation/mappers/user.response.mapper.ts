import { ResponseMapper } from '@libs/ddd/response.mapper.interface';
import { UserEntity } from '../../domain/user/entities/user.entity';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserResponseMapper implements ResponseMapper<
  UserEntity,
  UserResponseDto
> {
  toResponse(entity: UserEntity) {
    const props = entity.getProps();
    const response = new UserResponseDto(props);
    response.email = props.email.value;
    response.role = props.role.value;
    response.createdAt = props.createdAt.toString();
    response.updatedAt = props.updatedAt.toString();
    return response;
  }
}
