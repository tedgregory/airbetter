import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
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
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthModalPosition } from '../../interfaces/layout.interfaces';

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
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('hamburgerToggle') hamburgerToggleRef:
    | ElementRef<HTMLElement>
    | undefined = undefined;

  @ViewChild('signInBtn', { read: ElementRef }) signInBtnRef:
    | ElementRef<HTMLElement>
    | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  NavigationPath = NavigationPath;

  isLtLgScreen = false;

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

  isAuthModalOpen = false;

  authModalPos: AuthModalPosition = {
    pos: 'static',
    rightTopX: 0,
    rightTopY: 0,
  };

  selectedDateFormat = this.dateFormats[0].value;

  selectedCurrency = this.currencies[0].value;

  private resizeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
    private coreService: CoreService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(mediaBreakpointDown(GridBreakpointType.Lg))
      .pipe(
        tap((breakpoints) => {
          this.isLtLgScreen = breakpoints.matches;
          this.collapse = this.isLtLgScreen;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.resizeSubscription = this.coreService.onWindowResize(() => {
      this.calcSignInBtnCoords(this.isLtLgScreen);
    });
  }

  ngAfterViewInit() {
    this.calcSignInBtnCoords(this.isLtLgScreen);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  isFlightsPage() {
    const currentRoute = this.route?.snapshot?.firstChild?.routeConfig?.path;
    return currentRoute === NavigationPath.Flights;
  }

  onSingInBtnClick() {
    this.isAuthModalOpen = true;
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
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

  calcSignInBtnCoords(isReset = false) {
    const dialogCoords = this.signInBtnRef
      ? this.signInBtnRef.nativeElement.getBoundingClientRect()
      : null;
    const signInBtnLeftBottomPosX = dialogCoords
      ? Math.round(dialogCoords.x)
      : 0;
    const signInBtnLeftBottomPosY = dialogCoords
      ? Math.round(dialogCoords.bottom)
      : 0;

    if (!isReset) {
      this.authModalPos = {
        pos: 'absolute',
        rightTopX: window.innerWidth - signInBtnLeftBottomPosX - 20,
        rightTopY: signInBtnLeftBottomPosY + 28,
      };
    } else {
      this.authModalPos = {
        pos: 'static',
        rightTopX: 0,
        rightTopY: 0,
      };
    }
  }
}
