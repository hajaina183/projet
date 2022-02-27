import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signalement } from '../model/signalement';
import { DatePipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  token!: any;
  idRegion!: number;
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  apiURL: string = this.path+'listeSignalement/';
  signalements! : Signalement[];
  status!: string;
  type!: string;
  dateMin!: Date;
  dateMax!: Date;
  urlTI!: string;
  constructor(private router: Router, private http : HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.idRegion = Number(localStorage.getItem('idRegion'));
    if(this.token == null) {
      alert("Veuiller vous connecter!!");
      this.router.navigate(['../']);
    }
    var url = this.apiURL+this.idRegion+"/"+this.token;
    console.log("url dep : "+url);
    this.http.get<Signalement[]>(url).subscribe(signl => {
      this.signalements = signl;
      console.warn(this.signalements);
    });
  }

  recherche() {
    console.log("status : "+this.status);
    this.token = localStorage.getItem('token');
    this.idRegion = Number(localStorage.getItem('idRegion'));
    if(this.token == null) {
      alert("Veuiller vous connecter!!");
      this.router.navigate(['../']);
    }
    if(this.status != null && this.type == null && this.dateMin == null && this.dateMax == null) {
      var urlR = this.path+"listeSignalementRechercherA/";
      this.urlTI = urlR+this.idRegion+"/"+this.status+"/"+this.token;
    } else if(this.status != null && this.type != null && this.dateMin == null && this.dateMax == null) {
      var urlR = this.path+"listeSignalementRechercherB/";
      this.urlTI = urlR+this.idRegion+"/"+this.status+"/"+this.type+"/"+this.token;
    } else if(this.status != null && this.type != null && this.dateMin != null && this.dateMax != null) {
      var urlR = this.path+"listeSignalementRechercherC/";
      this.urlTI = urlR+this.idRegion+"/"+this.status+"/"+this.type+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    } else if(this.status == null && this.type != null && this.dateMin == null && this.dateMax == null) {
      var urlR = this.path+"listeSignalementRechercherD/";
      this.urlTI = urlR+this.idRegion+"/"+this.type+"/"+this.token;
    } else if(this.status == null && this.type != null && this.dateMin != null && this.dateMax != null) {
      var urlR = this.path+"listeSignalementRechercherE/";
      this.urlTI = urlR+this.idRegion+"/"+this.type+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    } else if(this.status == null && this.type == null && this.dateMin != null && this.dateMax != null) {
      var urlR = this.path+"listeSignalementRechercherF/";
      this.urlTI = urlR+this.idRegion+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    } else if(this.status != null && this.type == null && this.dateMin != null && this.dateMax != null) {
      var urlR = this.path+"listeSignalementRechercherG/";
      this.urlTI = urlR+this.idRegion+"/"+this.status+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    }
    this.http.get<Signalement[]>(this.urlTI).subscribe(signl => {
      this.signalements = signl;
      console.warn(this.signalements);
    });
  }

  voirPLus( val: any ){
    console.log("ouii je suis la");
    console.log(val);
    localStorage.setItem('idSignalement', val);
    this.router.navigate(['../details']);
  }
}
