import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { InspectionHeader } from '../models/inspection-header.model';
import { InspectionItemType } from '../models/inspection-item-type.model';
import { InspectionItem } from '../models/inspection-item.model';
import { InspectionLine } from '../models/inspection-line.model';

@Injectable({
  providedIn: 'root'
})
export class NewInsectionsService {

  inspectionItemTypes: InspectionItemType[];
  inspectionItems: InspectionItem[];
  inspectionLines: InspectionLine[] = [];
  inspectionHeader: InspectionHeader[] = [];
  checkedList: InspectionLine[]


  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/inspection/';

  formModel = this.fb.group({
    DocumentNo: ['', Validators.required],
    TechnicianNo: [''],
    Type: ['', Validators.required],
    ItemCode: ['', Validators.required],
  });
  forModelListItems=this.fb.group({
    LineNo: ['', Validators.required],
    Checked: ['', [Validators.required]],
    DocumentNo: ['', [Validators.required]],
    Comments: ['', [Validators.required]],
    forModelListItems: this.fb.array([this.forModelArray()])
});
  private forModelArray(): any {
    return this.fb.group({
      LineNo: ['', [Validators.required]],
      DocumentNo: ['', [Validators.required]],
      Checked: ['', Validators.required],
      Comments: ['', Validators.required],
    });
  }
  constructor(public fb: FormBuilder, public http: HttpClient) { }

  //post inspection header details
  postInspectionHeaderDetails() {
    const body = {
      DocumentNo: this.formModel.value.DocumentNo,
      TechnicianNo: this.formModel.value.TechnicianNo,
      Type: this.formModel.value.Type,
      ItemCode: this.formModel.value.ItemCode,
    };
    return this.http.post(this.baseUrl + '/InsertInspectionLines', body);
  }
  postInspection(list: InspectionLine[]) {
    return this.http.post(this.baseUrl + 'postInspectionLineDetails', list);
  }
  getGeneratedNo(documentNo) {
    this.http.get<InspectionLine[]>(this.baseUrl + 'getInspectionLines?headerNo=' + documentNo).subscribe(
      data => {
        this.inspectionLines = data;
        // console.log(this.inspectionLines);
      }
    );
  }
  //get inspection types
  getInspectionItemTypes() {
    this.http.get<InspectionItemType[]>(this.baseUrl + 'getInspectionItemTypes').subscribe(
      data => {
        this.inspectionItemTypes = data;
      }
    );
  }

  // get inspection items
  getInspectionItemsByTypes(type) {
    this.http.get<InspectionItem[]>(this.baseUrl + 'getInspectionItems?type=' + type).subscribe(
      data => {
        this.inspectionItems = data;
      }
    );
  }
  //Get inspection lines
  insetrtInspectionLines(documentNo: string, type: string, itemCode: string) {
    this.http.get<InspectionLine[]>(this.baseUrl + 'inspectionLines?DocumentNo=' + documentNo + '&Type=' + type + '&ItemCode=' + itemCode).subscribe(
      data => {
        this.inspectionLines = data;
      }
    );

  }
  //Get inspection header No.
  getInspectionHeaderNo(userId) {
    this.http.get<InspectionHeader[]>(this.baseUrl + 'getInspectionHeaderNo?technicianNo=' + userId).subscribe(
      data => {
        this.inspectionHeader = data;
        localStorage.setItem("inspectionHeader", JSON.stringify(this.inspectionHeader)); //store colors
      }
    );
  }

}
