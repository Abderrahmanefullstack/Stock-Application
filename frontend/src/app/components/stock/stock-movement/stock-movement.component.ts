import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { StockService } from '../../../services/stock.service';
import { Movement } from '../../../models/movement';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.css']
})
export class StockMovementComponent implements OnInit {
  movementForm: FormGroup;
  products: Product[] = [];
  movementTypes = [
    { value: 'entree', viewValue: 'Entrée' },
    { value: 'sortie', viewValue: 'Sortie' }
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private stockService: StockService,
    private snackBar: MatSnackBar
  ) {
    this.movementForm = this.fb.group({
      produitId: ['', Validators.required],
      type: ['entree', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.snackBar.open('Erreur lors du chargement des produits', 'Fermer', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.movementForm.valid) {
      const movement: Movement = this.movementForm.value;
      let observable;

      if (movement.type === 'entree') {
        observable = this.stockService.addStockEntry(movement);
      } else {
        observable = this.stockService.addStockExit(movement);
      }

      observable.subscribe({
        next: () => {
          this.snackBar.open('Mouvement enregistré', 'Fermer', { duration: 3000 });
          this.movementForm.reset({
            type: 'entree',
            quantite: 1,
            date: new Date()
          });
        },
        error: (err) => {
          this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}