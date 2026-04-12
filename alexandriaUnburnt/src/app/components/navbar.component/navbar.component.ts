import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  title = 'Alexandria Unburnt';

  constructor(public cartService: CartService) {}
}
