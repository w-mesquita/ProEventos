import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmacaoComponent } from '../../shared/modal-confirmacao/modal-confirmacao.component';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public isLoading = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  widthImg: number = 150;
  showImage: boolean = true;
  private filtroListado: string = "";

  public get filtroEventos(): string {
    return this.filtroListado;
  }

  public set filtroEventos(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroEventos ? this.filtrarEventos(this.filtroEventos) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: Evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private eventoService: EventoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  mostrarImagem(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.isLoading = true;
    this.eventoService.getEventos().subscribe(
      (response: Evento[]) => {
        this.eventos = response,
          this.eventosFiltrados = this.eventos;
      },
      error => {
      console.error(error),
      this.isLoading = false,
      this.openSnackBar('Erro ao carregar os eventos', 'OK', 5000, 'danger-snackbar');
      });
      this.isLoading = false;
  }

  public excluir() {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      width: '540px',
      data: {
        textoCancelar: 'Não',
        textoOk: 'Sim',
        texto: 'Tem certeza de que deseja excluir o item selecionado?',
      },
    });
    dialogRef.afterClosed().subscribe(
      async response => {
        if (response === 1) {
          this.openSnackBar('Item excluido com sucesso', 'OK', 5000, 'success-snackbar')
        } else {
          this.openSnackBar('Operação cancelada', 'OK', 5000, 'danger-snackbar')
        }
      });
  }

  openSnackBar(message: string, action: string, duration: number, panelClass?: string): any {
    this.snackBar.open(message, action, { duration, panelClass });
  }
};
