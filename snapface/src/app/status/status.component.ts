import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusSignalement } from '../model/statusSignalement';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  apiURL: string = this.path+'listeStatusSignalement';
  apiURL1: string = this.path+'changerStatusTraitement';
  statusSignalements! : StatusSignalement[];
  token : any ;
  idSignalement : any;
  idStatus : any;

  constructor(private router: Router, private http : HttpClient) { }

  ngOnInit(): void {
    console.log("ito ny URL "+this.apiURL);
    this.http.get<StatusSignalement[]>(this.apiURL).subscribe(signl => {
      this.statusSignalements = signl;
      console.warn(this.statusSignalements);
    });
  }

  onChange(event: any ): void {  //event will give you full breif of action
    const newVal = event.target.value;
    this.idStatus = newVal
    this.token = localStorage.getItem('token');
    this.idSignalement = Number(localStorage.getItem('idSignalement'));
    console.log("idSignalement "+this.idSignalement);
    var url = this.apiURL1+"/"+newVal+"/"+this.idSignalement+"/"+this.token;
    console.log("url update "+url);
    this.http.get(url).subscribe(signl => {
      console.log("vitaa"+signl);
    });
    this.router.navigate(['../liste']);
  }
  
}
