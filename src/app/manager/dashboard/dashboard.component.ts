import { Component, OnInit, Inject } from '@angular/core';
import { DataStoaredService } from '../../models/stored-data';
import { ManagerR } from '../../utlis/manipulate-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject(DataStoaredService) private lss: DataStoaredService,
    private mr: ManagerR
  ) {}

  ngOnInit(): void {
    this.lss.retrive().subscribe((value) => console.log(value));
    this.mr.connectionToHub('https://localhost:5001/controlhub');
  }
}
