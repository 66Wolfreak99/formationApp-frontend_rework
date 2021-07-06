import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { Task } from 'app/models/task.model';
import { AuthService } from 'app/services/auth.service';
import { ProjectService } from 'app/services/project.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewTaskComponent } from 'app/new-task/new-task.component';
import { DeleteTaskDialogComponent } from 'app/dialogs/delete-task-dialog/delete-task-dialog.component';
import { DeleteProjectDialogComponent } from 'app/dialogs/delete-project-dialog/delete-project-dialog.component';


@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  public project: Project;
  taskForm: FormGroup;
  errorMessage: string;
  date: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialog: MatDialog
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
    task.project_id = this.project._id;
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
  onSubmitAlt(newTask){
    const task = newTask;
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

  onDelete(){;
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

  onViewTask(id:string){
    this.router.navigate(['/project/', this.project._id, id])
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { projectId: this.project._id};
    let dialogRef = this.matDialog.open(NewTaskComponent, { 
      height: '400px',
      width: '600px',});
      dialogRef.afterClosed().subscribe(task => {
        this.onSubmitAlt(task)
      });
    
    
  }

  deleteTaskDialog(task:Task){
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(DeleteTaskDialogComponent, { 
      height: '220px',
      width: '370px',});
      dialogRef.afterClosed().subscribe(deleteConfirm => {
        if(deleteConfirm){
          this.onDeleteTask(task)
        }
      });

  }

  deleteProjectDialog(){
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(DeleteProjectDialogComponent, { 
      height: '220px',
      width: '370px',});
      dialogRef.afterClosed().subscribe(deleteConfirm => {
        if(deleteConfirm){
          this.onDelete()
        }
      });

  }

 

}
