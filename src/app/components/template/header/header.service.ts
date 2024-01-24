import { Injectable, signal } from '@angular/core';
import { HeaderDataInterface } from './header-data.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private _headerData = signal<HeaderDataInterface>({
    title: 'Home',
    icon: 'home',
    routeUrl: '/',
  });

  headerData = this._headerData.asReadonly();

  setHeaderData(headerData: HeaderDataInterface) {
    this._headerData.set(headerData);
  }
}
