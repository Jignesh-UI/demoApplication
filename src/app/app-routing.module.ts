import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SqsflowComponent } from './components/sqsflow/sqsflow.component';
import { ApidemoComponent } from './components/apidemo/apidemo.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {path:'', component:DashboardComponent, pathMatch:'full'},
  {path:'home', component:DashboardComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'bookings', component:BookingsComponent, canActivate:[AuthGuardService]},
  {path:'SQSFlow', component:SqsflowComponent, canActivate:[AuthGuardService]},
  {path:'apidemo', component:ApidemoComponent, canActivate:[AuthGuardService]},
  {path:'login', component:AuthenticateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule { }
