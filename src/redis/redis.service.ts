// NestJS
import { Injectable, Inject, Logger } from '@nestjs/common';

// Cache
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {

    private readonly logger = new Logger(RedisService.name);

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    async get(key: string): Promise<object> {
        this.logger.log(`GET:${key}`);
        return await this.cache.get(key);
    }

    async set(key: string, value: any): Promise<void> {
        this.logger.log(`SET:${key}`);
        return await this.cache.set(key, value);
    }

}