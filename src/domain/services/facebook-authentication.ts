import { LoadFacebookUserApi } from '@/domain/contracts/apis';
import { TokenGenerator } from '@/domain/contracts/crypto';
import {
  LoadUserAccountRepository,
  SaveFacebookAccountRepository,
} from '@/domain/contracts/repos';
import { AuthenticationError } from '@/domain/errors';
import { FacebookAuthentication } from '@/domain/features';
import { AccessToken, FacebookAccount } from '@/domain/models';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
      SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform({
    token,
  }: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbData = await this.facebookApi.loadUser({ token });

    if (fbData === undefined) return new AuthenticationError();

    const accountData = await this.userAccountRepo.load({
      email: fbData.email,
    });

    const fbAccount = new FacebookAccount(fbData, accountData);
    const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount);

    const accessToken = await this.crypto.generateToken({
      key: id,
      expirationInMs: AccessToken.expirationInMs,
    });
    return new AccessToken(accessToken);
  }
}