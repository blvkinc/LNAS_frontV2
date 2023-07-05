import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  constructor() { }

  user = JSON.parse(localStorage.getItem('auth') || '{}');

  ngOnInit(): void {
  }

}
