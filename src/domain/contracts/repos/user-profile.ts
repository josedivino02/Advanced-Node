export interface SaveUserPicture {
  savePicture: (input: SaveUserPicture.Input) => Promise<void>;
}

export namespace SaveUserPicture {
  export type Input = { pictureUrl?: string; initials?: string };
}

export interface LoadUserProfile {
  load: (input: LoadUserProfile.Input) => Promise<LoadUserProfile.OutPut>;
}

export namespace LoadUserProfile {
  export type Input = { id: string };

  export type OutPut = { name?: string };
}
