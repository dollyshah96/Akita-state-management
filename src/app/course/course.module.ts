import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseService } from './services/course.service';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { TodoService } from './services/todo.service';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CourseService, TodoService],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }
