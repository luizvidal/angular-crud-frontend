import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, AsyncPipe],
  template: `
    <mat-toolbar class="header mat-elevation-z4">
      <span class="title-group">
        <a [routerLink]="headerData().routeUrl">
          <i class="material-icons">
            {{ headerData().icon }}
          </i>
          {{ headerData().title }}
        </a>
      </span>
    </mat-toolbar>
  `,
  styles: `

  .header {
    display: flex;
    align-items: center;
  }

  .header a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
  }

  .header .logo {
    max-height: 32px;
  }

  .header .title-group {
    padding-left: 25px;
  }

  .header .title-group i {
    padding-right: 5px;
  }
  `,
})
export class HeaderComponent {
  private _service: HeaderService = inject(HeaderService);
  protected headerData = this._service.headerData;
}
