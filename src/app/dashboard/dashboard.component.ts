import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'app/models/project.model';
import { AuthService } from 'app/services/auth.service';
import { ProjectService } from 'app/services/project.service';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: Project[];
  projectSubscription: Subscription;

  constructor(private projectService: ProjectService,
              private router: Router) { }
  ngOnInit(){
    this.projectSubscription = this.projectService.projectSubject.subscribe(
      (projects: Project[]) =>{
        this.projects = projects;

      }
    );
    this.projectService.getStuff()
  }

  onSave(projects: Project[],){
    this.projectService.saveProject(projects)
  }

  onDelete(index){;
    console.log(index,  this.projects[index]._id );
    this.projectService.deleteProject(this.projects[index]._id).then(
      () => {
        this.projectService.emitProject()
      }
    );
  }


  ngOnDestroy(){
    this.projectSubscription.unsubscribe()
  }

  getClass(index, taskIndex){
    if(this.projects[index].tasks[taskIndex].isComplete ){
      return 'list-group-item list-group-item-success'
    } else{
      return 'list-group-item'
    }
  }

  onCompleteTask(index, taskIndex){
    this.projectService.completeTask(index, taskIndex) 

    
  }

  onProjectClicked(id:string){
    console.log(id)
    this.router.navigate(['/project/' + id]);
  }

}


