import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() tainingStart = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onStartTraining() {
    this.tainingStart.emit();
  }
}
