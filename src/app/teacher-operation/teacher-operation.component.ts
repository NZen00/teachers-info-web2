import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Teacher, TeacherService } from '../teacher.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-teacher-operation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-operation.component.html',
  styleUrls: ['./teacher-operation.component.css']
})
export class TeacherOperationComponent implements OnChanges {
  @Input() teacher: Teacher | null = null;
  @Input() display = 'none';
  @Output() refresh = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  teacherForm: FormGroup;

  constructor(private fb: FormBuilder, private teacherService: TeacherService, private notificationService: NotificationService) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(20), Validators.max(70)]],
      subject: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacher'] && this.teacher) {
      this.teacherForm.patchValue(this.teacher);
    } else {
      this.teacherForm.reset();
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value as Teacher;
      if (this.teacher) {
        this.teacherService.updateTeacher(this.teacher.id, teacherData).subscribe(() => {
          this.refresh.emit();
          this.close();
          this.notificationService.showNotification('Teacher updated successfully');
        });
      } else {
        this.teacherService.addTeacher(teacherData).subscribe(() => {
          this.refresh.emit();
          this.close();
          this.notificationService.showNotification('Teacher added successfully');
        });
      }
    }
  }

  close(): void {
    this.teacherForm.reset();
    this.closeModal.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.teacherForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
