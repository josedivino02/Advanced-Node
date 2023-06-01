import { UserProfile } from '@/domain/entities';

describe('UserProfile', () => {
  let sut: UserProfile;
  beforeEach(() => {
    sut = new UserProfile('any_id');
  });

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name' });

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined,
    });
  });

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url' });

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined,
    });
  });

  it('should create initials with first letter of first and last names', () => {
    sut.setPicture({ name: 'jose luiz divino' });

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'JD',
    });
  });

  it('should create initials with first two letters of first', () => {
    sut.setPicture({ name: 'jose' });

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'JO',
    });
  });

  it('should create initials with first letter', () => {
    sut.setPicture({ name: 'j' });

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'J',
    });
  });

  it('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPicture({});

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined,
    });
  });
});
