import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TeacherComponent} from "./teacher/teacher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeacherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'teachers-info-web2';
}
