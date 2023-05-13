import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '../contracts/apis';
import { AuthenticationError } from '@/domain/errors';

export class FaceBookAuthenticationService {
  constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params);

    return new AuthenticationError();
  }
}
