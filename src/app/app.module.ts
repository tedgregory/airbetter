import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENVIRONMENTS } from './core/environments/environment.interface';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppLocaleModule } from './app-locale.module';
import { AppRoutingModule } from './app-routing.module';
import { bookingReducer } from './redux/reducers/booking.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffects } from './redux/effects/booking.effects';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppLocaleModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // !environment.production
    //   ? StoreDevtoolsModule.instrument({ logOnly: environment.production })
    //   : [],
    StoreModule.forRoot({ bookingState: bookingReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([BookingEffects]),
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
