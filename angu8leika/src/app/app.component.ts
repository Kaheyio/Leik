import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angu8leika';

  login = false;
  logged = false;

  // TODO: GET USER DATA AND NEW LEIKODE AFTER LOGIN
}
