import { FaceBookAuthenticationService } from '@/data/services';
import { AuthenticationError } from '@/domain/errors';

describe('FaceBookAuthenticationService', () => {
  it('Should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn(),
    };
    const sut = new FaceBookAuthenticationService(loadFacebookUserApi);

    await sut.perform({ token: 'any_token' });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token',
    });
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  it('Should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn(),
    };

    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);
    const sut = new FaceBookAuthenticationService(loadFacebookUserApi);

    const authResult = await sut.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
