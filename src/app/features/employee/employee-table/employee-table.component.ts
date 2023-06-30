import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeDto} from '../../../api/models/employee-dto';
import {EmployeeResourceService} from '../../../api/services/employee-resource.service';
import {CustomerDto} from '../../../api/models/customer-dto';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
})
export class EmployeeTableComponent implements OnInit {

  @Output() onEdit: EventEmitter<EmployeeDto> = new EventEmitter<EmployeeDto>();

  employees: EmployeeDto[] = [];
  currentPage = 1;
  pageSize = 5;
  totalElements = 0;
  sortBy = ['id,desc'];
  filter = '';

  pageNumbers: number[] = [];
  totalPages: number;

  constructor(
    private service: EmployeeResourceService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  onEditClick(plant: CustomerDto) {
    this.onEdit.emit(plant);
  }

  fetchData(): void {
    this.service.paginateEmployees({
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: this.sortBy,
    }).subscribe({
      next: (data) => {
        this.employees = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.pageNumbers = new Array(data.totalPages).fill(0).map((x, i) => i + 1);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

}
