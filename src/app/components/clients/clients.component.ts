import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2'
import { AuthClientService } from 'src/app/services/auth-client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
 
  clients: Client[];
  total: number = 0; 
  searchClients: Client[];

  constructor(
    private authClientService: AuthClientService,
    private clientService: ClientService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    
        this.authClientService.getAuth().subscribe(auth=>{
        this.clientService.getClients(auth.uid).subscribe(clients=>{
        this.searchClients = this.clients  = clients
        this.total    = this.getTotal()
      })
    })
  
  }
  getTotal(){

    return this.clients.reduce((total, client) => {
     return total + parseFloat(client.balance.toString());
    },0)
  }
   
  search(query: string){
      this.searchClients = (query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(query.toLowerCase()) || client.lastName.toLowerCase().includes(query.toLowerCase()) || client.email.toLowerCase().includes(query.toLowerCase()) || client.phone.toLowerCase().includes(query.toLowerCase())) : this.clients; 
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

