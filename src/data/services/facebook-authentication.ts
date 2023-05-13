import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '../contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import {
  CreateFacebookAccountRepository,
  LoadUserAccountRepository,
} from '../contracts/repos';

export class FaceBookAuthenticationService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly UserAccountRepo: LoadUserAccountRepository &
      CreateFacebookAccountRepository
  ) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params);

    if (fbData !== undefined) {
      await this.UserAccountRepo.load({ email: fbData?.email });
      await this.UserAccountRepo.createFromFacebook(fbData);
    }

    return new AuthenticationError();
  }
}
