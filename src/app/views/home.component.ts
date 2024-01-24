import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { HeaderService } from '../components/template/header/header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardSubtitle],
  template: `
    <mat-card class="home mat-elevation-z3">
      <mat-card-title class="title">Welcome!</mat-card-title>
      <mat-card-subtitle class="subtitle">
        Crud operations with products in Angular
      </mat-card-subtitle>
    </mat-card>
  `,
  styles: `

  .home {
    padding: 1rem;
  }
  .title {
    font-size: 3rem;
    font-weight: 300;
    line-height: 1.2;
}
  .subtitle {
    font-size: 1.1rem;
    margin-top: 1rem
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private _servce: HeaderService = inject(HeaderService);

  ngOnInit(): void {
    this._servce.setHeaderData({
      title: 'Home',
      icon: 'home',
      routeUrl: '',
    });
  }
}
