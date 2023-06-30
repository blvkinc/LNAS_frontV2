import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {ReportResourceService} from '../../../api/services/report-resource.service';
import {OrderSummary} from '../../../api/models/order-summary';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};


@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './sales-chart.component.html',
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
export class SalesChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public hasData: boolean = false;

  constructor(private service: ReportResourceService) {}

  /**ngOnInit(): void {
    this.service.getWeeklySales().subscribe({
      next: (data) => {
        this.updateChart(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateChart(data: OrderSummary[]) {
    let quantity = [];
    let categories = [];
  
    if (data.length === 0) {
      // Handle no data scenario by setting dummy values
      quantity = [0, 4, 6, 4, 0, 0, 0];
      categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.hasData = false;
    } else {
      data.forEach((item) => {
        quantity.push(item.total);
        categories.push(item.date);
      });
  
      this.hasData = true;
    } */
  
    ngOnInit(): void {
      const dummyData = [
        { x: 'Week 1', y: 10 },
        { x: 'Week 2', y: 5 },
        { x: 'Week 3', y: 8 },
        { x: 'Week 4', y: 21 },
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
          colors: ['#ff0000'],
          width: 2,
        },
        title: {
          text: 'Monthly sales',
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