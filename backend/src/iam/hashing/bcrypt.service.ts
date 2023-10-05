import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { HashingService } from './hashing.service';

const ROUNDS_NUMBER = 12;

@Injectable()
export class BcryptService implements HashingService {
  hash(data: string): Promise<string> {
    return hash(data, ROUNDS_NUMBER);
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
