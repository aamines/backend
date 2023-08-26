interface Workspace {
  id?: string;
  name: string;
  type: string;
  size: string;
  vision: string;
  status?: string;
  profile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Workspace;
