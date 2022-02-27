import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signalement } from '../model/signalement';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Region } from './../model/region';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  map!: L.Map;
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  token!: any;
  idRegion!: number;
  path = "https://hajaina-11.herokuapp.com/"; 
  //path = "http://localhost:8080/";
  apiURL: string = this.path+'listeSignalement/';
  signalements! : Observable<Signalement[]>;
  status!: string;
  type!: string;
  dateMin!: Date;
  dateMax!: Date;
  urlTI!: string;
  markers!: L.Marker[];
  region!: Region; 
  constructor(private router: Router, private http : HttpClient, public datepipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.createMap();
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.idRegion = Number(localStorage.getItem('idRegion'));
    if(this.token == null) {
      alert("Veuiller vous connecter!!");
      this.router.navigate(['../']);
    }
    this.getRegion().subscribe(reg=>{
      this.region = reg;
    });
    console.warn("region : "+this.region);
    this.signalements = this.listeSignalementAuth(this.token,this.idRegion);
    console.warn(this.signalements);
  }
  createMap() {
    var listeSignalement = <Signalement[]>[];
    this.signalements.subscribe(signalement =>{
      listeSignalement = signalement;

      this.map = L.map('map', {
        center: [this.region.latitude,this.region.longitude],
        zoom: 8 //zoom level initial
      });
      const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 7,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      // -- FIN INIT

      //MANAGE MARKER & POPUP
      this.addMarker(listeSignalement);

      /*for(let signalem of listeSignalement){
        const marker = L.marker([signalem.latitude,signalem.longitude],{icon : this.smallIcon}).addTo(this.map);
        marker.on('mouseover',(e:L.LeafletMouseEvent)=>{
          marker.bindTooltip("<b>"+signalem.titre+"</b>",{offset:L.point(0,-41),direction:'top'});
        });
        marker.on('click',(e:L.LeafletMouseEvent)=>{
          console.log(signalem.image);
          var img = "data:image/png;base64,"+signalem.image;
          marker.bindPopup("<h2>"+signalem.titre+"</h2><img src="+img+" style='width:50%'></br><p>"+signalem.description+"</p>");
          //this.detailSignalement(signalem.id);

        });
      }*/
    });
  
  }

  addMarker(listeSignalement : Signalement[]){
    this.markers = <L.Marker[]>[];
    console.log(this.markers);
    for(let signalem of listeSignalement){
      const marker = L.marker(
          [signalem.latitude,signalem.longitude],
          {icon : new L.Icon({
              iconUrl: 'assets/icon/'+signalem.idType+'.png',
              iconSize:    [50, 60],
              iconAnchor:  [12, 41],
              popupAnchor: [1, -34],
            })
          }
        ).addTo(this.map);

        marker.on('mouseover',(e:L.LeafletMouseEvent)=>{
          marker.bindTooltip("<b style=\" font-size:18px; \" >"+signalem.titre+"</b>",{offset:L.point(12,-37),direction:'top'});
        });

        marker.on('click',(e:L.LeafletMouseEvent)=>{
          console.log(signalem.image);
          var img = "data:image/png;base64,"+signalem.image;
          localStorage.setItem('idSignalement', signalem.id.toString());
          marker.bindPopup("<h2>"+signalem.titre+"</h2><img src="+img+" style='width:50%'></br><p>"+signalem.description+"</p></br><a href='../details'>Voir plus</a>");
          console.log("clicked : "+signalem.titre);
        });
        this.markers.push(marker);
    }
  }

  listeSignalementAuth(token:any,idRegion:any): Observable<Signalement[]>{
    var url = this.path+'listeSignalement/'+idRegion+"/"+token;
    return this.http.get<Signalement[]>(url);
  }

  listeSignalementRecherche(token:any,idRegion:any,status:any): Observable<Signalement[]>{
    var url = this.path+'listeSignalementRechercher/'+idRegion+"/"+status+"/"+token;
    return this.http.get<Signalement[]>(url);
  }

  detailSignalement(id : any){
    this.router.navigateByUrl('/detailsignalement');
    localStorage.setItem('idSignalementDetail',id.toString());
  }

  recherche() {
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
      console.log("status : "+this.dateMax);
      var urlR = this.path+"listeSignalementRechercherF/";
      this.urlTI = urlR+this.idRegion+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    } else if(this.status != null && this.type == null && this.dateMin != null && this.dateMax != null) {
      var urlR = this.path+"listeSignalementRechercherG/";
      this.urlTI = urlR+this.idRegion+"/"+this.status+"/"+this.datepipe.transform(this.dateMin, 'yyyy-MM-dd')+"/"+this.datepipe.transform(this.dateMax, 'yyyy-MM-dd')+"/"+this.token;
    }
    this.removeMarker();
    var listeSignalement = <Signalement[]>[];
    this.http.get<Signalement[]>(this.urlTI).subscribe(sign1=>{
      listeSignalement = sign1;
      this.addMarker(listeSignalement);
    });
  }

  removeMarker(){
    for(let marker of this.markers){
      this.map.removeLayer(marker);
    }
  }

  getRegion():Observable<Region>{
    var url = this.path+'region/'+this.idRegion+"/"+this.token;
    console.log("url region : "+url);
    console.warn("valiny : "+this.http.get<Region>(url));
    return this.http.get<Region>(url);
  }

  voirPLus( val: any ){
    console.log("ouii je suis la");
    console.log(val);
    localStorage.setItem('idSignalement', val);
    this.router.navigate(['../details']);
  }

}
