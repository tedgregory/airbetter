import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { PrefilledData } from 'src/app/modules/user/services/user-auth.service';

@Component({
  selector: 'app-auth-social',
  templateUrl: './auth-social.component.html',
})
export class AuthSocialComponent {
  @HostBinding('class') class = 'auth-social';

  @Output() deliver = new EventEmitter();

  readonly users = [
    {
      firstName: 'Leanne',
      lastName: 'Graham',
      gender: 'female',
    },
    {
      firstName: 'Ervin',
      lastName: 'Howell',
      gender: 'male',
    },
    {
      firstName: 'Clementine',
      lastName: 'Bauch',
      gender: 'female',
    },
    {
      firstName: 'Patricia',
      lastName: 'Lebsack',
      gender: 'female',
    },
    {
      firstName: 'Chelsey',
      lastName: 'Dietrich',
      gender: 'female',
    },
    {
      firstName: 'Dennis',
      lastName: 'Schulist',
      gender: 'male',
    },
    {
      firstName: 'Kurtis',
      lastName: 'Weissnat',
      gender: 'male',
    },
    {
      firstName: 'Nicholas',
      lastName: 'Runolfsdottir V',
      gender: 'male',
    },
    {
      firstName: 'Glenna',
      lastName: 'Reichert',
      gender: 'female',
    },
    {
      firstName: 'Clementina',
      lastName: 'DuBuque',
      gender: 'female',
    },
  ];

  getRandomString() {
    return Math.random().toString(36).substring(5);
  }

  shuffle<T>(arr: T[]) {
    // Uses the modern version of the Fisher–Yates shuffle algorithm
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  getRandomItemInArray<T>(arr: T[]) {
    const shuffled = this.shuffle(arr);
    return shuffled[Math.floor(Math.random() * shuffled.length)];
  }

  onButtonClick() {
    const randomUser = this.getRandomItemInArray(this.users);

    const prefilledData: PrefilledData = {
      signIn: {
        email: 'test2awrzxp@example.com',
        password: 'Qwerty123@',
      },
      signUp: {
        email: `test${this.getRandomString()}@example.com`,
        password: 'Qwerty123@',
        firstName: randomUser.firstName,
        lastName: randomUser.lastName,
        dateOfBirth: '1989-01-31T00:00:00',
        gender: randomUser.gender,
        countryCode: '',
        phone: '123456789',
        citizenship: '',
      },
    };

    this.deliver.emit(prefilledData);
  }
}
