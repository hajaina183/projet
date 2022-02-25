import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signalement } from '../model/signalement';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  idSignalement : any
  token : any
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  apiURL: string = this.path+'detailSignalement/';
  signalements! : Signalement;
  image! : string;

  constructor(private router: Router,private http : HttpClient) { }

  ngOnInit(): void {
    this.idSignalement = Number(localStorage.getItem('idSignalement'));
    this.token = localStorage.getItem('token');
    var url = this.apiURL+this.idSignalement+"/"+this.token;
    console.log(url);
    this.http.get<Signalement>(url).subscribe(signl => {
      this.signalements = signl;
      console.warn("huhuhu "+this.signalements);
      this.image = 'data:image/png;base64,' + this.signalements.image;
      console.log(this.image)
    });


  }

  huhu(){
    console.log("je suis la")
    this.router.navigate(['../status']);
  }

}
