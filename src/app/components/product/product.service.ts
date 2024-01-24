import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ProductInteface } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:8080/products';

  http = inject(HttpClient);

  snackBar = inject(MatSnackBar);

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(product: ProductInteface): Observable<ProductInteface> {
    return this.http.post<ProductInteface>(this.baseUrl, product).pipe(
      take(1),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<ProductInteface[]> {
    return this.http.get<ProductInteface[]>(this.baseUrl).pipe(
      take(1),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<ProductInteface> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ProductInteface>(url).pipe(
      take(1),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: ProductInteface): Observable<ProductInteface> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<ProductInteface>(url, product).pipe(
      take(1),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<ProductInteface> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ProductInteface>(url).pipe(
      take(1),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("there's an error!", true);
    return EMPTY;
  }
}
