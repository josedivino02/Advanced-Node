import { UUIDGenerator } from '@/domain/contracts/crypto';

class UniqueId {
  constructor(private readonly date: Date) {}

  uuid({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return (
      key +
      '_' +
      this.date.getFullYear().toString() +
      (this.date.getMonth() + 1).toString().padStart(2, '0') +
      this.date.getDate().toString().padStart(2, '0') +
      this.date.getHours().toString().padStart(2, '0') +
      this.date.getMinutes().toString().padStart(2, '0') +
      this.date.getMilliseconds().toString().padStart(2, '0')
    );
  }
}

describe('UniqueId', () => {
  it('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2023, 5, 2, 10, 28, 0));

    const uuid = sut.uuid({ key: 'any_key' });

    expect(uuid).toBe('any_key_20230602102800');
  });
});
