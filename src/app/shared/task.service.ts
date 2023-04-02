/*
============================================
; Title: task.service.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/30/2023
; Description: task.service.ts
============================================
*/

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable
@Injectable({
  providedIn: 'root'
})

// Export class
export class TaskService {

  // Constructor
  constructor(private http: HttpClient) { }

  // Path to findAllTasks()
  findAllTasks(empId: number): Observable<any> {
    return this.http.get(`/api/employees/${empId}/tasks`)
  }

  // Path to createTask()
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post(`api/employees/${empId}/tasks`, {
      text: task
    })
  }
}
