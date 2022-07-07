import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tasks } from './tasks/tasks.model';

const storage_key ='mylist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {

   }

  tasks = []

async init(){
  console.log('init')
  await this.storage.create()
  console.log('done')
}

  async getData(){
  await this.storage.forEach((key,value,index) => {
    this.tasks = key

  });
  return this.tasks
}

 addData(item:Tasks){
  //const storedData = await this.storage.get(storage_key) || [];
  this.tasks.push(item);
  return  this.storage.set(storage_key, this.tasks)
}

async removeItem(index){
 // const storedData = await this.storage.get(storage_key) || [];
  this.tasks.splice(index, 1);
  return this.storage.set(storage_key, this.tasks)
}

async Edit(index:number,item:Tasks){
  let nTask = this.tasks[index];
  nTask.itemName = item.itemName
  nTask.itemDueDate = item.itemDueDate
  nTask.itemPriority = item.itemPriority
  nTask.itemCategory = item.itemCategory
  return this.storage.set(storage_key, this.tasks)
}




}
