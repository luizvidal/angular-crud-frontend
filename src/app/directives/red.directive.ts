import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appRed]',
  standalone: true,
})
export class RedDirective {
  private _elementRef: ElementRef = inject(ElementRef);

  constructor() {
    this._elementRef.nativeElement.style.color = '#e35e6b';
  }
}
