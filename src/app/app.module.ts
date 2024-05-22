import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { SqsflowComponent } from './components/sqsflow/sqsflow.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ApidemoComponent } from './components/apidemo/apidemo.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    BookingsComponent,
    SqsflowComponent,
    LoadingComponent,
    ApidemoComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,FormsModule,ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
