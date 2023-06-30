import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {FarmComponent} from './features/farm/farm.component';
import {PlantComponent} from './features/plant/plant.component';
import {SupplierComponent} from './features/supplier/supplier.component';
import {CustomerComponent} from './features/customer/customer.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {EmployeeComponent} from './features/employee/employee.component';
import {ProductionComponent} from './features/production/production.component';
import {SalaryComponent} from './features/salary/salary.component';
import {PurchaseOrdersComponent} from './features/purchase-orders/purchase-orders.component';
import {SalesOrdersComponent} from './features/sales-orders/sales-orders.component';
import {UsersComponent} from './features/users/users.component';
import {WeeklyReportsComponent} from './features/reports/weekly-reports/weekly-reports.component';
import {MonthlyReportsComponent} from './features/reports/monthly-reports/monthly-reports.component';
import {authGuard} from './security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '', 
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'farms',
        component: FarmComponent,
      },
      {
        path: 'plants',
        component: PlantComponent,
      },
      {
        path: 'suppliers',
        component: SupplierComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'employees',
        component: EmployeeComponent,
        canActivate: [authGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: 'plants-production',
        component: ProductionComponent,
      },
      {
        path: 'salary-payments',
        component: SalaryComponent,
      },
      {
        path: 'purchase-orders',
        component: PurchaseOrdersComponent,
      },
      {
        path: 'sales-orders',
        component: SalesOrdersComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'weekly-reports',
        component: WeeklyReportsComponent,
      },
      {
        path: 'monthly-reports',
        component: MonthlyReportsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
