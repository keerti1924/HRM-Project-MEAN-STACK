import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { StaticpagesModule } from './staticpages/staticpages.module';
import { AccountModule } from './account/account.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { AccountserviceService } from './account/accountservice.service';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    DashboardComponent,
    EmployeeComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    StaticpagesModule,
    AccountModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AccountserviceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
