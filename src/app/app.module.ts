import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeCaptureComponent } from './pages/code-capture/code-capture.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClosedByTechnicianComponent } from './pages/closed-by-technician/closed-by-technician.component';
import {AssignedTicketsComponent} from './pages/assigned-tickets/assigned-tickets.component';
import { InspectionComponent } from './pages/inspection/inspection.component';
import { NewInspectionsComponent } from './pages/new-inspections/new-inspections.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MomentModule } from 'angular2-moment';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    CodeCaptureComponent,
    ClosedByTechnicianComponent,
    AssignedTicketsComponent,
    InspectionComponent,
    NewInspectionsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
