import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInteface } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-save',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardTitle,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <mat-card>
      <mat-card-title>{{ id ? 'Edit' : 'New' }} product</mat-card-title>
      <form [formGroup]="formGroup">
        <mat-form-field>
          <mat-label>Name</mat-label>

          <input
            matInput
            placeholder="Name"
            formControlName="name"
            name="name"
          />
          <mat-error>Product name is required!</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Price</mat-label>

          <input
            matInput
            type="number"
            placeholder="Price"
            formControlName="price"
            name="price"
            [scrollLeft]="false"
          />
          <mat-error>Product price is required!</mat-error>
        </mat-form-field>
      </form>

      <div class="button-container">
        <button
          mat-raised-button
          (click)="save()"
          [disabled]="formGroup.invalid"
          color="primary"
        >
          Save
        </button>

        <button mat-raised-button (click)="cancel()">Cancel</button>
      </div>
    </mat-card>
  `,
  styles: `
    mat-card {
      padding: 1rem;
    }

    form {
      display: flex;
      margin-top: 20px;
      gap: 1rem;
    }

    mat-form-field:nth-child(1) {
      width: 75%;
    }

    mat-form-field:nth-child(2) {
      width: 25%;
    }

    .button-container {
      display: flex;
      margin-top: 1rem;
      gap: 1rem;
      justify-content: flex-end;
    }

    button {
      width: 10%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSaveComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _service: ProductService = inject(ProductService);
  private _router: Router = inject(Router);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  protected id?: number;

  protected formGroup: FormGroup = this.createForm();

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.loadProduct();
  }

  cancel() {
    this._router.navigate(['/products']);

    this.formGroup.controls;
  }

  createForm() {
    return this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  loadProduct() {
    if (this.id) {
      this._service
        .readById(this.id)
        .subscribe((product) => this.formGroup.patchValue(product));
    }
  }

  save() {
    const request = this.id
      ? this._service.update(this.product)
      : this._service.create(this.product);

    request.subscribe(() => {
      this._service.showMessage(
        `Product ${this.id ? 'edited' : 'created'} successfully!`
      );
      this._router.navigate(['/products']);
    });
  }

  get product() {
    return this.formGroup.value as ProductInteface;
  }
}
