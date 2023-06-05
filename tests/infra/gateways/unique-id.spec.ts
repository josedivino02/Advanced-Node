import { UniqueId } from '@/infra/gateways';

import { reset, set } from 'mockdate';

describe('UniqueId', () => {
  let sut: UniqueId;

  beforeAll(() => {
    set(new Date(2023, 5, 2, 10, 28, 0));
    sut = new UniqueId();
  });

  afterAll(() => {
    reset();
  });

  it('should create a unique Id', () => {
    const uuid = sut.uuid({ key: 'any_key' });

    expect(uuid).toBe('any_key_20230602102800');
  });
});
