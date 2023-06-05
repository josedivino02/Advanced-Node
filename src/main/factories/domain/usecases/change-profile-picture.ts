import {
  ChangeProfilePicture,
  setupChangeProfilePicture,
} from '@/domain/usecases';
import { makePgUserProfileRepo } from '@/main/factories//infra/repos';
import {
  makeAwsS3FileStorage,
  makeUUIDHandler,
} from '@/main/factories/infra/gateways';

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUUIDHandler(),
    makePgUserProfileRepo()
  );
};
