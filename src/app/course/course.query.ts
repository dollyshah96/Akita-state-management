import { Injectable } from '@angular/core';
import { CourseStore, CourseState, TodoState, TodoStore } from './course.store';
import { QueryEntity } from '@datorama/akita';


@Injectable({
    providedIn: 'root'
})
export class CourseQuery extends QueryEntity<CourseState> {

    selectAreCoursesLoaded$ = this.select(state => {
        console.log('state', state);

        return state.areCoursesLoaded;
    });

    constructor(protected store: CourseStore) {
        super(store);
    }
}

@Injectable({
    providedIn: 'root'
})

export class TodoQuery extends QueryEntity<TodoState> {

    selectedTodo$ = this.select(state => {
        console.log('state', state);

        return state;
    });

    constructor(protected store: TodoStore) {
        super(store);
    }
}