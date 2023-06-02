import { SaveUserPicture } from '@/domain/contracts/repos';
import { PgUser } from '@/infra/postgres/entities';
import { getRepository } from 'typeorm';

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture({
    id,
    initials,
    pictureUrl,
  }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = getRepository(PgUser);
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials });
  }
}
