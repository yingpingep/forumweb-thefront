import { Component, OnInit } from '@angular/core';
import { ManipulateR } from 'src/app/utlis/manipulate-r.service';

@Component({
  selector: 'app-screen-mode',
  templateUrl: './screen-mode.component.html',
  styleUrls: ['./screen-mode.component.scss'],
})
export class ScreenModeComponent implements OnInit {
  constructor(private mr: ManipulateR) {}

  ngOnInit(): void {
    this.mr.connectionToHub('https://localhost:5001/controlhub');
  }
}
