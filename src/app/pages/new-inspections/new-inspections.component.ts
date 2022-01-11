import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InspectionLine } from 'app/shared/models/inspection-line.model';
import { NewInsectionsService } from 'app/shared/services/new-insections.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-new-inspections',
  templateUrl: './new-inspections.component.html',
  styleUrls: ['./new-inspections.component.css']
})
export class NewInspectionsComponent implements OnInit {

  isDisabled: boolean = true;
  list: InspectionLine[] = [];
  inspectionLines: InspectionLine[] = [];
  checkedList: any[];
  currentSelected: {};
  public userId: string;
  documentNo: string;
  inspectionArrayList: FormArray;
  inspectionFormList: FormGroup;



  constructor(public inspectionService: NewInsectionsService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inspectionService.getInspectionItemTypes();
    this.userId = localStorage.getItem('techNo');
    this.documentNo = localStorage.getItem('docNumber');
    // console.log(this.documentNo);
    this.inspectionService.getInspectionHeaderNo(this.userId);
    // this.getInspectionLines(this.documentNo);

  }
  get f() {  return this.inspectionService.formModel?.controls; }


  onSubmit() {
    localStorage.setItem('docNumber', this.inspectionService.formModel.value.DocumentNo);
    if (this.inspectionService.formModel.valid) {
      this.inspectionService.postInspectionHeaderDetails().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.toastr.success(res.responseDescription, 'Success');
            localStorage.setItem('docNumber',
            this.inspectionService.formModel.value.DocumentNo);
            // this.inspectionService.formModel.reset();
           //this.inspectionService.getInspectionHeaderNo(this.userId);
            this.getInspectionLines(this.documentNo);
          }
          else {
            this.toastr.error(' failed');
          }
          //alert(res.responseDescription);
        },
        err => {
          this.toastr.error(err, 'Error!');
        }
      );
    }
    else {
      this.toastr.error('All fields Required')
    }
  }

  onChecked() {
    console.log(this.inspectionService.formModel.value)
      this.inspectionService.postInspection(this.list).subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.toastr.success(res.responseDescription, 'Success');
            window.location.reload();
          }
          else {
            this.toastr.error( res.responseDescription, ' failed');
          }
         // alert(res.responseDescription);
        },
        err => {
          this.toastr.error(err, 'Error!');
        }
      );

  }
  onCheckboxChange(inspectionLine: InspectionLine) {

    if (inspectionLine.Checked === true) {
      // Pushing the object into array
      this.list.push(inspectionLine);
      // console.log(this.list);

    }
    else {
      let removeIndex = this.list.findIndex(itm => itm.Checked===inspectionLine.Checked===false);

      if(removeIndex !== -1)
      console.log(this.list);
        this.list.splice(removeIndex,1);
    }
  }

  getInspectionItems(Type) {
    this.inspectionService.getInspectionItemsByTypes(Type);
  }
  //Get inspection lines
  getInspectionLines(documentNo: String) {
    this.inspectionService.getGeneratedNo(documentNo);
  }
  // getSelectedValue() {
  //   console.log(this.inspectionService.formModel.value.LineNo)
  // }

}
