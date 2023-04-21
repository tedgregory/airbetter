import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TUI_DATE_FORMAT, TUI_DATE_SEPARATOR, TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: TUI_DATE_FORMAT, useValue: 'MDY' },
    { provide: TUI_DATE_SEPARATOR, useValue: '/' },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'airbet-repo';
  genders = ['Male', 'Female'];
  testForm = new FormGroup({
    firstName: new FormControl('James'),
    lastName: new FormControl('Potter'),
    selectGender: new FormControl(''),
    control: new FormControl(new TuiDay(2022, 7, 17)),
  });
}
