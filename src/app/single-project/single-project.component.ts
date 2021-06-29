import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { Task } from 'app/models/task.model';
import { AuthService } from 'app/services/auth.service';
import { ProjectService } from 'app/services/project.service';


@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  public project: Project;
  taskForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: Project) => {
            this.project = project
          }
        )
      } 
    )

    this.initForm();
  }

  initForm(){
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit(){
    const name = this.taskForm.get('name').value;
    const task= new Task(name);
    task.isComplete = false
    this.project.tasks.push(task);
    this.projectService.modifyProject(this.project._id, this.project).then(
      ()=>{
        this.taskForm.reset();
 
        this.router.navigate(['/project/' + this.project._id]);
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message;
       }
     );
  }

  onDelete(index){;
    this.projectService.deleteProject(this.project._id).then(
      () => {
        this.router.navigate(['/dashboard'])
      }
    );
  }

  onDeleteTask(task: Task){
    console.log("yollo", task);
    const taskIndexToRemove = this.project.tasks.findIndex(
      (taskEl) => {
        if(taskEl === task){
          return true
        }
      }
    );
    this.project.tasks.splice(taskIndexToRemove, 1);
    this.projectService.modifyProject(this.project._id, this.project).then(
      ()=>{
        this.taskForm.reset();
 
        this.router.navigate(['/project/' + this.project._id]);
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message;
       }
     );

  }

  onModify(){
    this.router.navigate(['/project/edit/' + this.project._id])
  }

}
