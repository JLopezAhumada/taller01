import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Fruta {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-tienda-frutas',
  imports: [CommonModule],
  templateUrl: './tienda-frutas.html',
  styleUrl: './tienda-frutas.css',
})
export class TiendaFrutas {
  frutas = signal<Fruta[]>([
    { id: 1, nombre: 'Mango', precio: 1800, cantidad: 12 },
    { id: 2, nombre: 'Guayaba', precio: 1200, cantidad: 8 },
    { id: 3, nombre: 'Patilla', precio: 6500, cantidad: 2 },
    { id: 4, nombre: 'Maracuyá', precio: 3400, cantidad: 5 },
    { id: 5, nombre: 'Níspero', precio: 2900, cantidad: 4 },
  ]);

  totalDinero = computed(() =>
    this.frutas().reduce((total, fruta) => total + fruta.precio * fruta.cantidad, 0),
  );

  totalUnidades = computed(() => this.frutas().reduce((total, fruta) => total + fruta.cantidad, 0));

  productosAgotados = computed(() => this.frutas().filter((fruta) => fruta.cantidad === 0).length);

  inventarioBajo = computed(() =>
    this.frutas().some((fruta) => fruta.cantidad >= 1 && fruta.cantidad <= 2),
  );

  productoMasCaro = computed(() => {
    const lista = this.frutas();
    if (lista.length === 0) return null;
    return lista.reduce((masCaro, fruta) => (fruta.precio > masCaro.precio ? fruta : masCaro));
  });

  frutasOrdenadasPorSubtotal = computed(() =>
    [...this.frutas()].sort((a, b) => b.precio * b.cantidad - a.precio * a.cantidad),
  );

  venderFruta(id: number): void {
    this.frutas.update((lista) =>
      lista.map((fruta) =>
        fruta.id === id && fruta.cantidad > 0 ? { ...fruta, cantidad: fruta.cantidad - 1 } : fruta,
      ),
    );
  }

  venderTodo(id: number): void {
    this.frutas.update((lista) =>
      lista.map((fruta) => (fruta.id === id ? { ...fruta, cantidad: 0 } : fruta)),
    );
  }
}
