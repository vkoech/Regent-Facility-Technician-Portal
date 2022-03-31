import { Component, OnDestroy, OnInit } from '@angular/core';
import {AssignedTicketsService} from '../../shared/services/assignedTickets.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginService} from '../../shared/services/login.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RaisedTicketsModel} from '../../shared/models/raisedTickets.model';
import {AssignedTicketsModel} from '../../shared/models/assignedTickets.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-assigned-tickets',
  templateUrl: './assigned-tickets.component.html',
  styleUrls: ['./assigned-tickets.component.css']
})
export class AssignedTicketsComponent implements OnInit{
  private TechnicianNo: string;
  assignedTicks: AssignedTicketsModel;
  closeResult = '';
  No: any;
  public TicketNo: string;
  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  constructor(public assignedTicketService: AssignedTicketsService, private modalService: NgbModal,
              private SpinnerService: NgxSpinnerService, private router: Router, private toastr: ToastrService,
              ) { }

  open(content, assignedTicks: AssignedTicketsModel) {
    this.assignedTicks = assignedTicks;
    this.assignedTicketService.addComments();
    this.getTicketsById(this.assignedTicks.No);
    this.modalService.open(content, {size: 'md' , ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }
  ngOnInit(): void {
    this.TechnicianNo = localStorage.getItem('techNo');
    this.assignedTicketService.getAssignedByTenantNo(this.TechnicianNo);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // lengthMenu : [5, 10, 25],
      processing: true,
      searching: false,
    };
    // this.dtTrigger.next();
  }

    getTicketsById(TicketNo: string) {
    this.assignedTicketService.getAssignedTicketsById(this.TicketNo);
  }

  onSubmit() {
    console.log(this.assignedTicketService.formModel.value);
    if (this.assignedTicketService.formModel.valid) {
      this.assignedTicketService.addComments().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.assignedTicketService.formModel.reset();
            // this.responseCode = true;
            this.toastr.success(res.responseDescription, 'Updated done successfully!!');
            this.modalService.dismissAll()
            this.SpinnerService.hide();
          } else {
            this.toastr.error('Registration failed');
            this.SpinnerService.hide();
          }
        },
        err => {
          // console.log(this.familyService.formModel.value);
          this.toastr.error(err, 'Error!');
          // console.log(err);
        }
      );
    } else {
      // validate all form fields
      this.toastr.error('All fields Required')
    }
  }
}
