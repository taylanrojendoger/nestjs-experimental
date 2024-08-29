// NestJS
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

// Express
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    private readonly logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`METHOD=${req.method}:ORIGINAL_URL=${req.originalUrl}:USER_AGENT=${req.headers['user-agent']}:IP=${req.ip}:X_FORWARDED_FOR=${req.headers['x-forwarded-for']}`);
        next();
    }

}
