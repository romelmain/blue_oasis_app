import RoomReq from './roomReq';

export default interface Booking {
  bookingId?: number;
  createAt?: String;
  updateAt?: String;
  date?: String;
  checkInDate?: String;
  checkOutDate?: String;
  guestId: number;
  roomList: Array<RoomReq>;
}
