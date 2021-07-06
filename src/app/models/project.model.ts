import {Task} from './task.model'
export class Project {
    _id: string;
    tasks: Task[];
    title: string;
    description: string;
    userId: string;
    created_by:string;
    created_at:any;

}