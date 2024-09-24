import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEditing = true;
      this.getUserById(this.userId);
    }
  }

  getUserById(userId: string) {
    this.http.get<User>(`http://localhost:5000/api/users/${userId}`)
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      });
  }

  salvarUsuario() {
    if (this.isEditing) {
      this.http.put(`http://localhost:5000/api/users/${this.userId}`, this.user)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
          }
        });
    } else {
      this.http.post('http://localhost:5000/api/users', this.user)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao criar usuário:', error);
          }
        });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}