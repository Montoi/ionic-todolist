import { Injectable } from '@angular/core';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks:Tasks[] = [
    {
      itemName: 'Coding',
      itemDueDate: '12-10-21',
      itemPriority:'High',
      itemCategory:'Work'
    },
    {
      itemName: 'Cooking',
      itemDueDate: '12-10-21',
      itemPriority:'Middle',
      itemCategory:'Hause'
    },
    {
      itemName: 'Wash',
      itemDueDate: '12-10-21',
      itemPriority:'Low',
      itemCategory:'Personal'
    },

  ]

  constructor() { }

  GetAllTasks(){
    return [...this._tasks]
  }
  AddTask(task:Tasks){
    this._tasks.push(task)
  }
  Delete(index){
    this._tasks.splice(index,1)
  }
  Edit(index:number,task:Tasks){
    let nTask = this._tasks[index];
    nTask.itemName = task.itemName
    nTask.itemDueDate = task.itemDueDate
    nTask.itemPriority = task.itemPriority
    nTask.itemCategory = task.itemCategory
  }
}
