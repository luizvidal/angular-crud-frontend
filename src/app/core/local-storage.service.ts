import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  private _dataSource = signal<T[]>([]);

  public dataSource = this._dataSource.asReadonly();

  constructor(private _key: String) {}

  get() {
    if (localStorage.getItem(this.key)) {
      const item = localStorage.getItem(this.key);
      this._dataSource.set(JSON.parse(item!));
    }
  }

  getById(id: number) {
    return this._dataSource().find((item: any) => item.id == id);
  }

  post(data: T) {
    const id = this._dataSource().length;
    this._dataSource.set([...this._dataSource(), { ...data, id }]);
    this._persist();
  }

  put(id: number, data: T) {
    const item = this._dataSource().find((item: any) => item.id == id);
    if (item) {
      const index = this._dataSource().indexOf(item);
      const dataSource = [...this._dataSource()];
      dataSource[index] = { ...data, id };
      this._dataSource.set([...dataSource]);
      this._persist();
    }
  }

  delete(id: number) {
    const dataSource = this._dataSource().filter((item: any) => item.id != id);
    this._dataSource.set([...dataSource]);
    this._persist();
  }

  private _persist() {
    const dataSource = this._dataSource();
    localStorage.setItem(this.key, JSON.stringify(dataSource));
  }

  get key() {
    return this._key.toString();
  }
}
