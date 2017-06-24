import { Component, OnInit } from '@angular/core'
import { Image } from './image.interface';
import { CarImageModel } from '../CarGallery/CarImage.Model'
import { CarImagesService } from '../CarGallery/Services/CarImages.Service'
import { NgProgressService } from "ng2-progressbar";

@Component({
    //Name of our tag
    selector: 'css-carousel',
    providers: [CarImagesService],
    //Template for the tag
    template: `
 <div class="carousel">
  <ul class="slides">
    <li *ngFor="let image of CarData">
      <h2>{{image.Brand}}</h2>
      <img src="{{image.Image}}" alt="">
    </li>
  </ul>
</div>
  `,
    //Styles for the tag
    styles: [`
.carousel
{
    overflow:hidden;
    width:100%;
}
.slides
{
    list-style:none;
    position:relative;
    width:500%; /* Number of panes * 100% */
    overflow:hidden; /* Clear floats */
        /* Slide effect Animations*/
    -moz-animation:carousel 30s infinite;
    -webkit-animation:carousel 30s infinite;
    animation:carousel 30s infinite;
}
.slides > li
{
    position:relative;
    float:left;
    width: 20%; /* 100 / number of panes */
}
.carousel img
{
    display:block;
    width:100%;
    max-width:100%;
}
.carousel h2
{
    margin-bottom: 0;
    font-size:1em;
    padding:1.5em 0.5em 1.5em 0.5em;
    position:absolute;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}

@keyframes carousel{
    0%    { left:-5%; }
    11%   { left:-5%; }
    12.5% { left:-105%; }
    23.5% { left:-105%; }
    25%   { left:-205%; }
    36%   { left:-205%; }
    37.5% { left:-305%; }
    48.5% { left:-305%; }
    50%   { left:-405%; }
    61%   { left:-405%; }
    62.5% { left:-305%; }
    73.5% { left:-305%; }
    75%   { left:-205%; }
    86%   { left:-205%; }
    87.5% { left:-105%; }
    98.5% { left:-105%; }
    100%  { left:-5%; }
}
  `],
})
//Carousel Component itself
export class CSSCarouselComponent implements OnInit
{
    CarData: CarImageModel[];

    constructor(private pService: NgProgressService, private _carservice: CarImagesService) {

    }


    //images data to be bound to the template
    public images = IMAGES;

    ngOnInit(): void {
        this.pService.start();
        this._carservice
            .GetAllCarsDetails()
            .subscribe(data =>
            {
                this.CarData = data
                this.pService.done();
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });

    }

}

//IMAGES array implementing Image interface
var IMAGES: Image[] =
    [
    { "title": "We are covered", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/covered.jpg" },
    { "title": "Generation Gap", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/generation.jpg" },
    { "title": "Potter Me", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/potter.jpg" },
    { "title": "Pre-School Kids", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/preschool.jpg" },
    { "title": "Young Peter Cech", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/soccer.jpg" }
];