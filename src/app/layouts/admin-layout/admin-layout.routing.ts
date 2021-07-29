import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import {ClosedByTechnicianComponent} from '../../pages/closed-by-technician/closed-by-technician.component';
import {AssignedTicketsComponent} from '../../pages/assigned-tickets/assigned-tickets.component';
import { InspectionComponent } from 'app/pages/inspection/inspection.component';
import { NewInspectionsComponent } from 'app/pages/new-inspections/new-inspections.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'closedByTechnician', component: ClosedByTechnicianComponent },
    { path: 'assignedTickets', component: AssignedTicketsComponent },
    { path: 'inspection', component: InspectionComponent },
    { path: 'newInspection', component: NewInspectionsComponent},
];
