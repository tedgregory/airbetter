import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent {
  @HostBinding('class') class = 'user-page';
}
