import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CreateTodoComponent } from './createTodo/createTodo.component';
import { MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EditTodoComponent } from './editTodo/editTodo.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule
  ],
  providers: [],
  entryComponents: [
    CreateTodoComponent,
    EditTodoComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
