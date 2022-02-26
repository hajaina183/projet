import { Component, OnInit } from '@angular/core';
import { Signalement } from '../model/signalement';
import { WebserviceComponent } from '../webservice/webservice.component';

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.component.html',
  styleUrls: ['./signalement.component.scss']
})
export class SignalementComponent implements OnInit {

  signalements! : Signalement[];
  constructor(private webserviceComponent : WebserviceComponent) { }

  ngOnInit(): void {
    this.webserviceComponent.listeSignalement().subscribe(signl => {
      this.signalements = signl;
      console.warn(this.signalements);
    });
  }

}
