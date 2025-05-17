import { Component, input, OnInit } from '@angular/core';
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
export class RoomDetailComponent implements OnInit {
  checkinday: Date | undefined;
  visible: boolean = false;
  inputRoomId = input<any | number>();
  room: Room;
  imageRoomList: Array<ImageRoom>;
  mainImage: string;
  days: number;
  guestId = localStorage.getItem('guest_id');
  nguestId = Number(this.guestId);
  bookingId: number;
  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {
    this.bookingId = 0;
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
  ngOnInit(): void {}
  showDialog() {
    console.log('El id es: ' + this.inputRoomId());
    const id = this.inputRoomId();
    this.getRoomById(id);
    this.getBookingByGuest();
  }

  getBookingByGuest() {
    this.bookingService.getBookingByGuest(this.nguestId).subscribe({
      next: (data) => {
        this.bookingId = data.id;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('bookingId' + this.bookingId);
      },
    });
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
    return formattedDate + 'T00:00:00.000-04:00';
  }

  plusDays(dateIn: any, plus: number) {
    const inputDate = new Date(dateIn);
    inputDate.setDate(inputDate.getDate() + plus); // Suma dias
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const newDate = `${year}-${month}-${day}`;
    return newDate + 'T00:00:00.000-04:00';
  }

  postBooking(roomId: number) {
    let today = this.getDate(new Date());
    let newBooking: Booking;

    newBooking = {
      createAt: '',
      updateAt: '',
      date: '',
      checkInDate: '',
      checkOutDate: '',
      guestId: 0,
      roomList: [],
    };

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(this.checkinday + 'T00:00:00.000-04:00');
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    if (this.bookingId == 0) {
      newBooking = {
        createAt: today,
        updateAt: today,
        date: today,
        checkInDate: this.getDate(this.checkinday),
        checkOutDate: this.plusDays(this.checkinday, this.days),
        guestId: this.nguestId,
        roomList: [{ roomId: roomId }],
      };
    } else if (this.bookingId != 0) {
      newBooking = {
        bookingId: this.bookingId,
        guestId: this.nguestId,
        roomList: [{ roomId: roomId }],
      };
    }

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
