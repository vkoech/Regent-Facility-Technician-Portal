import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService) {

  }  ngOnInit() {
    if (localStorage.getItem('techNo') == null)  {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/assignedTickets']);
    }
  }
}
