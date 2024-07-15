import { Component } from '@angular/core';
import {  NFormsModule } from 'ui-components-lib';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NFormsModule,
    HttpClientModule,
    CommonModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
a={}
login() {
  this.a=this.dataService.login(this.form_data)
  if(this.a === true){
this.router.navigate(['crud'])
  }else{
    alert('invalid password or username')
  }

}

  constructor(
    private dataService :DataService,
    private router: Router
  ){}

  form_data=  {};

formControls=[
{
  label:'Userame',
  type:'text',
  name:'username',
  options: {
    placeholder: 'Please enter your username',
  },
},
{
  label:'Password',
  type:'password',
  name:'password',
  options: {
    placeholder: 'Please enter your password',
  },
},
]

back() {
  this.router.navigate(['/crud'])

}
}
