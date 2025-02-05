import { Component, ViewChild } from '@angular/core';
import { Categoria } from '../../../../core/models/categoria';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent {
  categorias: Categoria[] = [];
  dataSource: MatTableDataSource<Categoria>;
  columnas: string[] = ['clave', 'nombre', 'fechaCreado', 'estado', 'acciones'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.categorias);
  }

  ngOnInit(): void {
    this.cargarCategorias();
    
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
        this.dataSource.data = this.categorias;
        this.dataSource.sort = this.sort;
      },
      (error) => console.error('Error al obtener categorías', error)
    );
  }

  editarCategoria(categoria: Categoria): void {
    this.router.navigate(['/categorias/editar', categoria.id]);
  }

  formatearFecha(timestamp: number): string {
    const fecha = new Date(timestamp);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const ano = fecha.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  eliminarCategoria(categoria: Categoria): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { categoria },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Eliminando:', result);
        this.categoriaService.deleteCategoria(categoria.id!).subscribe(() => {
          this.cargarCategorias();
          this.snackBar.open(`Categoria ${categoria.clave} Eliminado`, 'Cerrar', {
            duration: 6000, 
            verticalPosition: 'top', 
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}