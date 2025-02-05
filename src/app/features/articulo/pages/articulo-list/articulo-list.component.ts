import { Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Articulo } from '../../../../core/models/articulo';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { Precio } from '../../../../core/models/precio';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-articulo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    RouterModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './articulo-list.component.html',
  styleUrl: './articulo-list.component.css',
})
export class ArticuloListComponent {
  articulos: Articulo[] = []; // Lista de artículos
  dataSource: MatTableDataSource<Articulo>; // Fuente de datos para la tabla
  displayedColumns: string[] = [
    'clave',
    'nombre',
    'categoria',
    'precios',
    'activo',
    'acciones',
  ]; // Columnas de la tabla

  @ViewChild(MatSort) sort!: MatSort; // Referencia a MatSort

  constructor(
    private articuloService: ArticuloService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource(this.articulos); // Inicializar dataSource
  }

  ngOnInit(): void {
    this.cargarArticulos();
    
  }

  // Cargar artículos desde el servicio
  cargarArticulos(): void {
    this.articuloService.getArticulos().subscribe((data) => {
      this.articulos = data;
      this.dataSource.data = this.articulos; 
      this.dataSource.sort = this.sort; 
    });
  }

  // Formatear precios para mostrar en la tabla
  formatearPrecios(precios: Precio[]): string {
    return precios.map((precio) => `$${precio.precio}`).join(', ');
  }

  // Editar un artículo
  editarArticulo(articulo: Articulo): void {
    this.router.navigate(['/articulos/editar/', articulo.id]);
  }

  // Eliminar un artículo
  eliminarArticulo(articulo: Articulo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { articulo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Eliminando:', result);
        this.articuloService.deleteArticulo(articulo.id!).subscribe(() => {
          this.cargarArticulos();
          this.snackBar.open(`Articulo ${articulo.clave} Eliminado`, 'Cerrar', {
            duration: 6000,
            verticalPosition: 'top',
          });
        });
      }
    });
  }

  // Filtrar la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}