export interface LoadUserAccountRepository {
  load: (
    params: LoadUserAccountRepository.Input
  ) => Promise<LoadUserAccountRepository.Result>;
}

export namespace LoadUserAccountRepository {
  export type Input = {
    email: string;
  };

  export type Result =
    | undefined
    | {
        id: string;
        name?: string;
      };
}

export interface SaveFacebookAccountRepository {
  saveWithFacebook: (
    params: SaveFacebookAccountRepository.Input
  ) => Promise<SaveFacebookAccountRepository.Result>;
}

export namespace SaveFacebookAccountRepository {
  export type Input = {
    id?: string;
    email: string;
    name: string;
    facebookId: string;
  };

  export type Result = {
    id: string;
  };
}
