import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import Room from '../../models/room';
import { RoomDetailComponent } from '../room-detail/room-detail.component';

@Component({
  selector: 'app-room',
  imports: [CardModule, ButtonModule, RoomDetailComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  standalone: true,
})
export class RoomComponent {
  room = input<Room>();

  getMainImage(room: any) {
    const image = room[0].image;
    return image;
  }
}
