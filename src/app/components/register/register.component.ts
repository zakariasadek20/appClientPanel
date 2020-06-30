import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
   private authClient: AuthClientService,
   private router: Router,
   private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }
  onRegister(){
    this.authClient.register(this.email, this.password)
    .then(register => {
      this.flashMessage.show('Congratulation you are Logged',{
        cssClass: 'alert-success', timeout: 5000
      })
      this.router.navigate(['/'])
    })
    .catch(error => {
      this.flashMessage.show(error.message,{
        cssClass: 'alert-warning',timeout: 5000
      })
  }
    )}
}
