import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {IonCard, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonInput, IonTextarea, IonButtons} from '@ionic/angular/standalone';
import { add, create, trash, moon, sunny } from 'ionicons/icons';
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

  // Inicia a variável de abrir o modal
  isModalOpen = false; 

  // Inicia a variável de editar registro
  indiceEditando: number | null = null; 

  // Inicia a variável do modo de visualização
  modoVisualizacao = false; 

  titulo = '';
  descricao = '';
  data = '';

  registros: any[] = [];

  erroTitulo = false;
  erroDescricao = false;
  erroData = false;
  
  darkMode = false;

  constructor() {

    addIcons({
      add,
      create,
      trash,
      moon,
      sunny
    });

    const dados = localStorage.getItem('registros');

    if(dados) {
      this.registros = JSON.parse(dados);
    }

    const temaSalvo = localStorage.getItem('darkMode');

    if (temaSalvo) {
    this.darkMode = JSON.parse(temaSalvo);
      
      if (this.darkMode) {
        document.body.classList.add('dark');
      }
    }
  }

  abrirModal() {
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
    
    setTimeout(() => {

      this.modoVisualizacao = false;

    }, 200);

  }
  
  novoRegistro() {

    this.modoVisualizacao = false;
    
    this.indiceEditando = null;

    this.titulo = '';
    this.descricao = '';
    this.data = '';
    
    this.abrirModal();

  }

  salvarRegistro() {

    // RECEBE AS VARIÁVEIS (titulo, descricao, data) COMO PARÂMETRO
    const novoRegistro = {
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.data
    };

    if(!this.titulo.trim()) {
      this.erroTitulo = true;
      return;
    }

    if(!this.descricao.trim()) {
      this.erroDescricao = true;
      return;
    }
    
    const data_hoje = new Date().toISOString().split('T')[0];

    if(this.data == '') {
      this.erroData = true;
      return;
    } 
    else if(this.data > data_hoje) {
      //this.erroData = true;
      alert("A data não pode ser maior do que hoje.");
      return;
    }

    if(this.indiceEditando != null) {
      this.registros[this.indiceEditando] = novoRegistro;
      this.indiceEditando = null;
    } 
    else {
      this.registros.push(novoRegistro);
    }

    localStorage.setItem(
      'registros',
      JSON.stringify(this.registros)
    );

    this.titulo = '';
    this.descricao = '';
    this.data = '';

    this.fecharModal();

  }

  editarRegistro(indice: number) {

    const registro = this.registros[indice];

    this.titulo = registro.titulo;
    this.descricao = registro.descricao;
    this.data = registro.data;

    this.indiceEditando = indice;

    this.modoVisualizacao = false;
    
    this.abrirModal();

  }

  deletarRegistro(indice: number) {

    this.registros.splice(indice, 1);

    localStorage.setItem(
      'registros', 
      JSON.stringify(this.registros)
    );

  }

  visualizarRegistro(registro: any) {

    this.titulo = registro.titulo;
    this.descricao = registro.descricao;
    this.data = registro.data;
    this.modoVisualizacao = true;
    this.abrirModal();

  }

  alterarTema() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'darkMode',
      JSON.stringify(this.darkMode)
    );
  }
 
}
