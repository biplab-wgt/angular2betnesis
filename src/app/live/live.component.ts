import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from '../_services/index';

import { LivefeedService } from '../livefeed.service';
@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  livedata: any = [];
  constructor(private router: Router, public alertService: AlertService, public livefeedService: LivefeedService) { }

  ngOnInit() {
    this.alertService.loader(true);
    if (this.alertService.checkaccess()) {
      
    } else {
      this.router.navigate(['Login']);
      this.alertService.warn('Login First');
    }

    this.livefeedService.getlive().subscribe((res) => {
      //console.log(res);
      //this.livedata.push(res.message[0].data.events);
      if (res.message[0]) {
        for (let key in res.message[0].data.events) {
          this.livedata.push(res.message[0].data.events[key]);
        }
      }
      
      //console.log(this.livedata);
    })

    this.livefeedService.getLivefeed().subscribe((res) => {
      this.livedata = [];
      if (res) {
        for (let key in res['events']) {
          this.livedata.push(res['events'][key]);
        }
      }
      
      //console.log(this.livedata);
    })
  }

}
