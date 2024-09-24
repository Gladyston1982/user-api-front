import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model'; // Importe o modelo de usuário

@Component({
  selector: 'app-root', // Altere o seletor para 'app-root'
  templateUrl: './app.component.html', // Crie o arquivo app.component.html
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = []; // Defina o tipo do array como User[]
  title = 'user-portal2'; // Defina a propriedade title

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:5000/api/users') // Defina o tipo de retorno como User[]
      .subscribe({
        next: (data: User[]) => { // Defina o tipo de dados como User[]
          this.users = data;
        },
        error: (error) => {
          console.error('Erro ao buscar usuários:', error);
        }
      });
  }
}