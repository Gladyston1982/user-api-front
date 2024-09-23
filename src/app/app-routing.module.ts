import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent }, // Rota padrão
  { path: 'user-form', component: UserFormComponent }, // Rota para a tela de cadastro
  { path: 'user-form/:id', component: UserFormComponent } // Rota para a tela de edição
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }