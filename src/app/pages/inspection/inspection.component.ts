import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InspectionHeader } from 'app/shared/models/inspection-header.model';
import { InspectionService } from 'app/shared/services/inspection.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/inspection/';
  USERID: string;
  inspectionJsonValues:InspectionHeader[];
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private toastr: ToastrService,public http:HttpClient) { }

  ngOnInit():void{
    this.USERID = localStorage.getItem('techNo');
    this.getInspectionHeaderByTechnicianNo();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      // lengthMenu : [5, 10, 25],
      processing: true,
      searching: false,
    };
  }
  onSubmit(){
  }
  getInspectionHeaderByTechnicianNo() {
    this.http.get<InspectionHeader[]>(this.baseUrl + 'getInspectionHeaderByTechnicianNo?technicianNo='+this.USERID).subscribe(
      data => {
        this.inspectionJsonValues = data;
        // console.log(this.inspectionJsonValues);
      }
    );
   }
}
