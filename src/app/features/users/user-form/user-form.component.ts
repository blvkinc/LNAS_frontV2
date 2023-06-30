import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserDto} from '../../../api/models/user-dto';
import {UserResourceService} from '../../../api/services/user-resource.service';
import {EmployeeDto} from '../../../api/models/employee-dto';
import {EmployeeResourceService} from '../../../api/services/employee-resource.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {

  @Input() type: 'CREATE' | 'UPDATE' | 'SEARCH' = 'SEARCH';
  @Input() inputValue: UserDto;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCreate: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  form: FormGroup;
  employeeList: EmployeeDto[];

  constructor(
    private formBuilder: FormBuilder,
    private service: UserResourceService,
    private employeeService: EmployeeResourceService,
  ) { }

  ngOnInit() {
    this.fetchData();
    this.initForm();
  }

  fetchData() {
    this.employeeService.paginateEmployees().subscribe({
      next: (res) => {
        this.employeeList = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      firstName: [this.inputValue?.firstName ?? null, [Validators.required]],
      lastName: [this.inputValue?.lastName ?? null, [Validators.required]],
      email: [this.inputValue?.email ?? null],
      phone: [this.inputValue?.phone ?? null],
      username: [this.inputValue?.username ?? null, [Validators.required]],
      password: [this.inputValue?.password ?? null, [Validators.required]],
      role: [this.inputValue?.role ?? null, [Validators.required]],
      employee: [this.inputValue?.employee ?? null, [Validators.required]],
    });
  }

  validateForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  resetForm() {
    this.form.reset();
    for (const i in this.form.controls) {
      this.form.controls[i].markAsUntouched();
    }
  }

  onCancel() {
    this.type = 'SEARCH';
    this.form.reset();
  }

  onSearchClear() {
    this.form.reset();
    this.onSearch.emit(null);
  }

  onSubmit() {
    console.log('submit');
    this.validateForm();
    if (!this.form.invalid) {
      const data = this.form.value;

      this.service.createUser({body: data}).subscribe({
        next: (res) => {
          console.log(res);
          this.onCreate.emit(this.form.value);
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        },
      });

    } else {
      console.log('invalid');
    }
  }

  onSearchClick() {
    const data = this.form.value;
    let filter = ``;

    if (data.status) {
      if (filter.length > 0) {
        filter += ` and `;
      }
      filter += `status : '${data.status}'`;
    }

    this.onSearch.emit(filter);
  }
}
