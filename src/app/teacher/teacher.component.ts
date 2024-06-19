import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TeacherService, Teacher } from '../teacher.service';
import { TeacherOperationComponent } from '../teacher-operation/teacher-operation.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TeacherOperationComponent],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  selectedTeacher: Teacher | null = null;
  display = 'none';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  openModal(teacher?: Teacher): void {
    this.selectedTeacher = teacher || null;
    this.display = 'block';
  }

  closeModal(): void {
    this.display = 'none';
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.loadTeachers();
    });
  }
}
