import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos';
import { PgUser } from '@/infra/postgres/entities';
import { PgRepository } from '@/infra/postgres/repos/repository';

type LoadParams = LoadUserAccount.Input;
type LoadResult = LoadUserAccount.Result;
type SaveParams = SaveFacebookAccount.Input;
type SaveResult = SaveFacebookAccount.Result;

export class PgUserAccountRepository
  extends PgRepository
  implements LoadUserAccount, SaveFacebookAccount
{
  async load({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(PgUser);
    const pgUser = await pgUserRepo.findOne({ email });

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined,
      };
    }
  }

  async saveWithFacebook({
    email,
    facebookId,
    name,
    id,
  }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = this.getRepository(PgUser);
    let resultId: string;
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({
        email,
        name,
        facebookId,
      });
      resultId = pgUser.id.toString();
    } else {
      resultId = id;
      await pgUserRepo.update(
        {
          id: parseInt(id),
        },
        {
          name,
          facebookId,
        }
      );
    }
    return { id: resultId };
  }
}
