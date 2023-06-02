import { UniqueId } from '@/infra/gateways';

describe('UniqueId', () => {
  it('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2023, 5, 2, 10, 28, 0));

    const uuid = sut.uuid({ key: 'any_key' });

    expect(uuid).toBe('any_key_20230602102800');
  });
});
