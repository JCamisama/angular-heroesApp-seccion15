import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagePipe',
   // pure: false   // ---> activate only if it is completely necessary!
})
export class ImagenPipe implements PipeTransform {

  private _imageMainDirectory: string   = 'assets';
  private _imageFormats      : string[] = ['jpg', 'png', 'svg'];
  private _defaultImageName  : string   = 'no-image';



  public transform( hero: Heroe ): string{


    if( !hero.id && !hero.alt_img ) {
      return `${this._imageMainDirectory}/${this._defaultImageName}.${this._imageFormats[1]}`;
    }
    else if (hero.alt_img) {
      return hero.alt_img;
    }
    else{}

    return `${this._imageMainDirectory}/heroes/${hero.id}.${this._imageFormats[0]}`;
  }



  /*
  public transform( hero: Heroe ): string{

    let imageDirectory: string  = "";

    if(hero.id) {
      if(hero.alt_img){
        imageDirectory = hero.alt_img;
      }
      else{
        imageDirectory = `${this._imageMainDirectory}/heroes/${hero.id}.${this._imageFormats[0]}`;
      }
    }
    else {
      imageDirectory = `${this._imageMainDirectory}/${this._defaultImageName}.${this._imageFormats[1]}`
    }


    return imageDirectory;
  }
  */

}
