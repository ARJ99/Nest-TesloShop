import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Getuser = createParamDecorator(
    (data, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) {
            throw new InternalServerErrorException('User not found in request')
        }
        return (!data) ? user : user[data];
    }
);



