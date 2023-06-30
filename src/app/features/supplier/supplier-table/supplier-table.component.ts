import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupplierDto} from '../../../api/models/supplier-dto';
import {SupplierResourceService} from '../../../api/services/supplier-resource.service';

@Component({
  selector: 'app-supplier-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-table.component.html'
})
export class SupplierTableComponent implements OnInit {

  @Output() onEdit: EventEmitter<SupplierDto> = new EventEmitter<SupplierDto>();

  suppliers: SupplierDto[] = [];
  currentPage = 1;
  pageSize = 5;
  totalElements = 0;
  sortBy = ['id,desc'];
  filter = '';

  pageNumbers: number[] = [];
  totalPages: number;

  constructor(
    private service: SupplierResourceService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  onEditClick(plant: SupplierDto) {
    this.onEdit.emit(plant);
  }

  fetchData(): void {
    this.service.paginateSuppliers({
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: this.sortBy,
    }).subscribe({
      next: (data) => {
        this.suppliers = data.content;
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
