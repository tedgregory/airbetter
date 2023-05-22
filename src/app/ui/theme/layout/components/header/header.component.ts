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
import { ECurrencies, EDateFormats } from 'src/app/redux/common/common.models';
import { Store } from '@ngrx/store';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { FormControl } from '@angular/forms';
import { SearchActions } from 'src/app/redux/search/search.actions';

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

  NavigationPath = Object.keys(NavigationPath).reduce((res, key, i) => {
    res[key as keyof typeof NavigationPath] = Object.values(NavigationPath)[i];
    return res;
  }, {} as Record<keyof typeof NavigationPath, string>);

  isLtLgScreen = false;

  collapse = true;

  private readonly destroy$ = new Subject<void>();

  dateFormats = Object.values(EDateFormats).map((key) => ({
    value: key,
    viewValue: key,
  }));
  dateFormatsControl = new FormControl<EDateFormats>(EDateFormats.DMY);

  currencies = Object.keys(ECurrencies).map((key) => ({
    value: key,
    viewValue: key,
  }));
  currenciesControl = new FormControl<ECurrencies>(ECurrencies.PLN);

  isAuthModalOpen = false;

  authModalPos: AuthModalPosition = {
    pos: 'static',
    rightTopX: 0,
    rightTopY: 0,
  };

  selectedDateFormat$ = this.store.select(searchFeature.selectDateFormat);

  selectedCurrency$ = this.store.select(searchFeature.selectCurrency);

  private resizeSubscription: Subscription | undefined;

  constructor(
    private store: Store,
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

    this.dateFormatsControl.valueChanges.subscribe((value) => {
      console.log(value);

      value &&
        this.store.dispatch(SearchActions.setDateFormat({ dateFormat: value }));
    });
    this.currenciesControl.valueChanges.subscribe((value) => {
      value &&
        this.store.dispatch(SearchActions.setCurrency({ currency: value }));
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
