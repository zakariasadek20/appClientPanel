
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { EditeClientComponent } from './components/edite-client/edite-client.component';




const routes: Routes = [
  { path:"",component:DashboardComponent, canActivate: [AuthGuardGuard] },
  { path:"login",component:LoginComponent },
  { path:"register",component:RegisterComponent },
  { path:"client/add",component:AddClientComponent, canActivate: [AuthGuardGuard]},
  { path:"client/edit/:id",component:EditeClientComponent, canActivate: [AuthGuardGuard]},
  { path:"client/:id",component:DetailClientComponent , canActivate: [AuthGuardGuard]},
  { path:"settings",component:SettingsComponent, canActivate: [AuthGuardGuard]},
  { path:"** ",component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
