import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {
    nome: '',
    sobrenome: '',
    dataNascimento: new Date()
  };
  isEditing: boolean = false;
  userId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isEditing = true;
        this.getUserById(this.userId);
      }
    });
  }

  getUserById(userId: string) {
    this.http.get<User>(`http://localhost:5000/api/users/${userId}`)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      });
  }
  

  salvarUsuario() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    this.http.post<User>('http://localhost:5000/api/users', this.user)
      .subscribe({
        next: (data) => {
          console.log('Usuário criado com sucesso:', data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      });
  }
  

  updateUser() {
    if (this.userId) {
      this.http.put<User>(`http://localhost:5000/api/users/${this.userId}`, this.user)
        .subscribe({
          next: (data) => {
            console.log('Usuário atualizado com sucesso:', data);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
          }
        });
    }
  }
  

  cancelar() {
    this.router.navigate(['/']);
  }
}