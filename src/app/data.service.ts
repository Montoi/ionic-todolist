import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tasks } from './task/new-task/tasks.model';

const storageKey ='mylist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks = [];
  constructor(private storage: Storage) {

   }



async init(){
  console.log('init');
  await this.storage.create();
  console.log('done');
}

  async getData(){
  await this.storage.forEach((key,value,index) => {
    this.tasks = key;

  });
  return this.tasks;
}

 addData(item: Tasks){
  //const storedData = await this.storage.get(storage_key) || [];
  this.tasks.push(item);
  return  this.storage.set(storageKey, this.tasks);
}

async removeItem(index){
 // const storedData = await this.storage.get(storage_key) || [];
  this.tasks.splice(index, 1);
  return this.storage.set(storageKey, this.tasks);
}

async edit(index: number,item: Tasks){
  const nTask = this.tasks[index];
  nTask.itemName = item.itemName;
  nTask.itemDueDate = item.itemDueDate;
  nTask.itemPriority = item.itemPriority;
  nTask.itemCategory = item.itemCategory;
  return this.storage.set(storageKey, this.tasks);
}




}
