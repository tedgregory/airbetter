import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ActivatedRoute } from '@angular/router';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  GridBreakpointType,
  mediaBreakpointDown,
} from '../../../utils/grid-breakpoints.util';
import { Subject, takeUntil, tap } from 'rxjs';

interface DateFormat {
  value: string;
  viewValue: string;
}

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('collapse', [
      state(
        'false',
        style({
          transform: 'translateX(0)',
          visibility: AUTO_STYLE,
        })
      ),
      state(
        'true',
        style({
          transform: 'translateX(-100%)',
          visibility: 'hidden',
        })
      ),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('hamburgerToggleRef') hamburgerToggleRef:
    | ElementRef<HTMLElement>
    | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  NavigationPath = NavigationPath;

  isLgScreen = false;

  collapse = true;

  private readonly destroy$ = new Subject<void>();

  dateFormats: DateFormat[] = [
    { value: 'mm-dd-yyyy', viewValue: 'MM/DD/YYYY' },
    { value: 'dd-mm-yyyy', viewValue: 'DD/MM/YYYY' },
    { value: 'yyyy-dd-mm', viewValue: 'YYYY/DD/MM' },
    { value: 'yyyy-mm-dd', viewValue: 'YYYY/MM/DD' },
  ];

  currencies: Currency[] = [
    { value: 'eur', viewValue: 'EUR' },
    { value: 'usa', viewValue: 'USA' },
    { value: 'rub', viewValue: 'RUB' },
    { value: 'pln', viewValue: 'PLN' },
  ];

  selectedDateFormat = this.dateFormats[0].value;
  selectedCurrency = this.currencies[0].value;

  constructor(
    private route: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(mediaBreakpointDown(GridBreakpointType.Lg))
      .pipe(
        tap((breakpoints) => {
          this.isLgScreen = breakpoints.matches;
          this.collapse = this.isLgScreen;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isFlightsPage() {
    const currentRoute = this.route?.snapshot?.firstChild?.routeConfig?.path;
    return currentRoute === NavigationPath.Flights;
  }

  onSingInBtnClick() {
    // console.log(this.selectedDateFormat);
    this.matDialog.open(HelpDialogComponent);
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  clickedOutsideMenu(el: HTMLElement) {
    if (
      this.hamburgerToggleRef &&
      el !== this.hamburgerToggleRef.nativeElement &&
      !this.hamburgerToggleRef.nativeElement.contains(el) &&
      !this.collapse
    ) {
      this.collapse = true;
    }
  }
}
