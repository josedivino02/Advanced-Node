import { UUIDGenerator } from '@/domain/contracts/crypto';
import { v4 } from 'uuid';

jest.mock('uuid');

class UUIDHandler {
  uuid({ key }: UUIDGenerator.Input): void {
    v4();
  }
}

describe('UUIDHandler', () => {
  it('should call uuid.v4', () => {
    const sut = new UUIDHandler();

    sut.uuid({ key: 'any_key' });

    expect(v4).toHaveBeenCalledTimes(1);
  });

  it('should return  correct uuid', () => {
    const sut = new UUIDHandler();

    sut.uuid({ key: 'any_key' });

    expect(v4).toHaveBeenCalledTimes(1);
  });
});
