import { Component } from '@angular/core';

import { AgeFormComponent } from './age-form/age-form.component';

@Component({
  standalone: true,
  imports: [AgeFormComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'age-calculator-app-main';
}
