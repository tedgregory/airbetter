import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-info-panel',
  templateUrl: './booking-info-panel.component.html',
  styles: [],
})
export class BookingInfoPanelComponent {
  editMode = false;

  showEditPanel() {
    this.editMode = !this.editMode;
  }
}
