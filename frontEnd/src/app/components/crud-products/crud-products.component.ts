import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ProductDialogComponent } from "@components/product-dialog/product-dialog.component";
import { Product } from "@models/product";
import { ProductService } from "@services/product-service.service";

@Component({
  selector: "app-crud-products",
  templateUrl: "./crud-products.component.html",
  styleUrls: ["./crud-products.component.scss"],
})
export class CrudProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Product>;

  columnas: string[] = ["nombre","descripción", "precio", "acciones"];

  constructor(
    private _productoService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateTable() {
    this._productoService.getProducts().subscribe((products) => {
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: "400px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._productoService.addProduct(result).subscribe(() => {
          this.updateTable();
        });
      }
    });
  }

  editarProducto(producto: any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: "400px",
      data: { ...producto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._productoService
          .updateProduct(result, result.ProductosId)
          .subscribe(() => {
            this.updateTable();
          });
      }
    });
  }

  eliminarProducto(product: any) {
    if (confirm(`¿Está seguro de eliminar el producto ${product.nombre}?`)) {
      this._productoService
        .delteteProduct(product.ProductosId)
        .subscribe(() => {
          this.updateTable();
        });
    }
  }
}
