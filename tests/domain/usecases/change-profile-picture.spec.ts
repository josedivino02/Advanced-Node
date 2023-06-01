import { UUIDGenerator } from '@/domain/contracts/crypto';
import { UploadFile } from '@/domain/contracts/gateways';
import {
  ChangeProfilePicture,
  setupChangeProfilePicture,
} from '@/domain/usecases';
import { MockProxy, mock } from 'jest-mock-extended';

describe('ChangeProfilePicture', () => {
  let uuid: string;
  let file: Buffer;
  let fileStorage: MockProxy<UploadFile>;
  let crypto: MockProxy<UUIDGenerator>;
  let sut: ChangeProfilePicture;

  beforeAll(() => {
    uuid = 'any_unique_id';
    file = Buffer.from('any_buffer');
    fileStorage = mock();
    crypto = mock();
    crypto.uuid.mockReturnValue(uuid);
    sut = setupChangeProfilePicture(fileStorage, crypto);
  });

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto);
  });

  it('should call UploadFile with correct input', async () => {
    await sut({ id: 'any_id', file });

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid });
    expect(fileStorage.upload).toHaveBeenCalledTimes(1);
  });

  it('should not call UploadFile when file is undefined', async () => {
    await sut({ id: 'any_id', file: undefined });

    expect(fileStorage.upload).not.toHaveBeenCalledWith({});
  });
});
