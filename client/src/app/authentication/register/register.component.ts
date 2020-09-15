import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string;
  message: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    this.authService.registerUser(form.value).subscribe(response => {
      console.log(response);
      form.reset();
      if (response.error) {
        this.error = response.message;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } else {
        this.message = "Registration successful. Please Login!!!";
        setTimeout(() => {
          this.message = null;
        }, 5000);
      }
    })
  }

}
