import {
  ChangeProfilePicture,
  setupChangeProfilePicture,
} from '@/domain/usecases';
import {
  makeAwsS3FileStorage,
  makeUUIDHandler,
} from '@/main/factories/infra/gateways';
import { makePgUserProfileRepo } from '@/main/factories/infra/postgres/repos';

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUUIDHandler(),
    makePgUserProfileRepo()
  );
};
