import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {
  private router = inject(Router);
  private productApi = inject(ApiService);

  searchText: string = '';
  pageSize: number = 5;

  products: Product[] = [];
  productosFiltrados: Product[] = [];
  productosFiltradosCompletos: Product[] = [];

  productoAEliminar: Product | null = null;
  mostrarModal: boolean = false;

  paginaActual: number = 1;

  ngOnInit(): void {
    this.cargarProductos();
  }

  get totalFiltrados(): number {
    return this.productosFiltradosCompletos.length;
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalFiltrados / this.pageSize);
  }

  get paginasVisibles(): number[] {
    const total = this.totalPaginas;
    if (total === 0) return [];
    
    const maxPaginasVisibles = 5;
    const paginaActual = this.paginaActual;    
    
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(total, inicio + maxPaginasVisibles - 1);    
    
    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }
    
    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  filtrarProductos(): Product[] {
    if (!this.searchText.trim()) {
      return [...this.products];
    }
    
    return this.products.filter(p =>
      (p.nombre?.toLowerCase() ?? '').includes(this.searchText.toLowerCase()) ||
      (p.description?.toLowerCase() ?? '').includes(this.searchText.toLowerCase())
    );
  }

  cargarProductos() {
    this.productApi.getAll().subscribe((data) => {
      this.products = data || [];
      this.actualizarFiltrados();
    });
  }

  actualizarFiltrados() {
    console.log('Actualizando filtrados...');    
    
    this.productosFiltradosCompletos = this.filtrarProductos();
    
    console.log('Total productos filtrados:', this.productosFiltradosCompletos.length);
    console.log('Página actual:', this.paginaActual);
    console.log('Tamaño de página:', this.pageSize);    
    
    const totalPaginas = this.totalPaginas;
    if (this.paginaActual > totalPaginas && totalPaginas > 0) {
      this.paginaActual = totalPaginas;
    } else if (this.paginaActual < 1) {
      this.paginaActual = 1;
    }   
    
    this.aplicarPaginacion();
  }

  aplicarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.pageSize;
    const fin = inicio + this.pageSize;
    
    console.log(`Aplicando paginación: inicio=${inicio}, fin=${fin}`);
    
    this.productosFiltrados = this.productosFiltradosCompletos.slice(inicio, fin);
    
    console.log('Productos en página actual:', this.productosFiltrados.length);
  }

  onSearchTextChange() {
    console.log('Texto de búsqueda cambiado:', this.searchText);
    this.paginaActual = 1;
    this.actualizarFiltrados();
  }

  onPageSizeChange() {    
    this.pageSize = Number(this.pageSize);
    console.log('Tamaño de página cambiado a:', this.pageSize, typeof this.pageSize);
    this.paginaActual = 1;
    this.actualizarFiltrados();
  }

  cambiarPagina(nuevaPagina: number) {
    console.log('Cambiando a página:', nuevaPagina);
    
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.aplicarPaginacion();
    }
  }

  irAlInicio() {
    console.log('Navegando al inicio');
    this.paginaActual = 1;
    this.aplicarPaginacion();
  }

  irAlFinal() {
    console.log('Navegando al final');
    this.paginaActual = this.totalPaginas;
    this.aplicarPaginacion();
  }

  irAAgregar() {
    this.router.navigate(['/agregar']);
  }

  edit(id: string) {
    this.router.navigate(['/editar', id]);
  }

  confirmarEliminacion(product: Product) {
    this.productoAEliminar = product;
    this.mostrarModal = true;
  }

  cancelarEliminacion() {
    this.productoAEliminar = null;
    this.mostrarModal = false;
  }

  eliminarConfirmado() {
    if (this.productoAEliminar) {
      this.productApi.delete(this.productoAEliminar.id).subscribe(() => {
        this.cargarProductos();
        this.cancelarEliminacion();
      });
    }
  }
}