import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { NewTaskPage } from '../tasks/new-task/new-task.page';
import { Tasks } from '../tasks/tasks.model';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todoList:any = [];

  today: number = Date.now();
  constructor(
    public modalCtrl: ModalController,
    public taskService: TasksService,
    private alertCtrl: AlertController,
    private dataService:DataService

  ) {
    this.dataService.init();

  }

  ngOnInit(): void {
    this.loadData();
  }

   async loadData(){

    this.todoList = await this.dataService.getData()
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
      this.dataService.addData(data)

      console.log('Tarea agregada', data);
    } else {
      console.log('cancelado');
    }


  }

  async onEdit(index) {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (index >= 0 && data != null) {
      this.dataService.Edit(index, data);
      console.log('Editado');
    } else {
      console.log('no hay indice');
    }
  }

   delete(index) {
    this.dataService.removeItem(index);
    console.log('Elemento borrado');
  }
}
