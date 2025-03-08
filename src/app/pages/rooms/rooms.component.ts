import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RoomService } from '../../services/room.service';
import Room from '../../models/room';
import ImageRoom from '../../models/imageRoom';
import { RoomComponent } from '../../components/room/room.component';

@Component({
  selector: 'app-rooms',
  imports: [HeaderComponent, RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  room: Room;
  imageRoomList: Array<ImageRoom>;
  constructor(private roomService: RoomService) {
    this.room = {
      id: 0,
      availability: false,
      price: 0,
      createAt: '',
      updateAt: '',
      imageRoom: [],
    };
    this.imageRoomList = [];
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.room = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
