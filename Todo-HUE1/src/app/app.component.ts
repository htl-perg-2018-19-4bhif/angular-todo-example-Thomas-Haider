import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatDialog, MatSlideToggleChange } from '@angular/material';
import { CreateTodoComponent } from './createTodo/createTodo.component';
import { EditTodoComponent } from './editTodo/editTodo.component';


interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean;
}

interface IPeople {
  name: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: ITodoItem[] = [];
  sortedtodos: ITodoItem[] = [];
  public peoples: IPeople[] = [];
  dataSource = new MatTableDataSource();


  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.loadPeople();
  }

  displayedColumns: string[] = ['id', 'description', 'assignedTo', 'status', 'edit', 'delete'];
  async loadTodos() {
    this.todos = await this.httpClient.get<ITodoItem[]>('http://localhost:8084/api/todos').toPromise();
    this.dataSource.data = this.todos;
  }

  async loadPeople() {
    this.peoples = await this.httpClient.get<IPeople[]>('http://localhost:8084/api/people').toPromise();
    this.peoples.push({ name: '' });
  }

  async deleteIT(id: number) {
    for (let i of this.todos) {
      if (id === i.id) {
        await this.httpClient.delete('http://localhost:8084/api/todos/' + i.id).toPromise();
      }
    }
    this.loadTodos();
  }


  editIT(id: number) {
    for (let i of this.todos) {
      if (id === i.id) {
        const dialogRef = this.dialog.open(EditTodoComponent, {
          width: '1000px',
          height: '500px',
          data: { id: i.id, description: i.description, assignedTo: i.assignedTo, done: i.done }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.loadTodos();

        });
      }
    }

  }

  changeSelection(temp: String) {
    console.log(temp.length);
    this.sortedtodos = [];
    if (temp != null) {
      if (temp.length !== 0) {
        for (let i of this.todos) {
          if (i.assignedTo === temp) {
            this.sortedtodos.push(i);
          }
        }
        this.dataSource.data = this.sortedtodos;
      } else {
        if (temp.length === 0) {
          this.loadTodos();
        }
      }
    }

  }


  async changedSort(event: MatSlideToggleChange) {
    this.sortedtodos = [];
    if (event.checked === true) {
      for (let i of this.todos) {
        if (i.done == null) {
          this.sortedtodos.push(i);
        }
        if(i.done===false){
          this.sortedtodos.push(i);
        }
      }
      console.log(this.sortedtodos);
      this.dataSource.data = this.sortedtodos;
    } else {
      this.loadTodos();
    }
  }


  async addTodo() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '1000px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTodos();
    });
  }


}
