import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-sideTab',
  templateUrl: './sideTab.component.html',
  styleUrls: ['./sideTab.component.css'],
  imports:[RouterLink,NgClass]
})
export class SideTabComponent implements OnInit {
  activeLink = 'Insights';
  constructor() { }
  ngOnInit() {
  }
setActive(link: string) {
  this.activeLink = link;
}
}
