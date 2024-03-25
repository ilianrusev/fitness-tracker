import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingComponent,
  ],

  imports: [CommonModule, MaterialModule, AngularFirestoreModule, FormsModule],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
