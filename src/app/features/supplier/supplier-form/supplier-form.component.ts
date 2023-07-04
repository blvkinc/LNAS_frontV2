import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierDto} from '../../../api/models/supplier-dto';
import {SupplierResourceService} from '../../../api/services/supplier-resource.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent implements OnInit {

  @Input() type: 'CREATE' | 'UPDATE' | 'SEARCH' = 'SEARCH';
  @Input() inputValue: SupplierDto;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCreate: EventEmitter<SupplierDto> = new EventEmitter<SupplierDto>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SupplierResourceService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      firstName: [this.inputValue?.firstName ?? null, [Validators.required]],
      lastName: [this.inputValue?.lastName ?? null, [Validators.required]],
      email: [this.inputValue?.email ?? null],
      phone: [this.inputValue?.phone ?? null],
      address: [this.inputValue?.address ?? null, [Validators.required]],
      status: [this.inputValue?.status ?? null, [Validators.required]],
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

      
     if(this.inputValue===null){
      this.service.createSupplier({body: data}).subscribe({
        next: (res) => {
          console.log(res);
          this.onCreate.emit(this.form.value);
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        },
      });
     }
     else{
      this.service.updateSupplier({body: data,id:this.inputValue.id}).subscribe({
        next: (res) => {
          console.log(res);
          this.onCreate.emit(this.form.value);
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        },
      });
     }

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
