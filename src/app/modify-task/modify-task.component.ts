import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { Task } from 'app/models/task.model';
import { ProjectService } from 'app/services/project.service';


@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit {
  public project: Project;
  task: Task;
  taskNumber:any;
  taskForm: FormGroup;
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

    this.taskForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: Project) => {
            this.project = project;
            this.taskNumber = params.taskId;
            this.task = this.project.tasks[this.taskNumber];
            this.taskForm.get('name').setValue(this.task.name);
            this.taskForm.get('description').setValue(this.task.description);
            this.loading = false;
          }
        );
      }
    );

  }

  onSubmit(){
    
    const task= new Task();
    task.name = this.taskForm.get('name').value;
    task.description = this.taskForm.get('description').value;
    task.created_at = this.task.created_at
    task.isComplete = this.task.isComplete;
    task.project_id = this.project._id;
    this.project.tasks[this.taskNumber] = task;
    this.projectService.modifyProject(this.project._id, this.project).then(
      ()=>{
        this.taskForm.reset();
 
        this.router.navigate(['/project/', this.project._id, this.taskNumber]);
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message;
       }
     );
  }

}
