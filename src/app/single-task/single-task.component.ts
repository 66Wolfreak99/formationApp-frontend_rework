import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteTaskDialogComponent } from 'app/dialogs/delete-task-dialog/delete-task-dialog.component';
import { Project } from 'app/models/project.model';
import { Task } from 'app/models/task.model';
import { ProjectService } from 'app/services/project.service';



@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  public project: Project;
  task: Task;
  taskNumber:any;
  loading = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private matDialog: MatDialog,
    
  ) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: Project) => {
            this.project = project;
            this.taskNumber = params.taskId;
            this.task = this.project.tasks[this.taskNumber];
            this.loading = false;
            console.log("lmao",  this.project.tasks.length)
          }
        );
      }
    );
    
  }

  onModifyTask(id:string){
    this.router.navigate(['/project/edit/', this.project._id, id])
  }

  onBack(){
    this.router.navigate(['/project/' + this.project._id]);
  }

  onPreviousTask(){
    const prevTaskNumber = this.taskNumber --- 1;
    this.router.navigate(['/project/', this.project._id, prevTaskNumber])
  }

  onNextTask(){
    const nextTaskNumber = this.taskNumber +++ 1;
    this.router.navigate(['/project/', this.project._id, nextTaskNumber])
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
 
        this.router.navigate(['/project/' + this.project._id]);
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message;
       }
     );

  }

  onCompleteTask(){
    if(this.task.isComplete === true){
      this.task.isComplete = false
    }else if(this.task.isComplete === false) {
      this.task.isComplete = true
    }
    this.project.tasks[this.taskNumber] = this.task;
    this.projectService.modifyProject(this.project._id, this.project).then(
      ()=>{
       
      }
     ).catch(
       (error) => {
         this.errorMessage = error.message; 
       }
     );
  }

  deleteTaskDialog(task:Task){
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(DeleteTaskDialogComponent, { 
      height: '220px',
      width: '310px',});
      dialogRef.afterClosed().subscribe(deleteConfirm => {
        if(deleteConfirm){
          this.onDeleteTask(task)
        }
      });

  }

}
