import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InspectionHeader } from '../models/inspection-header.model';
import { InspectionItemType } from '../models/inspection-item-type.model';
import { InspectionItem } from '../models/inspection-item.model';
import { InspectionLine } from '../models/inspection-line.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService implements OnInit {
 readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/inspection/';
 public loginUserId: string; 
 inspectionHeader:InspectionHeader[];

  constructor(public fb:FormBuilder,public http:HttpClient) { }
  
  ngOnInit(): void {
   //  this.loginUserId = localStorage.getItem('techNo');
     this.getInspectionHeaderByTechnicianNo(localStorage.getItem('techNo'));
  // /  console.log(this.loginUserId);
  }

  getInspectionHeaderByTechnicianNo(loginUserId) {
    this.http.get<InspectionHeader[]>(this.baseUrl + 'getInspectionHeaderByTechnicianNo?technicalNo='+this.loginUserId).subscribe(
      data => {
        this.inspectionHeader = data;
        console.log(this.inspectionHeader);
      }
    );
  }
}

