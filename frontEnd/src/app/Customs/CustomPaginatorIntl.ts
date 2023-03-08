import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
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
}
