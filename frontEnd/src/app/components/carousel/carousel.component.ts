import { Component } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent {
  images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300",
    "https://picsum.photos/id/240/200/300",
    "https://picsum.photos/id/240/200/300",
    "https://picsum.photos/id/240/200/300",
    "https://picsum.photos/id/240/200/300",
  ];

  radius = 340;
  autoRotate = true;
  rotateSpeed = -60;
  imgWidth = 190;
  imgHeight = 230;

}
