import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];

  widthImg: number = 150;
  showImage: boolean = true;
  private _filtroEventos: string = "";

  public get filtroEventos(): string {
    return this._filtroEventos;
  }

  public set filtroEventos(value: string){
    this._filtroEventos = value;
    this.eventosFiltrados = this.filtroEventos ? this.filtrarEventos(this.filtroEventos) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
    (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
    evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  mostrarImagem(){
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): any {
    this.http.get('https://localhost:5001/api/Eventos').subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    )

}

};
