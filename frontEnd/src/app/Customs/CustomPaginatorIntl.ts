import { MatPaginatorIntl } from '@angular/material/paginator';
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Productos por página';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override getRangeLabel = function(page: number, pageSize: number, length: number): string {
    const total = Math.ceil(length / pageSize);
    const end = (page + 1) * pageSize;
    const start = end - pageSize + 1;
    return `${start} - ${end} de ${length} `;
  }
  // También puedes sobrescribir la propiedad "getRangeLabel" para cambiar el formato del rango de elementos mostrados
}
