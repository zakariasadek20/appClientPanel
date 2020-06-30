import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from './../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
   
   id: string;
   client: Client = {
     id:'',
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    balance:0
   } 
   showBalance :boolean=false;
  constructor(
   private clientService: ClientService,
   private route: ActivatedRoute,
   private router: Router,
   private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client)
      
    })

  }
  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated',{ cssClass:'alert-warning',timeout: 4000 })
    
  }

  deleteClient(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.flashMessage.show('Client deleted',{ cssClass:'alert-danger',timeout: 4000 });
        this.router.navigate(['/'])
        Swal.fire({
           title: 'Are you sure?',
           text: 'This Client is deleted!',
           icon: 'success',
           timer: 3000
          }
        )
     
      } 
    })
      
    }

    }

 