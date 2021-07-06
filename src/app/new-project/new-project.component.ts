import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { AuthService } from 'app/services/auth.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  public projectForm: FormGroup;
  public part: number;
  public userId: string;
  public userName: any;
  public errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(){
    this.projectForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.userId = this.authService.userId;
    this.userName = this.authService.userName
  }

  onSubmit(){
    
    const project= new Project();
    project.title = this.projectForm.get('title').value;
    project.description = this.projectForm.get('description').value;
    project.tasks = [];
    project._id = new Date().getTime().toString();
    project.userId = this.userId;
    project.created_at = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    project.created_by = this.userName.firstName + " " + this.userName.lastName
    this.projectService.createNewProject(project).then(
     ()=>{
       this.projectForm.reset()
       this.router.navigate(['/dashboard'])
      
     }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    );
    
  }

}
