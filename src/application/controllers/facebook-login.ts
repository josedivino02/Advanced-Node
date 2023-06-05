import { Controller } from '@/application/controllers';
import { HttpResponse, ok, unauthorized } from '@/application/helpers';
import {
  Validator,
  ValidationBuilder as builder,
} from '@/application/validation';
import { FacebookAuthentication } from '@/domain/usecases';

type HttpRequest = { token: string };

type Model = Error | { accessToken: string };

export class FacebookLoginController extends Controller {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {
    super();
  }

  async perform({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.facebookAuthentication({ token });
      return ok(accessToken);
    } catch (error) {
      console.error(error);
      return unauthorized();
    }
  }

  override buildValidators({ token }: HttpRequest): Validator[] {
    return [
      ...builder.of({ value: token, fieldName: 'token' }).required().build(),
    ];
  }
}
