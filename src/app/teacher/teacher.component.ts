import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TeacherService, Teacher } from '../teacher.service';
import { TeacherOperationComponent } from '../teacher-operation/teacher-operation.component';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TeacherOperationComponent, NotificationComponent],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  selectedTeacher: Teacher | null = null;
  paginatedTeachers: Teacher[] = [];
  display = 'none';

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private teacherService: TeacherService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
      this.totalPages = Math.ceil(this.teachers.length / this.pageSize);
      this.updatePaginatedTeachers();
    });
  }

  updatePaginatedTeachers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTeachers = this.teachers.slice(startIndex, endIndex);
  }

  openModal(teacher?: Teacher): void {
    this.selectedTeacher = teacher || null;
    this.display = 'block';
  }

  closeModal(): void {
    this.selectedTeacher = null;
    this.display = 'none';
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.loadTeachers();
      this.notificationService.showNotification('Teacher deleted successfully');
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedTeachers();
  }
}
