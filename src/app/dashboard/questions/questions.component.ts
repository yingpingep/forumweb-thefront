import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  questions: Partial<Question[]> = [ ];
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addNewQuestion() {
    this.questions.push(this._questionFactory());
  }

  removeQuestion(removeId: string) {
    this.questions = this.questions.filter(question => question.id !== removeId);
  }

  private _questionFactory(): Question {
    return {
      id: uuidV4(),
      title: '',
      mode: 'single',
      options: []
    };
  }
}
