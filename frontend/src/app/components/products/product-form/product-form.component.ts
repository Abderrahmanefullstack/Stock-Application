import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.isEdit = !!data;
    this.productForm = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      description: [data?.description || ''],
      prix: [data?.prix || 0, [Validators.required, Validators.min(0)]],
      categorie: [data?.categorie || '']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      let observable: Observable<Product>;

      if (this.isEdit) {
        observable = this.productService.updateProduct(this.data._id!, product);
      } else {
        observable = this.productService.createProduct(product);
      }

      observable.subscribe({
        next: () => {
          this.snackBar.open('Produit enregistré', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}