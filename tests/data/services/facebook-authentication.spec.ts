import { LoadFacebookUserApi } from '@/data/contracts/apis';
import {
  CreateFacebookAccountRepository,
  LoadUserAccountRepository,
} from '@/data/contracts/repos';
import { FaceBookAuthenticationService } from '@/data/services';
import { AuthenticationError } from '@/domain/errors';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FaceBookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>;
  let createFacebookAccountRepo: MockProxy<CreateFacebookAccountRepository>;
  let sut: FaceBookAuthenticationService;
  const token = 'any_token';

  beforeEach(() => {
    loadFacebookUserApi = mock();
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_db_id',
    });
    loadUserAccountRepo = mock();
    createFacebookAccountRepo = mock();
    sut = new FaceBookAuthenticationService(
      loadFacebookUserApi,
      loadUserAccountRepo,
      createFacebookAccountRepo
    );
  });

  it('Should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token,
    });
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1);
  });

  it('Should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AuthenticationError());
  });

  it('Should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token });

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({
      email: 'any_fb_email',
    });
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1);
  });

  it('Should call CreateFacebookAccountRepo when LoadFacebookUserApi returns data', async () => {
    loadUserAccountRepo.load.mockResolvedValueOnce(undefined);

    await sut.perform({ token });

    expect(createFacebookAccountRepo.createFromFacebook).toHaveBeenCalledWith({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_db_id',
    });
    expect(createFacebookAccountRepo.createFromFacebook).toHaveBeenCalledTimes(
      1
    );
  });
});
