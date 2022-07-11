import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tasks } from './task/new-task/tasks.model';

const storageKey = 'mylist';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasks = [];
  constructor(private storage: Storage) {}

  //here we initialize the storage
  async init() {
    await this.storage.create();
  }
  //getting data from the storage
  async getData() {
    await this.storage.forEach((key, value, index) => {
      this.tasks = key;
    });
    return this.tasks;
  }

  //adding data to the storage
  addData(item: Tasks) {
    this.tasks.push(item);
    return this.storage.set(storageKey, this.tasks);
  }

  //removing data from the storage
  async removeItem(index) {
    this.tasks.splice(index, 1);
    return this.storage.set(storageKey, this.tasks);
  }

  //editing data from the storage
  async edit(index: number, item: Tasks) {
    const nTask = this.tasks[index];
    nTask.itemName = item.itemName;
    nTask.itemDueDate = item.itemDueDate;
    nTask.itemPriority = item.itemPriority;
    nTask.itemCategory = item.itemCategory;
    return this.storage.set(storageKey, this.tasks);
  }
}
