import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { DatePipe } from '@angular/common';
import { ModifyTaskComponent } from './modify-task/modify-task.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';
import { DeleteTaskDialogComponent } from './dialogs/delete-task-dialog/delete-task-dialog.component';
import { DeleteProjectDialogComponent } from './dialogs/delete-project-dialog/delete-project-dialog.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SigninComponent,
    NewProjectComponent,
    SingleProjectComponent,
    ModifyProjectComponent,
    ModifyTaskComponent,
    SingleTaskComponent,
    NewTaskComponent,
    DeleteTaskDialogComponent,
    DeleteProjectDialogComponent,

  ],
  providers: [DatePipe,ProjectService, AuthService, AuthGuard,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
