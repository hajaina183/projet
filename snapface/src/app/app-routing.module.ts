import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { LoginComponent } from './login/login.component';
import { SignalementComponent } from './signalement/signalement.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailsComponent } from './details/details.component';
import { StatusComponent} from './status/status.component';

const routes: Routes = [
  //{ path:"liste", loadChildren: () => import('./liste/liste.module').then(m => m.ListeModule) },
  { path: "liste", component: ListeComponent},
  { path: "", component: LoginComponent},
  { path: "signalement", component: SignalementComponent},
  { path: "navbar", component: NavbarComponent},
  { path: "details", component: DetailsComponent},
  { path: "status", component: StatusComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

