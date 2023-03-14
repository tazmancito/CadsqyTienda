import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from "@models/category";
import { CategoryService } from "@services/category-service.service";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.scss"],
})
export class ProductDialogComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  selectedCategory: number = 0;
  selectedSubCategory: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private _CategoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onChange() {
    this.loadSubcategories(this.selectedCategory);
  }

  loadCategories() {
    this._CategoryService.getCategories().subscribe((result) => {
      this.categories = result;

      this._CategoryService
        .getCategory(this.data.CategoriaId)
        .subscribe((result: any) => {
          if (result[0].CategoriaPadreId) {
            this.selectedCategory = result[0].CategoriaPadreId;
            this.loadSubcategories(result[0].CategoriaPadreId);
            this.selectedSubCategory = this.data.CategoriaId;
          } else {
            this.selectedCategory = this.data.CategoriaId;
            this.loadSubcategories(this.data.CategoriaId);
          }
        });
    });
  }

  loadSubcategories(categoryFatherID: number) {
    this.subCategories = [];
    this._CategoryService
      .getSubCateriesByCategory(categoryFatherID)
      .subscribe((result) => {
        this.subCategories = result;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.selectedSubCategory > 0) {
      this.data.CategoriaId = this.selectedSubCategory;
    } else {
      this.data.CategoriaId = this.selectedCategory;
    }

    console.log(this.data);
    this.dialogRef.close(this.data);
  }
}
