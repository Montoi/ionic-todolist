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
  todoList: any = [];

  today: number = Date.now();
  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dataService: DataService

  ) {
    this.dataService.init();

  }

  ngOnInit(): void {
    this.loadData();
  }

   async loadData(){

    this.todoList = await this.dataService.getData();
  }

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

  async onEdit(index) {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: {
        itemName: this.todoList[index].itemName,
        itemPriority: this.todoList[index].itemPriority,
        itemCategory: this.todoList[index].itemCategory,
        itemDueDate: this.todoList[index].itemDueDate


      }

    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (index >= 0 && data != null) {
      this.dataService.edit(index, data);
      console.log('Editado');
    } else {
      console.log('no hay indice');
    }
  }

   delete(index) {
    this.dataService.removeItem(index);
    console.log('Elemento borrado');
  }
  onComplete(i){
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
}
