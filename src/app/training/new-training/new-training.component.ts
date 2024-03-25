import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import { getIsLoading } from 'src/app/app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
