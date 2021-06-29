import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SigninComponent,
    NewProjectComponent,
    SingleProjectComponent,
    ModifyProjectComponent,

  ],
  providers: [ProjectService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
