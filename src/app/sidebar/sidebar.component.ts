import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/assignedTickets',      title: 'Assigned Tickets',   icon: 'nc-vector',       class: '' },
    { path: '/closedByTechnician',      title: 'Closed Tickets',   icon: 'nc-bullet-list-67',       class: '' },
     { path: '/inspection',      title: 'Inspection Areas',   icon: 'nc-align-center',       class: '' },
];

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
