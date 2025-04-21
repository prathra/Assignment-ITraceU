import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FirstTabComponent } from '../firstTab/firstTab.component';
import { CommonModule } from '@angular/common';
import { SecondTabComponent } from '../secondTab/secondTab.component';
import { ThirdTabComponent } from '../thirdTab/thirdTab.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterModule,
    FirstTabComponent,
    SecondTabComponent,
    ThirdTabComponent,
    CommonModule,
  ],
})
export class HeaderComponent {
  showPdfContent = false;
  isExporting = false;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  // Alternative method using browser's print-to-PDF functionality
  printAsPDF() {
    this.showPdfContent = true;
    this.isExporting = true;
    setTimeout(() => {
      try {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
          alert('Please allow pop-ups to generate PDF');
          this.isExporting = false;
          this.showPdfContent = false;
          return;
        }
        const content = this.pdfContent.nativeElement;
        // Generate a complete HTML document
        printWindow.document.open();
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 20mm;
                margin: 0;
              }
              .pdf-header {
                text-align: center;
                margin-bottom: 20px;
              }
              .pdf-header h1 {
                color: #3f51b5;
                margin-bottom: 10px;
              }
              .pdf-header p {
                color: #666;
                font-style: italic;
              }
              .pdf-section {
                margin-bottom: 30px;
              }
              .pdf-section h2 {
                color: #3f51b5;
                padding-bottom: 5px;
                border-bottom: 1px solid #ddd;
                margin-bottom: 15px;
              }
              a {
                color: #0066cc;
                text-decoration: underline;
              }
              hr {
                margin: 30px 0;
                border: 0;
                border-top: 2px dashed #ddd;
              }
              @page {
                size: A4;
                margin: 1cm;
              }
            </style>
          </head>
          <body>
            ${content.innerHTML}
            <script>
              // Wait for images and resources to load
              window.onload = function() {
                // Links open in new tabs
                document.querySelectorAll('a').forEach(function(link) {
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                });
                // Short delay before opening print dialog
                setTimeout(function() {
                  window.print();
                  setTimeout(function() {
                    window.close();
                  }, 500);
                }, 1000);
              };
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      } catch (error) {
        console.error('Error in print PDF:', error);
      } finally {
        setTimeout(() => {
          this.isExporting = false;
          this.showPdfContent = false;
        }, 2000);
      }
    }, 500);
  }
}
