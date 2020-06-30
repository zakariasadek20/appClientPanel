import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from './../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-edite-client',
  templateUrl: './edite-client.component.html',
  styleUrls: ['./edite-client.component.css']
})
export class EditeClientComponent implements OnInit {
   
  id: string;
  client: Client = {
    // id:'',
   firstName:'',
   lastName: '',
   email:'',
   phone:'',
   balance:0
  }
   
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.clientService.getClient(this.id).subscribe(client => {
        this.client = client;
        console.log(this.client)
      })
  
    }
  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client updated', {cssClass:"alert-success",timeout: 5000} );
    this.router.navigate(['/'])
  }
}
