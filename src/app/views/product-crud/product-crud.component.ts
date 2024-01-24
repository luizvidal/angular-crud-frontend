import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ProductReadComponent } from '../../components/product/product-read.component';
import { HeaderService } from './../../components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [ProductReadComponent, MatButton],
  templateUrl: './product-crud.component.html',
  styles: `
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  button {
    width: 25%;
  }


`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCrudComponent {
  private _service: HeaderService = inject(HeaderService);
  private _router: Router = inject(Router);

  ngOnInit(): void {
    this._service.setHeaderData({
      title: 'Product registration',
      icon: 'storefront',
      routeUrl: '/products',
    });
  }

  navigateToProductCreate(): void {
    this._router.navigate(['/products/create']);
  }
}
