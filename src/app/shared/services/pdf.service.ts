import { Injectable } from '@angular/core';
import { Map } from 'ol';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  downloadPdf(selectedMapPdfOptions: any) {
    const resolution = selectedMapPdfOptions.resolution;
    const width = Math.round(
      (selectedMapPdfOptions.dimentions[0] * resolution) / 25.4
    );
    const height = Math.round(
      (selectedMapPdfOptions.dimentions[1] * resolution) / 25.4
    );
    //viewResolution = this.data.map.getView().getResolution();
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = width;
    mapCanvas.height = height;
    const mapContext: any = mapCanvas.getContext('2d');

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
          mapContext.drawImage(canvas, 0, 0);
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
          width: mapCanvas.width - 20,
          height: mapCanvas.height - 20,
        },
      ],
    };
  }
}
