import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
import { DashboardResourceService } from 'src/app/api/services';

export type ChartOptions = {
  series: ApexAxisChartSeries[];
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
  selector: 'app-production-chart',
  templateUrl: './production-chart.component.html',
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

export class ProductionChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public hasData: boolean = false;

  constructor(private service: DashboardResourceService) {}


  ngOnInit(): void {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const startDate = this.formatDate(startOfMonth);
    const endDate = this.formatDate(endOfMonth);

    this.service.getMonthlyProductionByWeek({startDate, endDate}).subscribe({
      next: (data: Array<Array<{ week: string; totalProduction: number }>>) => {
        console.log(data); 
        this.updateChart(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateChart(data: Array<Array<{ week: string; totalProduction: number }>>) {
    if (data.length === 0) {
      this.hasData = false;
     this.chartOptions = {};
    } else {
      this.hasData = true;
  
      const processedData: { week: string; totalProduction: number }[] = data.flat();
  
      this.chartOptions = {
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
          text: 'Weekly Production',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: processedData.map((item) => item.week),
        },
      };
    }
  }
}
