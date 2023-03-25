/*
============================================
; Title: main.ts for nodebucket
; Author: Professor Krasso
; Modified by: Chad Oneal
: Date: 03/25/2023
; Description: main.ts nodebucket
============================================
*/

// import statements
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// if statement
if (environment.production) {
  enableProdMode();
}

// bootstrap module
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
