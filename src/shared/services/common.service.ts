import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HelperService {
  async generateRandomString(length: number): Promise<string> {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor((crypto.randomBytes(1)[0] / 256) * charactersLength),
      );
    }
    return result;
  }

  async capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
