import { Component, OnInit  } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
import {SocketService } from './socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'chatUI';
  constructor(private router: Router,public socketService : SocketService) { }
  ngOnInit(): void {
    this.socketService.setupSocketConnection();
      this.router.navigate([''])
  }
}
