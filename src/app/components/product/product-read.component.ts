import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ProductInteface } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    RouterLink,
    CurrencyPipe,
  ],
  template: `
    @if (products().length) {
    <div class="mat-elevation-z4">
      <table mat-table [dataSource]="products()">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <!-- Price Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let row">
            {{ row.price | currency }}
          </td>
        </ng-container>

        <!-- Action Column -->
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let row">
            <a routerLink="/products/update/{{ row.id }}" class="edit">
              <i class="material-icons"> edit </i>
            </a>
            <a routerLink="/products/delete/{{ row.id }}" class="delete">
              <i class="material-icons"> delete </i>
            </a>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
      </table>
    </div>
    } @else {
    <mat-card class="home mat-elevation-z3">
      <mat-card-title class="title">There's no products!</mat-card-title>
      <mat-card-subtitle class="subtitle">
        Click the new product button to create a new product!
      </mat-card-subtitle>
    </mat-card>

    }
  `,
  styles: `
    table {
      width: 100%;
    }

    .edit {
      margin-right: 10px;
    }

    .edit > i {
      color: #d9cd26;
    }

    .delete > i {
      color: #e35e6b;
    }

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
export class ProductReadComponent {
  private _service: ProductService = inject(ProductService);
  protected products = signal<ProductInteface[]>([]);
  protected displayedColumns = signal(['id', 'name', 'price', 'action']);

  ngOnInit(): void {
    this._service.read().subscribe((products) => {
      this.products.set(products);
    });
  }
}
