import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SqsflowComponent } from './components/sqsflow/sqsflow.component';
import { ApidemoComponent } from './components/apidemo/apidemo.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';

const routes: Routes = [
  {path:'', component:DashboardComponent, pathMatch:'full'},
  {path:'home', component:DashboardComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'bookings', component:BookingsComponent},
  {path:'SQSFlow', component:SqsflowComponent},
  {path:'apidemo', component:ApidemoComponent},
  {path:'login', component:AuthenticateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
