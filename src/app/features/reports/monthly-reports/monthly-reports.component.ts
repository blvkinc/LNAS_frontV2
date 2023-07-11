import {Component} from '@angular/core';
import {ProductionFormComponent} from '../../production/production-form/production-form.component';
import {ProductionTableComponent} from '../../production/production-table/production-table.component';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { SecurityModule } from 'src/app/security/security.module';
@Component({
  selector: 'app-monthly-reports',
  templateUrl: './monthly-reports.component.html',
  standalone: true,
  imports: [
    ProductionFormComponent,
    ProductionTableComponent,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    PdfViewerModule,
    SecurityModule
  ],
})
export class MonthlyReportsComponent {

}
