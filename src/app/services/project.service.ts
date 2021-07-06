import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from 'app/models/task.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, ) { }
  projects: Project[] /*= [
     {
     title: "Test",
      description: "It's a test",
      tasks: [
        {name:"this is a task", isComplete: false},
        {name:"this is a task", isComplete: true},
        {name:"this is a task", isComplete: false},
      ],
    },
    {
      title: "Test 2",
      description: "This is also a test",
      tasks: [
        {name:"this is a task", isComplete: false},
        {name:"this also is a task", isComplete: false},
        {name:"this is a task", isComplete: false},
        {name:"this is a task", isComplete: false},
        {name:"a task this is", isComplete: false},
        
      ],
    },
    {
      title: "Hey you",
      description: "Get out of my swamp",
      tasks: [
        {name:"Cut the onio", isComplete: false},
        {name:"mmm delicious onio", isComplete: false},
        {name:"this is a big onio", isComplete: false},
        {name:"take out the trash", isComplete: false}, 
      ],
    }
  ];*/
  projectSubject = new Subject<Project[]>();
  emitProject(){
    this.projectSubject.next(this.projects)
  }

  createNewProject(newProject: Project){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/posts', newProject).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error)
        }
      )
    })

  }

  deleteProject(id: string){
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

 

  taskClass(index, taskIndex){
    if(this.projects[index].tasks[taskIndex].isComplete ){
      return 'list-group-item list-group-item-success'
    } else{
      return 'list-group-item'
    }
  }

  completeTask(index, taskIndex){
    let isTaskComplete = this.projects[index].tasks[taskIndex].isComplete ;
    console.log("hello", isTaskComplete)
    if(isTaskComplete === false ){
      isTaskComplete = true;
      this.emitProject()
      console.log(isTaskComplete)
    } else if(isTaskComplete === true){
      isTaskComplete = false;
      this.emitProject()
      console.log(isTaskComplete)
    }
    this.saveProject(this.projects)
    
  }

  saveProject(project:Project[]){
    return new Promise((resolve, reject)=>{
      console.log("Yooo  "+project);
      this.http.put(
        'http://localhost:3000/api/posts/',
        {project: project}
      ).subscribe(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  getStuff() {
    this.http.get('http://localhost:3000/api/posts/').subscribe(
      (projects: Project[]) => {
        if (projects) {
          this.projects = projects;
          this.emitProject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProjectById(id:string){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/posts/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

  }


  modifyProject(id: string, project: Project){
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/posts/' + id, project).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  modifyTask(id: string, task: Task){
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/posts/' + id, task).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

}
