import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'airbet-repo';
  testForm = new FormGroup({
    testValue: new FormControl('mail@mail.ru'),
  });
}
