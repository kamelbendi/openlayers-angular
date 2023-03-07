import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { Size } from 'ol/size';

@Injectable({
  providedIn: 'root'
})
export class PngService {

constructor() {}

downLoadPng(map: Map): void {
  //const layers = map.getAllLayers();
  //layers.map((layer) => layer.setVisible(false));
  //layers[1].setVisible(true);
  //layers[0].setVisible(true);
  //map.setLayers(layers);

  const mapCanvas = document.createElement('canvas');

    const size: Size | undefined = map.getSize();

    if (size) {
      console.log(size, 'color: red');
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      console.log(mapCanvas);
    }

    const mapContext = mapCanvas.getContext('2d');

    Array.prototype.forEach.call(
      map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity;
          if (mapContext) {
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          }
          let matrix;
          const transform = canvas.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              10,
              10,
              parseFloat(canvas.style.height) / canvas.height,
              20,
              30,
            ];
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          const backgroundColor = canvas.parentNode.style.backgroundColor;
          if (backgroundColor) {
            mapContext ? (mapContext.fillStyle = backgroundColor) : 0;
            mapContext
              ? mapContext.fillRect(0, 0, canvas.width, canvas.height)
              : 0;
          }
          mapContext ? mapContext.drawImage(canvas, 0, 0) : 0;
        }
      }
    );
    if (mapContext) {
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    
    var a = document.createElement('a'); //Create <a>
    a.download = 'Image.png'; //File name Here
    a.id = "png-download";
    
    console.log(mapCanvas.toDataURL("image/png"))
    a.href = mapCanvas.toDataURL("image/png"); //Image Base64 Goes here
    //document.open('<img src="' + a.href + '"/>');
    
    a.click();

    map.renderSync();

}

}
