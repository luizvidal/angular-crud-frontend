import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RedDirective } from '../../directives/red.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, RedDirective],
  template: `
    <mat-toolbar class="footer">
      <span>
        Developed by
        <strong
          ><span class="red">L</span>uiz <span class="red">V</span>idal</strong
        >
      </span>
    </mat-toolbar>
  `,
  styles: `
  .footer {
    position: fixed;
    bottom: 0;

    display: flex;
    justify-content: flex-end;
  }

  .footer > span {
    font-size: 1.1rem;
    font-weight: 300;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
