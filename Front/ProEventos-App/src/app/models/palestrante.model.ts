import { Evento } from "./evento.model";
import { RedeSocial } from "./rede-social.model";

export interface Palestrante {
id: number;
nome: string;
miniCurriculum: string;
imagemURL: string;
telefone: string;
email: string;
redesSociais: RedeSocial[];
palestrantesEventos: Evento[];
}
