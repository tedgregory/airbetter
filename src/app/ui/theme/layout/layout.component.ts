import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @HostBinding('class')
  get layoutClasses() {
    let classes = 'layout';

    const currentRoute = this.route?.snapshot?.firstChild?.routeConfig?.path;

    if (currentRoute === NavigationPath.Flights) {
      classes += ' layout-flights';
    }

    return classes;
  }

  constructor(private route: ActivatedRoute) {}
}
