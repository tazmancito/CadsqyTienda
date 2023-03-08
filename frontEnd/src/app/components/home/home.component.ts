import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from '@models/category';
import { CategoryService } from '@services/category-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  treeControl = new NestedTreeControl<Category>((node) => node.categories);
  dataSource = new MatTreeNestedDataSource<Category>();

  hasSubmenu = (_: number, node: Category) =>
    !!node.categories && node.categories.length > 0;

  constructor(private _categoryServise: CategoryService) {}
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryServise.getCategories().subscribe((result: Category[]) => {
      // this.categories = result;
      this.dataSource.data = result;
    });
  }
}
