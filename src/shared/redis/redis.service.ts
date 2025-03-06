import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // Set key in Redis
  async setKey(key: string, value: any, ttl = 86400): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  // Get key from Redis
  async getKey(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  // Delete key from Redis
  async deleteKey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
