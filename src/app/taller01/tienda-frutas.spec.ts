import { TestBed } from '@angular/core/testing';
import { TiendaFrutas } from './tienda-frutas';

describe('TiendaFrutas', () => {
  let component: TiendaFrutas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TiendaFrutas] }).compileComponents();
    component = TestBed.createComponent(TiendaFrutas).componentInstance;
  });

  it('calcula los totales y retos con el inventario inicial', () => {
    expect(component.totalDinero()).toBe(72800);
    expect(component.totalUnidades()).toBe(31);
    expect(component.productosAgotados()).toBe(0);
    expect(component.inventarioBajo()).toBe(true);
    expect(component.productoMasCaro()?.nombre).toBe('Patilla');
  });

  it('actualiza las señales y los totales al vender una fruta', () => {
    component.venderFruta(1);
    expect(component.totalDinero()).toBe(71000);
    expect(component.totalUnidades()).toBe(30);
    expect(component.frutas()[0].cantidad).toBe(11);
  });

  it('permite agotar una fruta y ordena subtotales sin mutar la señal', () => {
    const ordenOriginal = component.frutas().map((fruta) => fruta.id);

    component.venderTodo(1);

    expect(component.frutas()[0].cantidad).toBe(0);
    expect(component.productosAgotados()).toBe(1);
    expect(component.frutas().map((fruta) => fruta.id)).toEqual(ordenOriginal);
    expect(
      component.frutasOrdenadasPorSubtotal().map((fruta) => fruta.precio * fruta.cantidad),
    ).toEqual([17000, 13000, 11600, 9600, 0]);
  });
});
