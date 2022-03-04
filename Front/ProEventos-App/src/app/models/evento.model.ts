import { Lote } from "./lote.model";
import { Palestrante } from "./palestrante.model";
import { RedeSocial } from "./rede-social.model";

export interface Evento {
  id: number;
  local: string;
  dataEvento?: Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redesSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];
}
