import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'app-stock-alert',
  templateUrl: './stock-alert.component.html',
  styleUrls: ['./stock-alert.component.css']
})
export class StockAlertComponent implements OnInit {
  alerts: any[] = [];
  displayedColumns: string[] = ['produit', 'quantite', 'seuilAlert'];

  constructor(
    private stockService: StockService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.stockService.getStockAlerts().subscribe({
      next: (alerts) => {
        this.alerts = alerts;
      },
      error: (err) => {
        this.snackBar.open('Erreur lors du chargement des alertes', 'Fermer', { duration: 3000 });
      }
    });
  }
}