import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSlideToggleChange } from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
    id: number;
    description: string;
    assignedTo: string;
    done:boolean;
}

interface IPeople {
    name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'app-editTodo',
    templateUrl: 'editTodo.component.html',
    styleUrls: ['editTodo.component.css'],
})
export class EditTodoComponent {
    done:boolean;
    description: String;
    selectedPerson: String;
    public peoples: IPeople[] = [];
    constructor(public dialogRef: MatDialogRef<EditTodoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private httpClient: HttpClient) {
        this.loadPeople();
        this.done=data.done;
        this.description = data.description;
        this.selectedPerson = data.assignedTo;
    }

    async loadPeople() {
        this.peoples = await this.httpClient.get<IPeople[]>('http://localhost:8084/api/people').toPromise();
    }

    async editTodo() {
        if (this.description !== this.data.description || this.selectedPerson !== this.data.assignedTo) {
            if (this.selectedPerson != null) {
                if (this.description != null || this.description.length === 0) {
                    await this.httpClient.patch('http://localhost:8084/api/todos/'+this.data.id, {
                        'description': this.description,
                        'assignedTo': this.selectedPerson
                    }).toPromise();
                }
            }
        }
        this.dialogRef.close();
    }

    async changedDone(event: MatSlideToggleChange){
        await this.httpClient.patch('http://localhost:8084/api/todos/'+this.data.id, {
            'done': event.checked,
        }).toPromise();
        this.done = event.checked;
    }



    changeSelection(temp: String) {
        this.selectedPerson = temp;
    }



}