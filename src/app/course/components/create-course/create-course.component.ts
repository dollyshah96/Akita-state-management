import { Subscription } from 'rxjs';
import { CourseService } from './../../services/course.service';

import { Component, OnInit } from '@angular/core';
// import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { CourseStore } from '../../course.store';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  createCourseSub: Subscription;

  constructor(private store: CourseStore, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const course: Course = { id: '1', name: submittedForm.value.name, description: submittedForm.value.description };
    this.createCourseSub = this.courseService.createCourse(course).subscribe(result => {
      console.log('res', result);

      this.router.navigateByUrl('/courses');
    });
  }
}