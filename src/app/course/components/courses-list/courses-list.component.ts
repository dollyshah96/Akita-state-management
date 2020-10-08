import { CourseService } from './../../services/course.service';
import { tap, switchMap, filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseState } from '../../course.store';
import { CourseQuery, TodoQuery } from '../../course.query';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit, OnDestroy {

  courseToBeUpdated: Course;

  isUpdateActivated = false;

  listCoursesSub: Subscription;

  deleteCourseSub: Subscription;

  updateCourseSub: Subscription;

  cstate: CourseState;

  courses$: Observable<Course[]> = this.courseQuery.selectAll();
  // courses$: Observable<Course[]>;
  todo$: Observable<Todo[]> = this.todoQuery.selectAll();


  constructor(private courseService: CourseService, private todoService: TodoService, private courseQuery: CourseQuery, private todoQuery: TodoQuery) {
  }

  ngOnInit() {

    this.todo$.subscribe(res => {
      console.log('res todo', res);

    });


    // this.listCoursesSub = this.courseQuery.selectAreCoursesLoaded$.pipe(
    //   filter(areCoursesLoaded => !areCoursesLoaded),
    //   switchMap(areCoursesLoaded => {
    //     if (!areCoursesLoaded) {
    //       // this.courses$ = this.courseService.getAllCourses();
    //       // return this.courses$;
    //       return this.courseService.getAllCourses();
    //     }
    //   })
    // ).subscribe(result => { });

    this.todoQuery.selectedTodo$.subscribe(res => {
      if (Object.keys(res.entities).length === 0) {
        this.todoService.getAllTodos().subscribe();
      }
    });

  }

  deleteCourse(courseId: string) {
    this.deleteCourseSub = this.courseService.deleteCourse(courseId).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = { ...course };
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    this.updateCourseSub = this.courseService.updateCourse(
      this.courseToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)
      );
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  ngOnDestroy() {
    if (this.listCoursesSub) {
      this.listCoursesSub.unsubscribe();
    }

    if (this.deleteCourseSub) {
      this.deleteCourseSub.unsubscribe();
    }

    if (this.updateCourseSub) {
      this.updateCourseSub.unsubscribe();
    }
  }
}