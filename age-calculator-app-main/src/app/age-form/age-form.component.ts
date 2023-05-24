import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.css'],
})
export class AgeFormComponent implements OnInit {
  days!: number;
  months!: number;
  years!: number;
  ageForm!: FormGroup;
  message = '';

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let birthDay = '';
    let birthMonth = '';
    let birthYear = '';
    this.ageForm = new FormGroup({
      day: new FormControl(birthDay, [
        Validators.required,
        Validators.pattern('^(0?[1-9]|[1-2]?[0-9]|3?[0-1])$'),
      ]),
      month: new FormControl(birthMonth, [
        Validators.required,
        Validators.pattern('^(0?[1-9]|1?[0-2])$'),
      ]),
      year: new FormControl(birthYear, [
        Validators.required,
        Validators.pattern('^(19?[0-9]{2}|20?[0-9]{2})$'),
        this.yearValidator(),
      ]),
    });
  }

  yearValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const year = control.value;
      const currentYear = moment().year();
      if (year > currentYear) {
        return { yearInvalid: true };
      }
      return null;
    };
  }

  onSubmit() {
    const day = this.ageForm.get('day')?.value;
    const month = this.ageForm.get('month')?.value;
    const year = this.ageForm.get('year')?.value;

    const birthDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);

    if (!birthDate.isValid()) {
      this.message = 'Must be a valid date';
    }

    const today = moment();

    const ageDuration = moment.duration(today.diff(birthDate));
    this.years = ageDuration.years();
    this.months = ageDuration.months();
    this.days = ageDuration.days();

    this.ageForm.reset();
  }

  isInputInvalidTouched(idOfInput: string): boolean {
    const control = this.ageForm.get(idOfInput);
    return !!control?.invalid && control?.touched;
  }
}
