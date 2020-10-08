import { EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CourseStore } from '../course.store';
import { Course } from '../models/course.model';


@Injectable()
export class CourseService {

    http: HttpClient;

    store: CourseStore;

    constructor(http: HttpClient, store: CourseStore) {
        this.http = http;
        this.store = store;
    }

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('https://jsonplaceholder.typicode.com/posts').pipe(
            tap(courses => {
                this.store.loadCourses(courses, true);
            })
        );
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>('https://jsonplaceholder.typicode.com/posts', course).pipe(
            tap(value => {
                console.log('value', value);

                this.store.add([value]);
            })
        );
    }

    deleteCourse(courseId: string): Observable<any> {
        return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + courseId).pipe(
            tap(result => {
                this.store.remove(courseId);
            })
        );
    }

    updateCourse(courseId: string, course: Course): Observable<any> {
        return this.http.put('https://jsonplaceholder.typicode.com/posts/' + courseId, course).pipe(
            tap(result => {
                this.store.update(courseId, course);
            })
        );
    }
}