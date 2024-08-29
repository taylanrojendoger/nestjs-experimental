// NestJS
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Cache
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

// Services
import { RedisService } from '@/redis/redis.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<string>('REDIS_HOST'),
                port: configService.get<number>('REDIS_PORT'),
                auth_pass: configService.get<string>('REDIS_PASSWORD'),
                ttl: configService.get<number>('REDIS_TTL')
            })
        })
    ],
    providers: [RedisService],
    exports: [CacheModule, RedisService]
})
export class RedisModule { }