import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NewTaskPage } from '../tasks/new-task/new-task.page';
import { Tasks } from '../tasks/tasks.model';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todoList: Tasks[];

  today: number = Date.now();
  constructor(
    public modalCtrl: ModalController,
    public taskService: TasksService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.todoList = this.taskService.GetAllTasks();
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
              this.todoList = this.taskService.GetAllTasks();
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
      this.taskService.AddTask(data);
      this.todoList = this.taskService.GetAllTasks();
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
      this.taskService.Edit(index, data);
      this.todoList = this.taskService.GetAllTasks();
      console.log('Editado');
    } else {
      console.log('no hay indice');
    }
  }

  delete(index) {
    this.taskService.Delete(index);
    console.log('Elemento borrado');
  }
}
