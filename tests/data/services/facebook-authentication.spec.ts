import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FaceBookAuthenticationService } from '@/data/services';
import { AuthenticationError } from '@/domain/errors';

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string;
  result = undefined;

  async loadUser(
    params: LoadFacebookUserApi.Params
  ): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token;

    return this.result;
  }
}

describe('FaceBookAuthenticationService', () => {
  it('Should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();
    const sut = new FaceBookAuthenticationService(loadFacebookUserApi);

    await sut.perform({ token: 'any_token' });

    expect(loadFacebookUserApi.token).toBe('any_token');
  });

  it('Should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();

    loadFacebookUserApi.result = undefined;
    const sut = new FaceBookAuthenticationService(loadFacebookUserApi);

    const authResult = await sut.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
