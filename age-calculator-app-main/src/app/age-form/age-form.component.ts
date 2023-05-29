import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.css'],
})
export class AgeFormComponent implements OnInit {
  outputDays = signal<number>(0);
  outputMonths = signal<number>(0);
  outputYears = signal<number>(0);
  ageForm!: FormGroup;
  message = signal<String>('');

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let birthDay = signal<String>('');
    let birthMonth = signal<String>('');
    let birthYear = signal<String>('');
    this.ageForm = new FormGroup({
      day: new FormControl(birthDay(), [
        Validators.required,
        Validators.pattern('^([1-9]|0?[1-9]|[1-2]?[0-9]|3?[0-1])$'),
      ]),
      month: new FormControl(birthMonth(), [
        Validators.required,
        Validators.pattern('^([1-9]|0?[1-9]|1?[0-2])$'),
      ]),
      year: new FormControl(birthYear(), [
        Validators.required,
        Validators.pattern('^(19[0-9]{2}|20[0-9]{2})$'),
        this.yearValidator(),
      ]),
    });
  }

  yearValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const theYear = signal<number>(parseInt(control.value));
      const currentYear = signal<number>(moment().year());

      if (theYear() > currentYear()) {
        return { yearInvalid: true };
      }
      return null;
    };
  }

  onSubmit() {
    let day = this.ageForm.get('day')?.value;
    let month = this.ageForm.get('month')?.value;
    let year = this.ageForm.get('year')?.value;

    if (day.length == 1) {
      day.set('0'.concat(this.ageForm.get('day')?.value));
      this.ageForm.patchValue({ day: day() });
    }
    if (month.length == 1) {
      month = '0'.concat(this.ageForm.get('month')?.value);
      this.ageForm.patchValue({ month: month });
    }

    const birthDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);

    if (!birthDate.isValid()) {
      this.message.set('Must be a valid date');
    }

    const today = moment();

    const ageDuration = moment.duration(today.diff(birthDate));

    this.outputDays.set(ageDuration.days());
    this.outputMonths.set(ageDuration.months());
    this.outputYears.set(ageDuration.years());
  }

  isInputInvalidTouched(idOfInput: string): boolean {
    const control = signal<AbstractControl | null>(this.ageForm.get(idOfInput));

    if (
      (control()?.invalid && control()?.touched) ||
      this.message().length > 0
    ) {
      return true;
    }
    return false;
  }

  isYearTooOld(idOfInput: string): boolean {
    const control = signal<String>(this.ageForm.get(idOfInput)?.value);
    if (control().length < 4) {
      return true;
    }
    return false;
  }
}
