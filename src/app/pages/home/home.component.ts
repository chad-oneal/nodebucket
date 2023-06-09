/*
============================================
; Title: home.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: for nodebucket
============================================
*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api/message';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


// Home component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  serverMessages: Message[] = [];
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;
  newTaskId: string;
  newTaskMessage: string;

  // Form group for the task form
  taskForm: FormGroup = this.fb.group({
    task: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35),
      ]),
    ],
  });

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    this.newTaskId = '';
    this.newTaskMessage = '';

    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log('--Employee Data--');
        console.log(this.employee);
      },
      error: (err) => {
        console.error(err.message);
        this.serverMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          },
        ];
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log('--ToDo and Done Data--');
        console.log(this.todo);
      },
    });
  }

  ngOnInit(): void {}

  // Create a new task
  createTask() {
    const newTask = this.taskForm.controls['task'].value;

    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.newTaskId = res.data.id;
        this.newTaskMessage = res.message;
        console.log('--New Task ID--');
        console.log(this.newTaskId);
      },
      error: (err) => {
        console.error(err.message);
        this.serverMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          },
        ];
      },
      complete: () => {
        let task = {
          _id: this.newTaskId,
          text: newTask,
        } as Item;
        this.todo.push(task);
        this.newTaskId = '';
        this.taskForm.controls['task'].setErrors({ incorrect: false });

        this.serverMessages = [
          {
            severity: 'success',
            summary: 'Success',
            detail: this.newTaskMessage,
          },
        ];
      },
    });
  }

  // delete task
  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Delete Task Dialog',
        body: 'Are you sure you want to delete this task?',
      },
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.todo = this.todo.filter(task => task._id !== taskId)
              this.done = this.done.filter(task => task._id !== taskId)
              this.serverMessages = [
                {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Task deleted successfully',
                }
              ]
            },
            error: (err) => {
              this.serverMessages = [
                {
                  severity: 'error',
                  summary: 'Error',
                  detail: err.message,
                },
              ]
            },
          })
        } else {
          this.serverMessages = [
            {
              severity: 'info',
              summary: 'Info',
              detail: 'Delete cancelled',
            }
          ]
        }
      }
    })
   }
   updateTaskList(empId: number, todo: Item[], done: Item[]) {
    this.taskService.updateTask(empId, todo, done).subscribe({
      next: () => {
        this.todo = todo;
        this.done = done;
      },
      error: (err) => {
        this.serverMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          },
        ]
      }
    })
   }

   drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Reordered tasks in the existing list');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Moved task item to a new container');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }
}