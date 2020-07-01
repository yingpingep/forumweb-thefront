import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidV4 } from 'uuid';
import { StoredService } from '../services/stroed-service';
import { take } from 'rxjs/operators';
import { ManipulateR } from 'src/app/utlis/manipulate-r.service';
import { Question, QuestionMode, StoredData, Status } from 'src/app/models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Partial<Question[]> = [];
  constructor(
    @Inject(StoredService) private ss: StoredData,
    private mr: ManipulateR
  ) {}

  ngOnInit(): void {
    this.ss
      .retrive()
      .pipe(take(1))
      .subscribe((value) => {
        this.questions = value.data;
      });

    this.mr.connectionToHub('https://localhost:5001/controlhub');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addNewQuestion() {
    this.questions.push(this.questionFactory());
  }

  removeQuestion(removeId: string) {
    this.questions = this.questions.filter(
      (question) => question.Id !== removeId
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
      Id: uuidV4(),
      Number: '',
      Title: '',
      Mode: QuestionMode.Single,
      AnswerOptions: [],
    };
  }
}
