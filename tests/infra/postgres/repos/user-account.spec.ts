import { PgUser } from '@/infra/postgres/entities';
import { PgConnection } from '@/infra/postgres/helpers';
import { PgUserAccountRepository } from '@/infra/postgres/repos';
import { PgRepository } from '@/infra/postgres/repos/repository';
import { makeFakeDb } from '@/tests/infra/postgres/mocks';

import { IBackup } from 'pg-mem';
import { Repository } from 'typeorm';

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository;
  let connection: PgConnection;
  let pgUserRepo: Repository<PgUser>;
  let backup: IBackup;

  beforeAll(async () => {
    connection = PgConnection.getInstance();
    const db = await makeFakeDb([PgUser]);
    backup = db.backup();
    pgUserRepo = connection.getRepository(PgUser);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  beforeEach(() => {
    backup.restore();
    sut = new PgUserAccountRepository();
  });

  it('Should extends PgRepository', () => {
    expect(sut).toBeInstanceOf(PgRepository);
  });

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' });

      const account = await sut.load({ email: 'any_email' });

      expect(account).toMatchObject({ id: '1' });
    });

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' });

      expect(account).toBeUndefined();
    });
  });

  describe('saveWithFacebook', () => {
    it('should create an account if id is undefined', async () => {
      const { id } = await sut.saveWithFacebook({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id',
      });
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' });

      expect(pgUser?.id).toBe(1);
      expect(id).toBe('1');
    });

    it('should update account if id is defined', async () => {
      await pgUserRepo.save({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id',
      });

      const { id } = await sut.saveWithFacebook({
        id: '1',
        email: 'new_email',
        name: 'new_name',
        facebookId: 'new_fb_id',
      });
      const pgUser = await pgUserRepo.findOne({ id: 1 });

      expect(pgUser).toMatchObject({
        id: 1,
        email: 'any_email',
        name: 'new_name',
        facebookId: 'new_fb_id',
      });
      expect(id).toBe('1');
    });
  });
});
