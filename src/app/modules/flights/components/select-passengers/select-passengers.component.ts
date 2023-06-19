import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export enum PassengerType {
  Adult = 'Adult',
  Child = 'Child',
  Infant = 'Infant',
}

export interface CountsOptions {
  [PassengerType.Adult]: number;
  [PassengerType.Child]: number;
  [PassengerType.Infant]: number;
}

interface PassengerOption {
  type: PassengerType;
  note: string;
}

@Component({
  selector: 'app-select-passengers',
  templateUrl: './select-passengers.component.html',
})
export class SelectPassengersComponent implements OnInit {
  @HostBinding('class') class = 'select-passengers';

  @HostBinding('document:keyup')
  handleKeyboardEvents(event: KeyboardEvent) {
    if (!this.isDropdownOpen) return;

    event.preventDefault();

    if (event.code === 'Escape') {
      this.closeDropdown();
    }
  }

  @Input()
  label = 'Passengers*';
  @Input()
  counts: CountsOptions = {
    [PassengerType.Adult]: 0,
    [PassengerType.Child]: 0,
    [PassengerType.Infant]: 0,
  };
  @Output() countsChange = new EventEmitter<CountsOptions>();

  @ViewChild('dropdownList') dropdownListRef:
    | ElementRef<HTMLElement>
    | undefined;

  passengerOptionsList: PassengerOption[] = [
    { type: PassengerType.Adult, note: '14+ years' },
    { type: PassengerType.Child, note: '2-14 years' },
    { type: PassengerType.Infant, note: '0-2 years' },
  ];

  passengersValueText = '';

  public isDropdownOpen = false;

  ngOnInit(): void {
    this.displayResult();
  }

  closeDropdown() {
    if (this.dropdownListRef) {
      this.dropdownListRef.nativeElement.ariaExpanded = 'false';
    }

    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.dropdownListRef) {
      this.dropdownListRef.nativeElement.ariaExpanded = this.isDropdownOpen
        ? 'true'
        : 'false';
    }
  }

  onClickOutsideDropdown() {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  onIncrementerValueChange(value: number, passengerType: PassengerType) {
    this.counts[passengerType] = value;
    this.displayResult();
  }

  hasCount() {
    return Object.values(this.counts).some((value) => value > 0);
  }

  setValueText(obj: CountsOptions) {
    const arr = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        if (value > 1) {
          switch (key) {
            case PassengerType.Child:
              arr.push(`${value} ${key}ren`);
              break;
            default:
              arr.push(`${value} ${key}s`);
              break;
          }
        } else {
          arr.push(`${value} ${key}`);
        }
      }
    }

    return arr.join(', ');
  }

  displayResult() {
    this.passengersValueText = this.setValueText(this.counts);
    this.countsChange.emit(this.counts);
  }
}
