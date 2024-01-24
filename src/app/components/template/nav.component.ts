import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListModule } from '@angular/material/list';
import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatListItem,
    MatSidenavContainer,
    RouterLink,
    MatIconModule,
    MatListItem,
    RouterLinkActive,
  ],
  template: `
    <mat-sidenav-container class="container">
      <mat-sidenav
        class="sidenav"
        mode="side"
        fixedTopGap="64"
        [opened]="true"
        [fixedInViewport]="true"
      >
        <mat-nav-list class="nav-list">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i class="material-icons"> home </i>
            Home
          </a>

          <a
            routerLink="/products"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i class="material-icons"> storefront </i>
            Products
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav {
      background-color: #3f51b5;
      width: 200px;
    }

    .nav-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-list a {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      text-decoration: none;
      justify-content: start;
      color: white;
      font-size: 16px;
    }

    .nav-list a:hover {
      background-color: #3f49b5;
    }

    .nav-list a.active {
      font-weight: 500;
      background-color: #2f3bba;
    }

    .sidenav i {
      padding-right: 10px;
      color: white;
    }

    .content {
      padding: 16px;
      background-color: #fff;
      overflow: auto;
      height: 82vh;
    }
  `,
})
export class NavComponent {}
