import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreServiceModule } from 'src/app/core/services/core-service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from 'src/app/core/icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthSocialModule } from '../auth-social/auth-social.module';
import { AuthFormComponent } from './auth-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/redux/auth/auth.effects';
import { USER_AUTH_FEATURE_NAME } from 'src/app/redux/auth/auth.state';
import { userAuthReducer } from 'src/app/redux/auth/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    CoreServiceModule,
    ReactiveFormsModule,
    IconsModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    AuthSocialModule,
    StoreModule.forFeature(USER_AUTH_FEATURE_NAME, userAuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
