import { Injectable } from '@angular/core';
import { Map } from 'ol';

const MILLIMETERS_IN_INCH = 25.4;
const POINTS_IN_INCH = 72;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  downloadPdf(selectedMapPdfOptions: any, margin: number) {
    const width = Math.round((selectedMapPdfOptions.dimentions[0] * 72) / 25.4);
    const height = Math.round(
      (selectedMapPdfOptions.dimentions[1] * 72) / 25.4
    );
    //viewResolution = this.data.map.getView().getResolution();
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = width;
    mapCanvas.height = height;
    console.log(selectedMapPdfOptions.dimentions, width, height);
    const mapContext: any = mapCanvas.getContext('2d');
    console.log(mapContext);
    Array.prototype.forEach.call(
      document.querySelectorAll('.ol-layer canvas'),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity = canvas.parentNode.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          const transform = canvas.style.transform;
          // Get the transform parameters from the style's transform matrix
          const matrix = transform
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(',')
            .map(Number);
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          console.log(mapCanvas.width, mapCanvas.height, transform);
          /* img.width = Math.round(
            (selectedMapPdfOptions.dimentions[0] * 72) / 25.4);
          img.height = Math.round(
            (selectedMapPdfOptions.dimentions[1] * 72) / 25.4
          ); */
          mapContext.drawImage(mapCanvas, 0, 0);
          img.src = canvas.toDataURL('image/png');
        }
      }
    );
    mapContext.globalAlpha = 1;
    mapContext.setTransform(1, 0, 0, 1, 0, 0);

    return {
      pageSize: selectedMapPdfOptions.value.toUpperCase(),
      pageMargins: 10,
      pageOrientation: 'landscape',
      content: [
        {
          image: img.src,
          width:
            Math.round((selectedMapPdfOptions.dimentions[0] * 72) / 25.4) -
            2 * margin,
          height:
            Math.round((selectedMapPdfOptions.dimentions[1] * 72) / 25.4) -
            2 * margin,
        },
      ],
    };
  }
}
