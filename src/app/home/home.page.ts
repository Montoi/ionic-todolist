import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { NewTaskPage } from '../task/new-task/new-task.page';
import { Tasks } from '../task/new-task/tasks.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //here's the list
  todoList: any = [];

  today: number = Date.now();
  //importing all the controllers and services
  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) {
    //we use our service to initialice the store
    this.dataService.init();
  }

  //we fill the list when we inizialice
  ngOnInit(): void {
    this.loadData();
  }

  //here we fill the list with the data in the storage
  async loadData() {
    this.todoList = await this.dataService.getData();
  }

  //here we create the alert to ask if he really want to delete a task
  async onDeleteAlert(index) {
    this.alertCtrl
      .create({
        header: '¿Estás seguro?',
        message: '¿Realmente quieres borrar la tarea?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Borrar',
            handler: () => {
              this.delete(index);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  //here we create a modal and add a task using the services
  async addTask() {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });

    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data != null) {
      this.dataService.addData(data);

      console.log('Tarea agregada', data);
    } else {
      console.log('cancelado');
    }
  }
  //here we create a modal and show all data of a Task and then we edite it using the service
  async onEdit(index) {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: {
        itemName: this.todoList[index].itemName,
        itemPriority: this.todoList[index].itemPriority,
        itemCategory: this.todoList[index].itemCategory,
        itemDueDate: this.todoList[index].itemDueDate,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (index >= 0 && data != null) {
      //here we edit the task
      this.dataService.edit(index, data);
      console.log('Editado');
    } else {
      console.log('no hay indice');
    }
  }

  //Here's we delete a task from the storage
  delete(index) {
    this.dataService.removeItem(index);
    console.log('Elemento borrado');
  }

  //Here's the alert where we ask if it really finish the task
  onComplete(i) {
    this.alertCtrl
      .create({
        header: 'Felicidades!!!',
        message: '¿Realmente completaste la tarea?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Completar',
            handler: () => {
              this.delete(i);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  //Here we get the icon and subtitle colors
  geSubtitleColor(priority) {
    if (priority === 'High') {
      return 'red';
    } else if (priority === 'Low') {
      return 'green';
    } else {
      return 'orange';
    }
  }
}
