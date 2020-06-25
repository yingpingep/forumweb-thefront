import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
})
export class MultipleComponent implements OnInit {
  @Input() question: Question;
  constructor() {}

  ngOnInit(): void {}
}
