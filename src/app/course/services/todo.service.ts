import { EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { TodoStore } from '../course.store';


@Injectable()
export class TodoService {

    http: HttpClient;

    store: TodoStore;

    constructor(http: HttpClient, store: TodoStore) {
        this.http = http;
        this.store = store;
    }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('https://reqres.in/api/users?page=2').pipe(
            tap(todo => {
                this.store.loadTodo(todo['data']);
            })
        );
    }

    // createCourse(course: Todo): Observable<Todo> {
    //     return this.http.post<Todo>('https://jsonplaceholder.typicode.com/posts', course).pipe(
    //         tap(value => {
    //             this.store.add([value]);
    //         })
    //     );
    // }

    // deleteCourse(courseId: string): Observable<any> {
    //     return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + courseId).pipe(
    //         tap(result => {
    //             this.store.remove(courseId);
    //         })
    //     );
    // }

    // updateCourse(courseId: string, course: Todo): Observable<any> {
    //     return this.http.put('https://jsonplaceholder.typicode.com/posts/' + courseId, course).pipe(
    //         tap(result => {
    //             this.store.update(courseId, course);
    //         })
    //     );
    // }
}