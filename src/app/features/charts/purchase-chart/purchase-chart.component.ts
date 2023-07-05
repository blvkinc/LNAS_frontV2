import {Component,OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {ReportResourceService} from '../../../api/services/report-resource.service';
import {ProductionQuantity} from '../../../api/models/production-quantity';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-purchase-chart',
  templateUrl: './purchase-chart.component.html',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  styles: [`
  :host {
  display: block;
  width: 100%;
  height: 100%;
}
  #chart {
    width: 100%;
    height: 100%;
  }
`],
})
export class PurchaseChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public hasData: boolean = false;

  constructor(private service: ReportResourceService) {}
/**
  ngOnInit(): void {
    this.service.getWeeklyProduction().subscribe({
      next: (data) => {
        this.updateChart(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateChart(data: ProductionQuantity[]) {
    let quantity = [];
    let categories = [];

    data.forEach(item => {
      quantity.push(item.totalQuantity);
      categories.push(item.period);
    }); */

    ngOnInit(): void {
      const dummyData = [
        { x: 'Week 1', y: 10 },
        { x: 'Week 2', y: 5 },
        { x: 'Week 3', y: 8 },
        { x: 'Week 4', y: 3 },
      ];
  
      this.updateChart(dummyData);
    }
  
    updateChart(data: { x: string; y: number }[]) {
      this.hasData = true;
  
      this.chartOptions = {
        series: [
          {
            name: 'Quantity',
            data: data.map(item => item.y),
          },
        ],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Monthly Purchase',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: data.map(item => item.x),
        },
      };
    }
  }