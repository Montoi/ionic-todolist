import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO, setDate } from 'date-fns';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  //importing the data from outside of the page to handle it here
  @Input() itemName;
  @Input() itemCategory;
  @Input() itemPriority;
  @Input() itemDueDate;

  //array of categorys of the task
  categories = ['Trabajo', 'Personal', 'Casa'];
  taskName;
  taskDate;
  taskPriority;
  taskCategory;
  formattedString = '';

  taskObject;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    //filling our atributes with the data that i am receiving from outside
    this.taskName = this.itemName;
    this.taskDate = this.itemDueDate;
    this.taskPriority = this.itemPriority;
    this.taskCategory = this.itemCategory;

    this.setDate();
  }
  //formating the date we receive, in a better visual way
  dateChanged(value) {
    this.formattedString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }

  //formating the date we receive from outside
  setDate() {
    if (this.taskDate != null) {
      this.formattedString = format(
        parseISO(this.taskDate),
        'HH:mm, MMM d, yyyy'
      );
    }
  }

  //closing the modal
  dismis() {
    this.modalCtrl.dismiss();
  }

  //here we select the category from the array
  selectedCategory(index: number) {
    this.taskCategory = this.categories[index];
  }

  //Here we get all the data from the form and get and object, we send that object to handle it outside
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
