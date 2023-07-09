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
import { Subject, Subscription, combineLatest, takeUntil, tap } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { ModalPosition } from '../../interfaces/layout.interfaces';
import { ECurrencies, EDateFormats } from 'src/app/redux/common/common.models';
import { Store } from '@ngrx/store';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { FormControl } from '@angular/forms';
import { SearchActions } from 'src/app/redux/search/search.actions';
import { UserModalService } from 'src/app/modules/user/services/user-modal.service';
import { UserAuthActions } from 'src/app/redux/auth/auth.actions';
import {
  selectAuthData,
  selectIsAuth,
  selectLoaded,
} from 'src/app/redux/auth/auth.selectors';

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

  isAuth$ = this.store.select(selectIsAuth);

  authData$ = this.store.select(selectAuthData);

  authLoaded$ = this.store.select(selectLoaded);

  NavigationPath = Object.keys(NavigationPath).reduce((res, key, i) => {
    res[key as keyof typeof NavigationPath] = Object.values(NavigationPath)[i];
    return res;
  }, {} as Record<keyof typeof NavigationPath, string>);

  isLtLgScreen = false;

  collapse = true;

  private readonly destroy$ = new Subject<void>();

  dateFormats = Object.values(EDateFormats).map((key) => ({
    value: key as EDateFormats,
    viewValue: key as EDateFormats,
  }));

  dateFormatsControl = new FormControl<EDateFormats>(EDateFormats.YMD);

  currencies = Object.keys(ECurrencies).map((key) => ({
    value: key as ECurrencies,
    viewValue: key as ECurrencies,
  }));

  currenciesControl = new FormControl<ECurrencies>(ECurrencies.PLN);

  isAuthModalOpen = false;

  modalPos: ModalPosition = {
    pos: 'static',
    rightTopX: 0,
    rightTopY: 0,
  };

  selectedDateFormat$ = this.store.select(searchFeature.selectDateFormat);

  selectedCurrency$ = this.store.select(searchFeature.selectCurrency);

  subs: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
    private coreService: CoreService,
    private cd: ChangeDetectorRef,
    public userModalService: UserModalService
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

    this.coreService
      .onWindowResize(() => {
        this.calcSignInBtnCoords(this.isLtLgScreen);
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.subs.push(
      this.dateFormatsControl.valueChanges.subscribe((value) => {
        value &&
          this.store.dispatch(
            SearchActions.setDateFormat({ dateFormat: value })
          );
      })
    );

    this.subs.push(
      this.currenciesControl.valueChanges.subscribe((value) => {
        value &&
          this.store.dispatch(SearchActions.setCurrency({ currency: value }));
      })
    );

    this.subs.push(
      combineLatest([
        this.selectedDateFormat$,
        this.selectedCurrency$,
      ]).subscribe(([format, currency]) => {
        this.dateFormatsControl.setValue(format);
        this.currenciesControl.setValue(currency);
      })
    );
  }

  ngAfterViewInit() {
    this.calcSignInBtnCoords(this.isLtLgScreen);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  isFlightsPage() {
    const currentRoute = this.route?.snapshot?.firstChild?.routeConfig?.path;
    return currentRoute === NavigationPath.Flights;
  }

  onSingInBtnClick() {
    this.isAuthModalOpen = true;
  }

  onSignOutBtnClick() {
    this.store.dispatch(UserAuthActions.signOut());
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
  }

  closeUserModal() {
    this.userModalService.isUserModalOpen = false;
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
      this.modalPos = {
        pos: 'absolute',
        rightTopX: window.innerWidth - signInBtnLeftBottomPosX - 20,
        rightTopY: signInBtnLeftBottomPosY + 28,
      };
    } else {
      this.modalPos = {
        pos: 'static',
        rightTopX: 0,
        rightTopY: 0,
      };
    }
  }
}
