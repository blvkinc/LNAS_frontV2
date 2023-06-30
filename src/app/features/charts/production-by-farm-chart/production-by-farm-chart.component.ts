import {Component, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {ReportResourceService} from '../../../api/services/report-resource.service';
import {ProductionQuantity} from '../../../api/models/production-quantity';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-production-by-farm-chart',
  templateUrl: './production-by-farm-chart.component.html',
  standalone: true,
  imports: [
    NgApexchartsModule,
  ],
  styles: [`
    :host {
  display: block;
  width: 100%;
  height: 100%;
}
  `],
})
export class ProductionByFarmChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private service: ReportResourceService,
  ) {}

   ngOnInit(): void {
    const dummyData = [
      { x: 'Farm A', y: 100 },
      { x: 'Farm B', y: 35 },
      { x: 'Farm C', y: 300 },
      { x: 'Farm D', y: 45 },
      { x: 'Farm e', y: 280 },
    ];

    this.updateChart(dummyData);
  }
    /** this.service.getWeeklyProduction().subscribe({
      next: (data) => {
        this.updateChart(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateChart(data: ProductionQuantity[]) {
    const treemapData = data.map(item => ({
      x: item.period,
      y: item.totalQuantity,
    })); */
  updateChart(data: { x: string; y: number }[]) {
    this.chartOptions = {
      series: [{
        data: data,
      }],
      chart: {
        type: 'treemap',
        height: 350,
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        treemap: {
          colorScale:{
            ranges:[
              {
                from: 0,
                to: 50,
                color: '#CD363A'
              },
              {
                from: 50,
                to: 300,
                color: '#52B12C'
              }
            ]
          }
        },
      },
      title: {
        text: 'Production by Farm',
        align: 'left',
      },
    };
  }
}  

