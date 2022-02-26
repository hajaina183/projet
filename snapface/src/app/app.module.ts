import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { WebserviceComponent } from './webservice/webservice.component';
import { HttpClientModule } from '@angular/common/http';
import { SignalementComponent } from './signalement/signalement.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ListePipe } from './liste.pipe';
import { CommonModule } from '@angular/common';
import { ListeModule } from './liste/liste.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailsComponent } from './details/details.component';
import { StatusComponent } from './status/status.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FaceSnapComponent,
    WebserviceComponent,
    SignalementComponent,
    LoginComponent,
    ListePipe,
    DetailsComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ListeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
