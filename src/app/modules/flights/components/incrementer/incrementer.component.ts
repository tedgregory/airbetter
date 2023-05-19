import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
})
export class IncrementerComponent {
  @HostBinding('class') class = 'incrementer';

  @Output() valueChange = new EventEmitter<number>();

  formGroup = new FormGroup({
    formField: new FormControl(),
  });

  _value = 0;
  _step = 1;
  _min = 0;
  _max = Infinity;
  color = 'default';

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  incrementValue(step = 1) {
    const inputValue = this._value + step;
    this._value = inputValue;
    this.valueChange.emit(inputValue);
  }

  shouldDisableDecrement(inputValue: number) {
    return inputValue <= this._min;
  }

  shouldDisableIncrement(inputValue: number) {
    return inputValue >= this._max;
  }
}
