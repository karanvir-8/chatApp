import { Component, OnInit } from '@angular/core';
import {SocketService } from '../socket.service'
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  constructor(public socketService : SocketService) { }
  text;
  coordinates;
  
  ngOnInit(): void {
 //   this.socketService.setupSocketConnection();
  }
  socket : any;
  increment(){
  //  console.log(this.text);
    this.socketService.socketValue(this.text);
    this.text = '';
    document.getElementById('title').focus();
    this.socketService.socketIncrement();
  }
  getLocation(){
   if(!navigator.geolocation){
     return alert('geoLocation is not supported by your Browser');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
       console.log(position)
       this.coordinates = {
         'latitude' : position.coords.latitude,
         'longitude' : position.coords.longitude
       }
      this.socketService.location(this.coordinates);
    })
  }

}
