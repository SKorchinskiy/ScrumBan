export enum Access {
  public = 'public',
  private = 'private',
}

export type CreateProjectDto = {
  project_name: string;
  project_description: string;
  project_access: Access;
};
