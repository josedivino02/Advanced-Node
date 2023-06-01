export interface LoadUserAccount {
  load: (input: LoadUserAccount.Input) => Promise<LoadUserAccount.Result>;
}

export namespace LoadUserAccount {
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

export interface SaveFacebookAccount {
  saveWithFacebook: (
    input: SaveFacebookAccount.Input
  ) => Promise<SaveFacebookAccount.Result>;
}

export namespace SaveFacebookAccount {
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
