import { Categoria } from "./categoria";
import { Precio } from "./precio";


export interface Articulo {
  id?: number;
  clave: string;
  categoria: Categoria | number; 
  nombre: string;
  precios: Precio[];
  activo: boolean;
}
