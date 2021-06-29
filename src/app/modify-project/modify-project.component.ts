import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.css']
})
export class ModifyProjectComponent implements OnInit {

  project: Project
  projectForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(){

    this.projectForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.route.params.subscribe(
      (params) => {
        this.projectService.getProjectById(params.id).then(
          (project: Project) => {
            this.project = project;
            this.projectForm.get('title').setValue(this.project.title);
            this.projectForm.get('description').setValue(this.project.description);
            this.loading = false;
          }
        );
      }
    );

  }

  onSubmit(){
    
    const project= new Project();
    project.title = this.projectForm.get('title').value;
    project.description = this.projectForm.get('description').value;
    project.tasks = this.project.tasks;
    this.projectService.modifyProject(this.project._id, project).then(
     ()=>{
       this.projectForm.reset();

       this.router.navigate(['/project/' + this.project._id]);
      
     }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    );
    
  }

}
