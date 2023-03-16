import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "@services/category-service.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ProductService } from "@services/product-service.service";
import { HttpEventType } from "@angular/common/http";

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

  form: FormGroup;
  formGroupImages: FormGroup;
  imageUrl: string = "";
  imgFile!: File;
  progress!: number;
  message!: string;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private _CategoryService: CategoryService,
    private _productService: ProductService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      image: new FormControl(),
    });

    this.formGroupImages = this.formBuilder.group({
      imgMain: "",
    });
  }

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

  onFileSelected(event: any) {
    this.imgFile = event.target.files[0];
    if (this.imgFile) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(this.imgFile);
    }
  }

  onUpload() {
    if (this.imgFile) {
      const formData = new FormData();
      formData.append("myFiles", this.imgFile, this.imgFile.name);
      this._productService.uploadFiles(formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event)
          this.progress = Math.round((100 * event.loaded) / event.total!);
        } else if (event.type === HttpEventType.Response) {
          this.message = "Upload success.";
        }
      });
    }

    //const image = this.form.get("image")!.value;
    // Carga la imagen en tu servidor o realiza alguna acción adicional aquí
  }
}
