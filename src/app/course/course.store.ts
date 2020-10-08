import { Injectable } from '@angular/core';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { Course } from './models/course.model';
import { Todo } from './models/todo.model';
export interface TodoState extends EntityState<Todo, string> {

}
export function createTodoInitialState(): TodoState {
    return {}
}
export interface CourseState extends EntityState<Course, string> {
    areCoursesLoaded: boolean;
}

export function createInitialState(): CourseState {
    return {
        areCoursesLoaded: false
    };
}
@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'courses' })
export class CourseStore extends EntityStore<CourseState> {

    constructor() {
        super(createInitialState());
    }

    loadCourses(courses: Course[], areCoursesLoaded: boolean) {
        this.set(courses);
        this.update(state => ({
            ...state,
            areCoursesLoaded
        }));
    }
}



@Injectable({
    providedIn: 'root'
})

@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState> {

    constructor() {
        super(createTodoInitialState());
    }

    loadTodo(todos: Todo[]) {
        console.log('todos store', todos);

        this.set(todos);
        this.update(state => ({
            ...state
        }));
    };
}
