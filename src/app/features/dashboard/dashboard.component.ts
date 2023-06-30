import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductionChartComponent} from '../charts/production-chart/production-chart.component';
import {SalesChartComponent} from '../charts/sales-chart/sales-chart.component';
import {ProductionByFarmChartComponent} from '../charts/production-by-farm-chart/production-by-farm-chart.component';
import {
  ProductionByStatusChartComponent,
} from '../charts/production-by-status-chart/production-by-status-chart.component';
import { CardsComponent } from 'src/app/components/cards/cards.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductionChartComponent, SalesChartComponent, ProductionByFarmChartComponent, ProductionByStatusChartComponent,CardsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  salesOverviewData = [
    { label: 'Total Sales', value: '$100,000' },
    { label: 'Total Cost', value: '$50,000' },
    { label: 'Total Revenue', value: '$150,000' },
    { label: 'Profit', value: '$100,000' }
  ];

  purchaseOverviewData = [
    { label: 'Purchase Quantity', value: '1,000' },
    { label: 'Cancel Orders', value: '100' },
    { label: 'Cost', value: '$50,000' },
    { label: 'Return Amount', value: '$5,000' }
  ];
}
