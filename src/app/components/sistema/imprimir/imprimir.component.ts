import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  factura = 23

  VIDEOGAMES = [
    {
      id : 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference : "1-770-736-8031"
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323"
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334"
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532"
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245"
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321"
    }
  ];

  constructor() {
  }
  
  ngOnInit(): void {
  }

  printer() {
    const printContent = document.getElementById("print");
    var ventana = window.open('', 'PRINT', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('<link rel="stylesheet" href="./imprimir.component.css">'); //Aquí agregué la hoja de estilos
  ventana.document.write('</head><body >');
  ventana.document.write(printContent.innerHTML);
  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.focus();
  ventana.onload = function() {
    ventana.print();
    ventana.close();
  };
  return true;
// *************************************
    // const printContent = document.getElementById("print");
    // const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
// *************************************
    // let printContents = document.getElementById("print").innerHTML;
    //  let originalContents = document.body.innerHTML;

    //  document.body.innerHTML = printContents;

    //  window.print();

    //  document.body.innerHTML = originalContents;
  }

  public downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
