import {
  FacebookAuthentication,
  setupFacebookAuthentication,
} from '@/domain/usecases';
import { makeJwtTokenHandler } from '@/main/factories/crypto';
import { makeFacebookApi } from '@/main/factories/gateways';
import { makePgUserAccountRepo } from '@/main/factories/repos';

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  );
};
