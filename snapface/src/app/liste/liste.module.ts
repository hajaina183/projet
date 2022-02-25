import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste.component';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListeComponent,
    MapComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    MapComponent,
    NavbarComponent
  ]
})
export class ListeModule { }
