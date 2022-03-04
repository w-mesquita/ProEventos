import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {

  textoCancelar = "Cancelar";
  textoOk = "OK";

  titulo = "Alerta!";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalConfirmacaoComponent>
  ) {
    this.textoCancelar = data.textoCancelar || this.textoCancelar;
    this.textoOk = data.textoOk || this.textoOk;
    this.titulo = data.titulo || this.titulo;
  }
  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(1);
  }

}
