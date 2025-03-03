import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'booking-details', component: BookingDetailsComponent },
];
