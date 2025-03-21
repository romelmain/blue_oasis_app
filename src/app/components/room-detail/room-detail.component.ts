import { Component, input } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RoomService } from '../../services/room.service';
import Room from '../../models/room';
import ImageRoom from '../../models/imageRoom';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import Booking from '../../models/booking';

@Component({
  selector: 'app-room-detail',
  imports: [
    Dialog,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputNumber,
  ],
  templateUrl: './room-detail.component.html',
  standalone: true,
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent {
  checkinday: Date | undefined;
  visible: boolean = false;
  inputRoomId = input<any | number>();
  room: Room;
  imageRoomList: Array<ImageRoom>;
  mainImage: string;
  days: number;
  guestId = localStorage.getItem('guest_id');
  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {
    this.days = 0;
    this.mainImage = '';
    this.room = {
      id: 0,
      number: 0,
      availability: false,
      price: 0,
      createAt: '',
      updateAt: '',
      imageRoom: [],
    };
    this.imageRoomList = [];
  }

  showDialog() {
    console.log('El id es: ' + this.inputRoomId());
    const id = this.inputRoomId();
    this.getRoomById(id);
  }

  getRoomById(id: number) {
    this.roomService.getRoomsById(id).subscribe({
      next: (data) => {
        this.room = data;
        console.log(data);
        this.imageRoomList = data.imageRoom;
        this.mainImage = this.imageRoomList[0].image;
        console.log(this.imageRoomList);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.activateDialog();
      },
    });
  }

  activateDialog() {
    this.visible = true;
  }

  changeImage(index: number) {
    const id = 'img-' + index;
    const imgMainElement = document.querySelector('#main');
    imgMainElement?.removeAttribute('src');
    const imgElement = document.querySelector('#' + id);
    let src = imgElement?.getAttribute('src') ?? 'default name';
    imgMainElement?.setAttribute('src', src);
  }

  getDate(dateIn: any) {
    console.log();

    const inputDate = new Date(dateIn);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  }

  plusDays(dateIn: any, plus: number) {
    const inputDate = new Date(dateIn);
    inputDate.setDate(inputDate.getDate() + plus); // Sumar 2 días
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const day = String(inputDate.getDate()).padStart(2, '0');
    const newDate = `${year}-${month}-${day}`;
    console.log(newDate);
    return newDate;
  }

  postBooking(roomId: number) {
    let today = this.getDate(new Date());
    let newBooking: Booking;

    newBooking = {
      createAt: today,
      updateAt: today,
      date: today,
      checkInDate: this.getDate(this.checkinday),
      checkOutDate: this.plusDays(this.checkinday, this.days),
      guestId: Number(this.guestId),
      roomList: [{ roomId: roomId }],
    };
    console.log(newBooking);
    this.bookingService.postBooking(newBooking).subscribe({
      next: (data) => {
        console.log(data);
        this.visible = false;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
