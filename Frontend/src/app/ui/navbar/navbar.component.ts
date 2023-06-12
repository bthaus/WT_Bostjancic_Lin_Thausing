import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/assets/Globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private elRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.elRef.nativeElement.querySelector('h1.title').addEventListener('click', () => {
      this.router.navigateByUrl("/home");
    });
  }

  swap() {
    if (Globals.isAuth()) {
      Globals.logout();
      this.router.navigateByUrl('/home');
    }
  }

  getText(): string {
    if (Globals.isAuth()) {
      return "Logout";
    } else {
      return "Login";
    }
  }
}
