import { Component, input } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RoomService } from '../../services/room.service';
import Room from '../../models/room';
import ImageRoom from '../../models/imageRoom';
import { query } from '@angular/animations';

@Component({
  selector: 'app-room-detail',
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './room-detail.component.html',
  standalone: true,
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent {
  visible: boolean = false;
  inputRoomId = input<any | number>();
  room: Room;
  imageRoomList: Array<ImageRoom>;
  mainImage: string;
  constructor(private roomService: RoomService) {
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
    console.log('INPUT');
    console.log('aaaaaaaaa' + this.inputRoomId + 'bbbbbb');
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
}
