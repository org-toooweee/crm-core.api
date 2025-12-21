import { IdResponse } from '@libs/api/id.response';
import { ApiProperty } from '@nestjs/swagger';

export interface BaseResponseProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseResponse extends IdResponse {
  constructor(props: BaseResponseProps) {
    super(props.id);
    this.createdAt = new Date(props.createdAt).toISOString();
    this.updatedAt = new Date(props.createdAt).toISOString();
  }

  @ApiProperty({ example: '2025-11-24T17:43:15.970Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-11-24T17:43:15.970Z' })
  updatedAt: string;
}
