import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SocketService } from '../socket.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public name ='';
  public group='';
  nameField = false;
  groupField = false;
  constructor(private router: Router,public socketService : SocketService) { }

  ngOnInit(): void {
  }
  joinChat(){
    if(this.name == '' && this.group == ''){
      this.nameField = true;
      this.groupField = true;
    }
    else if(this.name == ''){
       this.nameField = true;
      //  /this.groupField = false;
    }else if(this.group == ''){
      this.groupField = true;
    }else{
      this.nameField = false;
      this.groupField = false;
      // let data={
      //   'name':this.name,
      //   'group' : this.group
      // }
      // this.socketService.postLoginCredentials(data).subscribe(res=>{
      //    console.log(res);
         this.socketService.socketJoin(this.name,this.group);
      // /});
      
      this.router.navigateByUrl('/chatpage')
    }
    
  }
}
