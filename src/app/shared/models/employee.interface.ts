/*
============================================
; Title: employee.interface.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/20232
; Description: employee.interface.ts
============================================
*/

// export interface
import {Item } from './item.interface';

export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];

}
