import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  token!: any;
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  constructor(private router: Router,private http : HttpClient) { }

  ngOnInit(): void {
  }

  allerVersElement(element: string): void {
    if(element == 'deconnexion') {
      this.token = localStorage.getItem('token');
      var url = this.path+"supprimerToken/"+this.token;
      this.http.get(url).subscribe(rep => {
        console.log(rep);
      });
      localStorage.clear();
      this.router.navigate(['../']);
    } else {
      this.router.navigate(['../liste']);
    }
  }

}
