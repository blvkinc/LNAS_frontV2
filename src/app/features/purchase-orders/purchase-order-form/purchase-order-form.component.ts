import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PurchaseDto} from '../../../api/models/purchase-dto';
import {PurchaseResourceService} from '../../../api/services/purchase-resource.service';
import {PlantDto} from '../../../api/models/plant-dto';
import {PlantResourceService} from '../../../api/services/plant-resource.service';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order-form.component.html',
})
export class PurchaseOrderFormComponent implements OnInit {

  @Input() type: 'CREATE' | 'UPDATE' | 'SEARCH' = 'SEARCH';
  @Input() inputValue: PurchaseDto;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCreate: EventEmitter<PurchaseDto> = new EventEmitter<PurchaseDto>();

  form: FormGroup;
  plantList: PlantDto[];

  constructor(
    private formBuilder: FormBuilder,
    private service: PurchaseResourceService,
    private plantService: PlantResourceService,
  ) { }

  ngOnInit() {
    this.fetchData();
    this.initForm();
  }

  fetchData() {
    this.plantService.paginatePlants().subscribe({
      next: (res) => {
        this.plantList = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      invoiceNo: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      status: [this.inputValue?.status ?? null, [Validators.required]],
      type: [this.inputValue?.type ?? null, [Validators.maxLength(255)]],
      subTotal: [this.inputValue?.subTotal ?? null, [Validators.required]],
      discount: [this.inputValue?.discount ?? null, []],
      tax: [this.inputValue?.tax ?? null, []],
      shipping: [this.inputValue?.shipping ?? null, []],
      total: [this.inputValue?.total ?? null, [Validators.required]],
      items: this.formBuilder.array([]),
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  initItemForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      plant: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      discount: [null, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      qty: [null, [Validators.required]],
      description: [null, []],
    });
  }

  addItem(): void {
    const itemsFormArray = this.form.get('items') as FormArray;
    itemsFormArray.push(this.initItemForm());
  }

  removeItem(index: number): void {
    const itemsFormArray = this.form.get('items') as FormArray;
    itemsFormArray.removeAt(index);
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

      
     if(!this.inputValue){
      this.service.createPurchase({body: data}).subscribe({
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
      this.service.updatePurchase({body: data,id:this.inputValue.id}).subscribe({
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

    if (data.id) {
      filter += `invoiceNo :'%${data.id}%'`;
    }

    if (data.type) {
      filter += `type ~~'%${data.type}%'`;
    }

    if (data.status) {
      if (filter.length > 0) {
        filter += ` and `;
      }
      filter += `status : '${data.status}'`;
    }

    this.onSearch.emit(filter);
  }
}
