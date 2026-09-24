import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const RawHeader = createParamDecorator((data: unknown, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();
    const rawheader = req.rawHeaders;

    if (!rawheader) {
        throw new InternalServerErrorException('Rawheader are not in the request object')
    }
    return rawheader;
});