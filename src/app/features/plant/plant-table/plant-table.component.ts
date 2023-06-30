import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlantDto} from '../../../api/models/plant-dto';
import {PlantResourceService} from '../../../api/services/plant-resource.service';

@Component({
  selector: 'app-plant-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-table.component.html',
})
export class PlantTableComponent implements OnInit {

  @Output() onEdit: EventEmitter<PlantDto> = new EventEmitter<PlantDto>();

  plants: PlantDto[] = [];
  currentPage = 1;
  pageSize = 5;
  totalElements = 0;
  sortBy = ['id,desc'];
  filter = '';

  pageNumbers: number[] = [];
  totalPages: number;

  constructor(
    private service: PlantResourceService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  onEditClick(plant: PlantDto) {
    this.onEdit.emit(plant);
  }

  fetchData(): void {
    this.service.paginatePlants({
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: this.sortBy,
    }).subscribe({
      next: (data) => {
        this.plants = data.content;
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
