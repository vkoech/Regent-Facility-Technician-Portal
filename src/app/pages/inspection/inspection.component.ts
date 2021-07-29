import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InspectionHeader } from 'app/shared/models/inspection-header.model';
import { InspectionService } from 'app/shared/services/inspection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  
  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/inspection/';
  USERID: string;
  inspectionJsonValues:InspectionHeader[];

  constructor(private router: Router, private toastr: ToastrService,public http:HttpClient) { }

  ngOnInit():void{
    this.USERID = localStorage.getItem('techNo');
    this.getInspectionHeaderByTechnicianNo();   
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
