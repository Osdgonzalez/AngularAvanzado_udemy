import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.doughnutChartData = { 
      labels: this.doughnutChartLabels , 
      datasets:[
        {data: this.arrayData , backgroundColor: ['#6857E6' , '#009FEE' , '#F02059']}
      ]
  }
  }

  @Input() titulo: string = 'Sin titulo';
  @Input() doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() arrayData: number[] = [ 350, 450, 100 ];


  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

}
