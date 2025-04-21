import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideTabComponent } from "./tabs/sideTab/sideTab.component";
import { HeaderComponent } from './tabs/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SideTabComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ITraceUTask';
}
