import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { ExerciseService } from '../exercise.service';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { take } from 'rxjs';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        const step = (exercise.duration! / 100) * 1000;

        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.exerciseService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exerciseService.cancelExercise(this.progress);
      } else {
        this.startTimer();
      }
    });
  }
}
