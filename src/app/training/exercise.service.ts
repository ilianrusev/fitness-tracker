import { Subscription, map, take } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../shared/ui.reducer';
import * as fromTraining from './training.reducer';

@Injectable()
export class ExerciseService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  getAvailableExercises() {
    this.store.dispatch(startLoading());
    this.fbSubs.push(
      this.db
        .collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArr) => {
            return docArr.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                calories: doc.payload.doc.data().calories,
                duration: doc.payload.doc.data().duration,
              };
            });
          })
        )
        .subscribe({
          next: (exercises: Exercise[]) => {
            this.store.dispatch(stopLoading());
            this.store.dispatch(
              fromTraining.setAvailableTrainings({ payload: exercises })
            );
          },
          error: (error) => {
            this.store.dispatch(stopLoading());

            this.uiService.showSnackbar(
              'Fetching Exercises failed, please try again later',
              3000
            );
            this.store.dispatch(
              fromTraining.setAvailableTrainings({ payload: [] })
            );
          },
        })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(fromTraining.startTraining({ payload: selectedId }));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex: Exercise) => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(fromTraining.stopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex: Exercise) => {
        this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(fromTraining.stopTraining());
      });
  }

  getCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any) => {
          this.store.dispatch(
            fromTraining.setFinishedTrainings({ payload: exercises })
          );
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((subscription) => subscription.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
