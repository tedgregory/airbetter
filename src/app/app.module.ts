import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENVIRONMENTS } from './core/environments/environment.interface';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppLocaleModule } from './app-locale.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserAuthInitService } from './modules/user/services/user-auth-init.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppLocaleModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
    UserAuthInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (authInitializer: UserAuthInitService) => () =>
        authInitializer.initialize(),
      deps: [UserAuthInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
