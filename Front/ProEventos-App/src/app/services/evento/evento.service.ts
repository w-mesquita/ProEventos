import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`https://localhost:5001/api/Eventos`)
  }
  getEventosByTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`https://localhost:5001/api/Eventos/${tema}/tema`)
  }
  getEventoById(id: number): Observable<Evento>{
    return this.http.get<Evento>(`https://localhost:5001/api/Eventos/${id}`)
  }
}
