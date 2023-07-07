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

  constructor(private service: UserResourceService) { }

  ngOnInit(): void {
    this.service.getUser({ id: 1 }).subscribe({
      next: (data: UserDto): void => {
        this.user = data;
      },
      error: (error: any): void => {
        console.error('An error occurred while fetching user data:', error);
      }
    });
  }

}
