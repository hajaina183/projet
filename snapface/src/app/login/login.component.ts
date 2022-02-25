import { Component, OnInit } from '@angular/core';
import { FormLoginFront } from '../model/formLoginFront';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ReponseLoginFront } from '../model/reponseLoginFront';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nom!: string;
  mdp!: string;
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  apiURL: string = this.path+'traitementLoginFront';
  reponseLogFront!: ReponseLoginFront;
  constructor(private http : HttpClient,private router: Router) { }

  ngOnInit(): void {
  }

  traitementLogin(){
    var formLog = new FormLoginFront();
    formLog.nom = this.nom;
    formLog.mdp = this.mdp;
    console.warn(formLog);
    console.warn(this.http.post<ReponseLoginFront[]>(this.apiURL,formLog));
    this.http.post<ReponseLoginFront>(this.apiURL,formLog).subscribe(rep => {
      this.reponseLogFront = rep;
      console.warn(this.reponseLogFront);
      if(this.reponseLogFront.reponse != 0) {
        console.log(this.router)
        this.router.navigate(['../liste']);
        localStorage.setItem('token', this.reponseLogFront.token);
        localStorage.setItem('idRegion', this.reponseLogFront.reponse.toString());
      } else {
        alert("Compte introuvable");
      }
    });
  }
}
