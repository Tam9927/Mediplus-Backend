import * as argon2 from 'argon2';

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  static async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  static async isDuplicate(newPassword: string, existingHashes: string[]): Promise<boolean> {
    for (const hash of existingHashes) {
      if (await this.verifyPassword(hash, newPassword)) {
        return true;
      }
    }
    return false;
  }
}

  