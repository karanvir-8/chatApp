import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  disable = false;
  chatArray = [];
  chatLocation = [];
  users = [];
  room = '';

  constructor(private http: HttpClient) {
    //this.now = moment();
   }
  
  autoScroll(){
     
  }

  setupSocketConnection() {
    //setup connection with socket.io node.js
    this.socket = io('http://localhost:3000');
   
    //event listener
    this.socket.on('message',(count)=>{
      console.log(count)
      count.createdAt = moment(count.createdAt).format('h:mm a')
      this.chatArray.push(count);
      console.log(this.chatArray)
    });

    //Location listener
    this.socket.on('location',(loc)=>{
      console.log(loc);
      loc.createdAt = moment(loc.createdAt).format('h:mm')
      this.chatArray.push(loc);
      this.chatLocation.push(loc)
    });

    //Userlist listener
    this.socket.on('roomData',({room,users})=>{
      this.users = users;
      this.room = room
      console.log(this.room)
      console.log(this.users)

    })

    
  }
  socketJoin(username,room){
    //name group listener
    console.log(username,room)
    this.socket.emit('join',{username,room},(error)=>{
       console.log(error);
    })
  }
  socketIncrement(){
    this.socket.emit('increment');
  }
  socketValue(value){
    this.disable = true;
    this.socket.emit('value',value,(status)=>{
      console.log(status);
      this.disable = false;
    });
  }
  location(loc){
    this.disable = true;
    this.socket.emit('location',loc,(status)=>{
      console.log(status);
      this.disable = false;
    })  
  }

  postLoginCredentials(data){
  //  /console.log(data); 
   return this.http.post(`http://localhost:3000/loginCredentials`,data) 
  }
  

}
