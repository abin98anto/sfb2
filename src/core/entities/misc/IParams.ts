interface IParams {
  skip: number;
  limit: number;
  search?: string;
  category?: string;
  sort?: string;
  isActive?: boolean;
}

export default IParams;
