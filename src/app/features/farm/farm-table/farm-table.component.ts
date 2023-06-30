import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FarmDto} from '../../../api/models/farm-dto';
import {FarmResourceService} from '../../../api/services/farm-resource.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-farm-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './farm-table.component.html',
})
export class FarmTableComponent implements OnInit {

  @Output() onEdit: EventEmitter<FarmDto> = new EventEmitter<FarmDto>();

  farms: FarmDto[] = [];
  currentPage = 1;
  pageSize = 5;
  totalElements = 0;
  sortBy = ['id,desc'];
  filter = '';

  pageNumbers: number[] = [];
  totalPages: number;

  constructor(
    private service: FarmResourceService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  fetchData(): void {
    this.service.paginateFarms({
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: this.sortBy,
      filter:this.filter
    }).subscribe({
      next: (data) => {
        this.farms = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.pageNumbers = new Array(data.totalPages).fill(0).map((x, i) => i + 1);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  onEditClick(farm: FarmDto) {
    this.onEdit.emit(farm);
  }
}
