import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from 'src/app/models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

    client : Client = {
    
    firstName:"",
    lastName: "",
    email:"",
    phone:"",
    balance:0,
    user:'',
   } 

  constructor(
    private authClientService: AuthClientService,
    private ClientService: ClientService,
     private route: Router,
     private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {

      this.authClientService.getAuth().subscribe(auth =>{
      this.client.user= auth.uid 

    })

  }
  onSubmit(){

    this.ClientService.newClient(this.client);

    this.flashMessages.show('Client added successfully.', {cssClass:"alert-success",timeout: 5000} )
    
    return this.route.navigate(['/']);
  }
}
