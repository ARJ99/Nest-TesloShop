import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

export const Headers  = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    
    const req = ctx.switchToHttp().getRequest();
        const headers = req.headers;
    
        if (!headers) {
            throw new InternalServerErrorException('Rawheader are not in the request object')
        }
        return headers;
});