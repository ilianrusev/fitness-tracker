import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, duration: number, action?: any) {
    this.snackbar.open(message, action ? action : undefined, {
      duration: duration,
    });
  }
}
