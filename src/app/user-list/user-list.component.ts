import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [DatePipe] // Adicione aqui
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:5000/api/users')
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Erro ao buscar usuários:', error);
        }
      });
  }
  

  editarUsuario(userId: string) {
    this.router.navigate(['/user-form', userId]);
  }

  cadastrarNovoUsuario() {
    this.router.navigate(['/user-form']);
  }
}