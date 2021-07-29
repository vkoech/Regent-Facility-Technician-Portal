import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {PropertyModel} from '../models/property.model';
import {FloorModel} from '../models/floor.model';
import {UnitsModel} from '../models/units.model';
import {UserModel} from '../models/user.model';
import {CategoriesModel} from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class NewTicketsService {

  readonly baseUrl = 'https://regent.angazake.com/facility-moduleapi/api/' ;
  propertyCode: PropertyModel [];
  floorNo: FloorModel[];
  floorUnits: UnitsModel [];
  user: UserModel[];
  categoryCodes: CategoriesModel[]


  formModel = this.fb.group({
    TenantNo: ['', Validators.required],
    PropertyNo: ['', Validators.required],
    FloorNo: ['', Validators.required],
    UnitNo: ['', Validators.required],
    Category: ['', Validators.required],
    DescriptionOfMaintenace: ['', Validators.required],
    RequestStatus: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) {}


// tslint:disable-next-line:typedef
  insertDetails() {
    const body = {
      TenantNo: this.formModel.value.TenantNo,
      PropertyNo: this.formModel.value.PropertyNo,
      FloorNo: this.formModel.value.FloorNo,
      UnitNo: this.formModel.value.UnitNo,
      Category: this.formModel.value.Category,
      DescriptionOfMaintenace: this.formModel.value.DescriptionOfMaintenace,
      RequestStatus: this.formModel.value.RequestStatus,

    };
    return this.http.post(this.baseUrl + '/maintenance/createServiceRequest', body);
  }
  getPropertyCode() {
      this.http.get<PropertyModel[]>(this.baseUrl + '/maintenance/getMaintenanceProperties').subscribe(
        data => {
          this.propertyCode = data;
          // console.log(this.propertyCode)
        }
      );
  }
  getCategories() {
    this.http.get<CategoriesModel[]>(this.baseUrl + '/maintenance/getMaintenanceCategories').subscribe(
      data => {
        this.categoryCodes = data;
        // console.log(this.categoryCodes)
      }
    );
  }
  getFloors(No: String) {
    // tslint:disable-next-line:max-line-length
    this.http.get<FloorModel[]>(this.baseUrl + '/maintenance/getMaintenancePropertyFloors?propertyCode=' + No).subscribe(
      data => {
        this.floorNo = data;
        // console.log(this.floorNo)
      }
    );
  }
  getFloorsUnits(FloorCode: String) {
    // tslint:disable-next-line:max-line-length
    this.http.get<UnitsModel[]>(this.baseUrl + '/maintenance/getMaintenanceFloorUnits?floorCode=' + FloorCode).subscribe(
      data => {
        this.floorUnits = data;
        // console.log(this.floorUnits)
      }
    );
  }
  getAllRecordsByLoggedInUser(TenantNo: String) {
    // tslint:disable-next-line:max-line-length
    this.http.get<UserModel[]>(this.baseUrl + '/maintenance/getMaintenanceServiceRequests?techinicianNo=' + TenantNo).subscribe(
      data => {
        this.user = data;
        console.log(this.user)
      }
    );

  }
}
