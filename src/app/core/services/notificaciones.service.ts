import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private articuloCreadoSubject = new Subject<string>();
  articuloCreado$ = this.articuloCreadoSubject.asObservable();

  private categoriaCreadoSubjec= new Subject<string>();
  categoriaCreado$ = this.categoriaCreadoSubjec.asObservable();

  notificarArticuloCreado(mensaje: string) {
    this.articuloCreadoSubject.next(mensaje);
  }

  notificarCategoriaCreado(mensaje: string) {
    this.categoriaCreadoSubjec.next(mensaje);
  }
  constructor(private snackBar: MatSnackBar) {}

  mostrarErrores(error: any): void {
    if (error.error && error.error.errores) {
      error.error.errores.forEach((err: { error: string }) => {
        this.snackBar.open(err.error, 'Cerrar', {
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      });
    } else {
      this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
}
