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
  todoList = [];

  today: number = Date.now();
  constructor(
    public modalCtrl: ModalController,
    public taskService: TasksService,
    private alertCtrl: AlertController,
    private dataService:DataService

  ) {
    this.dataService.init();
    this.loadData();
  }

  ngOnInit(): void {

  }

  async loadData(){

  this.todoList = await this.dataService.getData();


  }

  onDeleteAlert(index) {
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
              this.loadData();
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

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data != null) {
      this.dataService.addData(data)
      await this.loadData();
      console.log('Tarea agregada', data);
    } else {
      console.log('cancelado');
    }

    await this.loadData();
  }

  async onEdit(index) {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (index >= 0 && data != null) {
      this.taskService.Edit(index, data);
      this.todoList = this.taskService.GetAllTasks();
      console.log('Editado');
    } else {
      console.log('no hay indice');
    }
  }

   delete(index) {
    this.dataService.removeItem(index);
    this.loadData();
    console.log('Elemento borrado');
  }
}
