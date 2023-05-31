import { FacebookLoginController } from '@/application/controllers';
import { UnauthorizedError } from '@/application/errors';
import { RequiredStringValidator } from '@/application/validation';
import { AccessToken } from '@/domain/entities';
import { AuthenticationError } from '@/domain/entities/errors';

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController;
  let facebookAuth: jest.Mock;
  let token: string;

  beforeAll(() => {
    token = 'any_token';
    facebookAuth = jest.fn();
    facebookAuth.mockResolvedValue(new AccessToken('any_value'));
  });

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators({ token });

    expect(validators).toEqual([
      new RequiredStringValidator('any_token', 'token'),
    ]);
  });

  it('Should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token });

    expect(facebookAuth).toHaveBeenCalledWith({ token });
    expect(facebookAuth).toHaveBeenCalledTimes(1);
  });

  it('Should return 401 if authentication fails', async () => {
    facebookAuth.mockResolvedValueOnce(new AuthenticationError());
    const httpResponse = await sut.handle({ token });

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('Should return 200 if succeeds', async () => {
    const httpResponse = await sut.handle({ token });

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value',
      },
    });
  });
});
