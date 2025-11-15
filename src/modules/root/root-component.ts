import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    RouterOutlet
  ],
  templateUrl: './root-component.html',
  styleUrl: './root-component.css',
})
export class RootComponent {

}
