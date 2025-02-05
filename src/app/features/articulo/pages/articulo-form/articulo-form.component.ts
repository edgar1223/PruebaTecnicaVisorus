  import { ReactiveFormsModule } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatSelectModule } from '@angular/material/select';
  import { MatInputModule } from '@angular/material/input';
  import { Component, OnInit } from '@angular/core';
  import { Categoria } from '../../../../core/models/categoria';
  import { ArticuloService } from '../../../../core/services/articulo.service';
  import { CategoriaService } from '../../../../core/services/categoria.service';
  import { Articulo } from '../../../../core/models/articulo';
  import { CommonModule } from '@angular/common';
  import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { NotificacionesService } from '../../../../core/services/notificaciones.service';
  import { ActivatedRoute, Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
  @Component({
    selector: 'app-articulo-form',
    imports: [
      CommonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      ReactiveFormsModule,
      MatCheckboxModule,
    ],
    templateUrl: './articulo-form.component.html',
    styleUrl: './articulo-form.component.css',
  })
  export class ArticuloFormComponent implements OnInit {
    articuloForm: FormGroup;
    categorias: Categoria[] = [];
    isEditMode = false; 
    articuloId: number | null = null;
    buttonText: string = 'Registrar'; 
    isLoading: boolean = false; 

    constructor(
      private fb: FormBuilder,
      private articuloService: ArticuloService,
      private categoriaService: CategoriaService,
      private notificaciones: NotificacionesService,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar
    ) {
      this.articuloForm = this.fb.group({
        clave: ['', [Validators.required, Validators.minLength(3)]],
        categoria: [null, Validators.required],
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        precios: this.fb.array([this.crearPrecioControl()]), 
        activo: [true, Validators.required],
      });
    }

    ngOnInit(): void {
      this.cargarCategorias();

      // Verificar si estamos en modo edición
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.isEditMode = true;
          this.articuloId = +params['id'];
          this.buttonText = 'Actualizar';
          this.cargarArticulo(this.articuloId);
        }
      });
    }

    // Cargar categorías desde el servicio
    cargarCategorias(): void {
      this.categoriaService.getCategorias().subscribe((data) => {
        this.categorias = data;
      });
    }

    // Cargar datos del artículo en modo edición
    cargarArticulo(id: number): void {
      this.articuloService.getArticuloById(id).subscribe({
        next: (articulo) => {
          const categoriaId =
            typeof articulo.categoria === 'object' && 'id' in articulo.categoria
              ? articulo.categoria.id
              : articulo.categoria;

          this.articuloForm.patchValue({
            clave: articulo.clave,
            categoria: categoriaId,
            nombre: articulo.nombre,
            activo: articulo.activo,
          });


          const preciosArray = this.articuloForm.get('precios') as FormArray;
          preciosArray.clear(); // Limpiar el array existente
          articulo.precios.forEach((precio) => {
            preciosArray.push(
              this.fb.group({
                precio: [precio.precio, [Validators.required, Validators.min(0)]],
              })
            );
          });
        },
        error: (error) => {
          this.snackBar.open(
            `Error al cargar el artículo: ${error.message}`,
            'Cerrar',
            {
              duration: 3000,
              panelClass: 'snackbar-error',
            }
          );
          this.router.navigate(['/articulos']);
        },
      });
    }

    // Crear un control para el precio
    crearPrecioControl(): FormGroup {
      return this.fb.group({
        precio: ['', [Validators.required, Validators.min(0)]],
      });
    }

    // Agregar un nuevo precio al array
    agregarPrecio(): void {
      const preciosArray = this.articuloForm.get('precios') as FormArray;
      preciosArray.push(this.crearPrecioControl());
    }

    // Eliminar un precio del array
    eliminarPrecio(index: number): void {
      const preciosArray = this.articuloForm.get('precios') as FormArray;
      preciosArray.removeAt(index);
    }

    // Enviar el formulario
    onSubmit(): void {
      if (this.articuloForm.invalid) {
        return;
      }
      this.isLoading = true;
      const articulo: Articulo = this.articuloForm.value;

      if (this.isEditMode && this.articuloId) {
        this.articuloService.updateArticulo(this.articuloId, articulo).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBar.open(response.message, 'Cerrar', { duration: 6000,  verticalPosition: 'top' });
            this.router.navigate(['/articulos']); 
          },
          error: (error) => {
            this.isLoading = false;
            this.notificaciones.mostrarErrores(error);
          },
        });
      } else {
        this.articuloService.createArticulo(articulo).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBar.open(response.message, 'Cerrar', { duration: 3000 });
            this.router.navigate(['/articulos']); 
          },
          error: (error) => {
            this.isLoading = false;
            this.notificaciones.mostrarErrores(error);
          },
        });
      }
    }

    // Obtener controles de precios para iterar en el template
    getPreciosControls() {
      return (this.articuloForm.get('precios') as FormArray).controls;
    }
    validarEntrada(event: KeyboardEvent) {
      const charCode = event.key.charCodeAt(0);
      if (
        !(charCode >= 48 && charCode <= 57) &&
        charCode !== 46 &&
        charCode !== 8
      ) {
        event.preventDefault();
      }
    }
  }
