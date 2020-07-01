import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidV4 } from 'uuid';
import { StoredService } from '../services/stroed-service';
import { take } from 'rxjs/operators';
import { Question, QuestionMode, StoredData, Status } from 'src/app/models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Partial<Question[]> = [];
  constructor(@Inject(StoredService) private ss: StoredData) {}

  ngOnInit(): void {
    this.ss
      .retrive()
      .pipe(take(1))
      .subscribe((value) => {
        this.questions = value.data;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.questions.forEach((q, index) => {
      q.number = (index + 1).toString();
    });
  }

  addNewQuestion() {
    this.questions.push(this.questionFactory());
  }

  removeQuestion(removeId: string) {
    this.questions = this.questions.filter(
      (question) => question.id !== removeId
    );
  }

  saveQuestions() {
    this.ss
      .prepareAndSave(this.questions)
      .pipe(take(1))
      .subscribe((v) => {
        console.log(Status[v.status]);
      });
  }

  private questionFactory(): Question {
    return {
      id: uuidV4(),
      number: '',
      title: '',
      mode: QuestionMode.Single,
      answerOptions: [],
    };
  }
}
