import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public imgMain: string =
    "https://cdn.pixabay.com/photo/2022/08/03/13/09/moon-7362632_960_720.jpg";

  otherImgs: string[] = [
    "https://cdn.pixabay.com/photo/2023/03/05/12/41/mountains-7831286_960_720.jpg",
    "https://cdn.pixabay.com/photo/2023/02/26/16/06/squirrel-7816229_960_720.jpg",
    "https://cdn.pixabay.com/photo/2023/01/22/16/45/nature-7736939_960_720.jpg",
    "https://cdn.pixabay.com/photo/2023/02/28/03/31/man-7819801_960_720.jpg",
  ];

  constructor() {}

  ngOnInit(): void {}

  switchImage(img: string, index: number) {
    this.otherImgs[index] = this.imgMain;
    this.imgMain = img;
  }
}
