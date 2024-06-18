import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
  status: boolean;
}

export class ResponseInterceptor<T> {
  data: T;

  @ApiProperty()
  status: boolean;
}

export const ApiOkResponseCustom = <TModel extends Type<any>>(
  model: TModel,
  isArray = false,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseInterceptor, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseInterceptor) },
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : {
                    $ref: getSchemaPath(model),
                  },
            },
          },
        ],
      },
    }),
  );
};

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    return next.handle().pipe(map((data) => ({ data, status: true })));
  }
}
