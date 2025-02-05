import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../../core/models/categoria';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  categoriaForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  categoriaId: number | null = null;
  buttonText: string = 'Registrar';
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private notificaciones: NotificacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      fechaCreado: [Date.now(), Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoriaId = +params['id'];
        this.buttonText = 'Actualizar';
        this.cargarCategoria(this.categoriaId);
      }
    });
  }

  cargarCategoria(id: number): void {
    this.categoriaService.getCategoriaById(id).subscribe(categoria => {
      this.categoriaForm.patchValue(categoria);
    });
  }

  get f() {
    return this.categoriaForm.controls;
  }

  submitForm(): void {
    if (this.categoriaForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
  
    // Asegurar que 'activo' tenga un valor booleano explícito
    const categoria: Categoria = {
      ...this.categoriaForm.value,
     
    };
  
    if (this.isEditMode && this.categoriaId) {
      this.categoriaService.updateCategoria(this.categoriaId, categoria).subscribe({
        next: (response) => {
          this.notificaciones.notificarCategoriaCreado(response.message);
          this.router.navigate(['/categorias']);
        },
        error: (error) => {
          this.notificaciones.mostrarErrores(error);
        },
        complete: () => (this.isSubmitting = false)
      });
    } else {
      console.log(categoria)
      this.categoriaService.createCategoria(categoria).subscribe({
        next: (response) => {
          this.categoriaForm.reset({ activo: false, fechaCreado: Date.now() });
          this.notificaciones.notificarCategoriaCreado(response.message);
          this.router.navigate(['/categorias']);
        },
        error: (error) => {
          this.notificaciones.mostrarErrores(error);
        },
        complete: () => (this.isSubmitting = false)
      });
    }
  }
  
  formatearFechaCorta(timestamp: number): string {
    const fecha = new Date(timestamp);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}