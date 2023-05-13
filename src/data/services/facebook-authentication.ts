import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '../contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import {
  CreateFacebookAccountRepository,
  LoadUserAccountRepository,
} from '../contracts/repos';

export class FaceBookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepository: LoadUserAccountRepository,
    private readonly createFacebookAccountRepository: CreateFacebookAccountRepository
  ) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params);

    if (fbData !== undefined) {
      await this.loadUserAccountRepository.load({ email: fbData?.email });
      await this.createFacebookAccountRepository.createFromFacebook(fbData);
    }

    return new AuthenticationError();
  }
}
