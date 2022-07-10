import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO, setDate } from 'date-fns';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  @Input() itemName;
  @Input() itemCategory;
  @Input() itemPriority;
  @Input() itemDueDate;

  categories = ['Trabajo', 'Personal', 'Casa'];
  taskName;
  taskDate;
  taskPriority;
  taskCategory;
  formattedString = '';

  taskObject;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.taskName = this.itemName;
    this.taskDate = this.itemDueDate;
    this.taskPriority = this.itemPriority;
    this.taskCategory = this.itemCategory;

    this.setDate();
  }

  dateChanged(value) {
    this.formattedString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }

  setDate() {

    if (this.taskDate != null) {
      this.formattedString = format(
        parseISO(this.taskDate),
        'HH:mm, MMM d, yyyy'
      );
    }
  }

  dismis() {
    this.modalCtrl.dismiss();
  }

  selectedCategory(index: number) {
    this.taskCategory = this.categories[index];
  }

  addTask() {
    this.taskObject = {
      itemName: this.taskName,
      itemDueDate: this.taskDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory,
    };

    this.modalCtrl.dismiss(this.taskObject);
  }
}
