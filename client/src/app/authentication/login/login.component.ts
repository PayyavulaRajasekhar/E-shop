import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  error: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    this.authService.login(form.value).subscribe(response => {
      console.log(response);
      form.reset();
      if (response.error) {
        this.error = response.message;
        setTimeout(()=> {
          this.error = null;
        }, 5000);
      } else {
        localStorage.setItem('loginResponse', JSON.stringify(response));
        this.router.navigate(['/']);
      }
    })
  }

}
