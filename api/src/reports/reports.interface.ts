export interface IResumeResponse {
  establishments: number;
  vehicles: {
    cars: number;
    motorcycles: number;
    total: number;
  };
}
