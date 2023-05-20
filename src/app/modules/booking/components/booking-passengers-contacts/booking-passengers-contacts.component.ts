import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-passengers-contacts',
  templateUrl: './booking-passengers-contacts.component.html',
})
export class BookingPassengersContactsComponent {
  selectedValue = '';

  countryCodes = ['Afghanistan (+93)', 'Anguilla (+1)', 'Argentina (+54)'];
}
