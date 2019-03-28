import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

interface IPeople {
    name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'app-createTodo',
    templateUrl: 'createTodo.component.html',
    styleUrls: ['createTodo.component.css'],
})
export class CreateTodoComponent {
    description: String;
    selectedPerson: String;
    public peoples: IPeople[] = [];
    constructor(public dialogRef: MatDialogRef<CreateTodoComponent>, private httpClient: HttpClient) {
        this.loadPeople();
        console.log(this.loadPeople.length)
    }

    async loadPeople() {
        this.peoples = await this.httpClient.get<IPeople[]>('http://localhost:8084/api/people').toPromise();
    }

    async addTodo() {
        console.log(this.description);
        if (this.selectedPerson != null) {
            if (this.description != null || this.description.length === 0) {
                await this.httpClient.post('http://localhost:8084/api/todos', {
                    'description': this.description,
                    'assignedTo': this.selectedPerson
                }).toPromise();
                this.loadPeople();
            }
        }
        this.dialogRef.close();
    }



    changeSelection(temp: String) {
        this.selectedPerson = temp;
    }



}