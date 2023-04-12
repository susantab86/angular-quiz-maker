import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-backBtn',
  templateUrl: './nbatracker-backBtn.component.html',
  styleUrls: ['./nbatracker-backBtn.component.scss'], 
})
export class BackButtonComponent implements OnInit {
  @Input('label') label: string ='';

  constructor() {}

  ngOnInit() {}

  back() {
    window.history.back();
  }
}
