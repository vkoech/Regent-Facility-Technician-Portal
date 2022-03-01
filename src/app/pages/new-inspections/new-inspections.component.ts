import { InspectionLine } from './../../shared/models/inspection-line.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NewInsectionsService } from 'app/shared/services/new-insections.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-inspections',
  templateUrl: './new-inspections.component.html',
  styleUrls: ['./new-inspections.component.css']
})
export class NewInspectionsComponent implements OnInit {

  isDisabled: boolean = true;
  loading = false;
  list: InspectionLine[] = [];
  inspectionLines: InspectionLine[] = [];
  checkedList: any[];
  currentSelected: {};
  public userId: string;
  documentNo: any;
  inspectionArrayList: FormArray;
  inspectionFormList: FormGroup;
  val: any



  constructor(public inspectionService: NewInsectionsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('techNo');
    this.inspectionService.getInspectionHeaderNo(this.userId);
    this.inspectionService.getInspectionItemTypes();
  }
  get f() {  return this.inspectionService.formModel?.controls; }


  onSubmit() {
    if (this.inspectionService.formModel.valid) {
      this.inspectionService.postInspectionHeaderDetails().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.loading = true;
            this.documentNo = this.inspectionService.inspectionHeader?.No;
            this.getInspectionLines(this.documentNo);
            this.toastr.success(res.responseDescription, 'Success');
            this.loading = false;
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
   onDelete(deleteme){
     this.list.splice(deleteme, 1)
   }

  onChecked() {
      this.inspectionService.postInspection(this.list).subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.loading = true;
            this.toastr.success(res.responseDescription, 'Success');
            this.deleteList();
            // window.location.reload();
            // this.list.splice(0, 1);
            this.loading = false;
            this.router.navigate(['/inspection']);
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
  deleteList(){
    if(this.inspectionLines.length >0){
      this.list.splice(0, this.list.length)
    }

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
}
