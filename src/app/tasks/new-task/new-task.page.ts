import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  categories = ['Trabajo', 'Personal', 'Casa'];
  taskName: string = '';
  taskDate;
  taskPriority;
  taskCategory;

  taskObject;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismis() {
    this.modalCtrl.dismiss();
  }

  selectedCategory(index: number) {
    this.taskCategory = this.categories[index];
  }

  addTask() {
    this.taskObject = ({
      itemName: this.taskName,
      itemDueDate: this.taskDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory,

    });

    this.modalCtrl.dismiss(this.taskObject)
  }
}
