import { Component, OnInit, Inject } from '@angular/core';
import { StoredData } from '../types/stored-data';
import { StoredService } from './services/stroed-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(@Inject(StoredService) private lss: StoredData) {}

  ngOnInit(): void {
    this.lss.retrive().subscribe((value) => console.log(value));
  }
}
