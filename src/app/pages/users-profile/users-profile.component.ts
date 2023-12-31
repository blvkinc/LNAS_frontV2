import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/api/models';
import { UserResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user: UserDto;
  fname: String;
  constructor(private service: UserResourceService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.service.getUser({ id: 1 }).subscribe({
      next: (data: UserDto): void => {
        this.user = data;
      },
      error: (error: any): void => {
        console.error('An error occurred while fetching user data:', error);
      }
    });
  }

  updateUser(): void {
    this.user.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.user.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.user.address = (<HTMLInputElement>document.getElementById('Address')).value;
    this.user.email = (<HTMLInputElement>document.getElementById('Email')).value;
    this.user.phone = (<HTMLInputElement>document.getElementById('Phone')).value;

  }

    
}
