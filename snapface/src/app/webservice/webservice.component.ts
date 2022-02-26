import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signalement } from '../model/signalement';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};
@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.scss']
})
@Injectable({ 
  providedIn: 'root' 
})
export class WebserviceComponent implements OnInit {
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/"; 
  apiURL: string = this.path+'listeSignalement/1/d19b892e5825a9ac8bb120575a009c5144224a4d';
  signalements! : Signalement[];

  constructor(private http : HttpClient) { }

  listeSignalement(): Observable<Signalement[]>{
    console.warn(this.http.get<Signalement[]>(this.apiURL));
    return this.http.get<Signalement[]>(this.apiURL);
  }
  
  ngOnInit(): void {
  }

}
