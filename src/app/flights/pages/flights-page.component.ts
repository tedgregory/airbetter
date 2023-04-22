import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsPageComponent {}
