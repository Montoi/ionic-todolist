import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tasks } from './tasks/tasks.model';

const storage_key ='mylist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) { }



async init(){
  console.log('init')
  await this.storage.create()
  console.log('done')
}

async getData(){
  let task: any = [];
  await this.storage.forEach((key,value,index) => {
    task = key
    console.log('soy yo', key)
  })
  return task
}

async addData(item:Tasks){
  const storedData = await this.storage.get(storage_key) || [];
  storedData.push(item);
  return this.storage.set(storage_key, storedData)
}

async removeItem(index){
  const storedData = await this.storage.get(storage_key) || [];
  storedData.splice(index, 1);
  return this.storage.set(storage_key, storedData)
}




}
