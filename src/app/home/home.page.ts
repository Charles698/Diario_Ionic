import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {IonCard, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonInput, IonTextarea, IonButtons} from '@ionic/angular/standalone';
import {add} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonModal, 
    IonButton,
    IonInput,
    IonTextarea,
    IonButtons,
    FormsModule,
    DatePipe,
    CommonModule
  ],
})

export class HomePage {

  isModalOpen = false; // Inicia a variável do modal

  titulo = '';
  descricao = '';
  data = '';

  registros: any[] = [];

  constructor() {

    addIcons({
      add
    });

    const dados = localStorage.getItem('registros');

    if(dados) {
      this.registros = JSON.parse(dados);
    }
  }

  abrirModal() {
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
  }

  salvarRegistro() {

    // RECEBE AS VARIÁVEIS (titulo, descricao, data) COMO PARÂMETRO
    const novoRegistro = {
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.data
    };

    this.registros.push(novoRegistro); // ADICIONA O REGISTRO NO ARRAY

    localStorage.setItem(
      'registros',
      JSON.stringify(this.registros)
    );

    this.titulo = '';
    this.descricao = '';
    this.data = '';

    this.fecharModal();

  }

}
