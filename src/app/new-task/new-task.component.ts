import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { Task } from 'app/models/task.model';
import { AuthService } from 'app/services/auth.service';
import { ProjectService } from 'app/services/project.service';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA} from "@angular/material/dialog";



@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  public project: Project;
  taskForm: FormGroup;
  errorMessage: string;
  date: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectId: any,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewTaskComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit(){
    const task= new Task();
    task.name = this.taskForm.get('name').value;
    task.description = this.taskForm.get('description').value;
    task.created_at = {time:this.datePipe.transform(new Date(),'H:mm'), date:this.datePipe.transform(new Date(), 'dd/MM/yyyy') };
    task.isComplete = false;
    task.project_id = this.projectId;
    this.close(task)
   /* this.project.tasks.push(task);
    this.projectService.modifyProject(this.project._id, this.project).then(
      ()=>{
        this.taskForm.reset();
       
 
       // this.router.navigate(['/project/' + this.project._id]);
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message;
       }
     );*/
  }

  close(newTask) {
    console.log(newTask)
    this.dialogRef.close(newTask);
  }

}
