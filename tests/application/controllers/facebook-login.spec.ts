import { Controller, FacebookLoginController } from '@/application/controllers';
import { ServerError, UnauthorizedError } from '@/application/errors';
import { RequiredString } from '@/application/validation';
import { AuthenticationError } from '@/domain/entities/errors';

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController;
  let facebookAuth: jest.Mock;
  let token: string;

  beforeAll(() => {
    token = 'any_token';
    facebookAuth = jest.fn();
    facebookAuth.mockResolvedValue({ accessToken: 'any_value' });
  });

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth);
  });

  it('Should extends Controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators({ token });

    expect(validators).toEqual([new RequiredString('any_token', 'token')]);
  });

  it('Should call FacebookAuthentication with correct input', async () => {
    await sut.handle({ token });

    expect(facebookAuth).toHaveBeenCalledWith({ token });
    expect(facebookAuth).toHaveBeenCalledTimes(1);
  });

  it('Should return 401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new AuthenticationError());

    const httpResponse = await sut.handle({ token });

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error');
    facebookAuth.mockRejectedValueOnce(error);

    const httpResponse = await sut.handle({ token });

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
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
