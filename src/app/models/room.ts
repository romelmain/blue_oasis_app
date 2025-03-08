import ImageRoom from './imageRoom';
export default interface Room {
  id: number;
  availability: Boolean;
  price: number;
  createAt: string;
  updateAt: string;
  imageRoom: Array<ImageRoom>;
}
