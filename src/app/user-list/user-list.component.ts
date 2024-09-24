import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [DatePipe] 
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

  excluirUsuario(userId: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.http.delete(`http://localhost:5000/api/users/${userId}`)
        .subscribe({
          next: () => {
            // Atualiza a lista de usuários após a exclusão
            // Remova o usuário da lista 'users' localmente
            this.users = this.users.filter(user => user._id !== userId);
          },
          error: (error) => {
            console.error('Erro ao excluir usuário:', error);
          }
        });
    }
  }
}