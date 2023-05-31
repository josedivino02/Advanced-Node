import { LoadFacebookUserApi } from '@/domain/contracts/apis';
import { TokenGenerator } from '@/domain/contracts/crypto';
import {
  LoadUserAccountRepository,
  SaveFacebookAccountRepository,
} from '@/domain/contracts/repos';
import { AccessToken, FacebookAccount } from '@/domain/entities';
import { AuthenticationError } from '@/domain/entities/errors';

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGenerator
) => FacebookAuthentication;

export type FacebookAuthentication = (params: {
  token: string;
}) => Promise<AccessToken | AuthenticationError>;

export const setupFacebookAuthentication: Setup =
  (facebookApi, userAccountRepo, crypto) => async (params) => {
    const fbData = await facebookApi.loadUser(params);
    if (fbData === undefined) return new AuthenticationError();
    const accountData = await userAccountRepo.load({
      email: fbData.email,
    });
    const fbAccount = new FacebookAccount(fbData, accountData);
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount);
    const accessToken = await crypto.generateToken({
      key: id,
      expirationInMs: AccessToken.expirationInMs,
    });
    return new AccessToken(accessToken);
  };
