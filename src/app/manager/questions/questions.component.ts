import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidV4 } from 'uuid';
import { take } from 'rxjs/operators';
import {
  Question,
  QuestionMode,
  DataStoaredService,
  Status,
  DisableButton,
} from 'src/app/models';
import { ManagerR } from '../../utlis/manager-r.service';
import { disableBtnObjFactory } from './disable-button-helper';
import * as R from 'ramda';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Partial<Question[]> = [];
  disableSendBtn: DisableButton = {
    disable: true,
  };
  doesQuestionSend = false;
  private storedQuestions = [];
  constructor(private ss: DataStoaredService, private mr: ManagerR) {}

  ngOnInit(): void {
    this.ss
      .retrive()
      .pipe(take(1))
      .subscribe((value) => {
        this.questions = value.data;
        this.storedQuestions = R.clone(this.questions);
        this.disableSendBtn = disableBtnObjFactory(
          value.status === Status.Ok ? false : true
        );
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.questions.forEach((q, index) => {
      q.number = (index + 1).toString();
    });
    this.disableSendBtn = disableBtnObjFactory();
  }

  addNewQuestion() {
    this.questions.push(this.questionFactory());
    this.disableSendBtn = disableBtnObjFactory();
  }

  removeQuestion(removeId: string) {
    this.questions = this.questions.filter(
      (question) => question.id !== removeId
    );
    this.disableSendBtn = disableBtnObjFactory();
  }

  saveQuestions() {
    this.ss
      .prepareAndSave(this.questions)
      .pipe(take(1))
      .subscribe((v) => {
        this.storedQuestions = R.clone(this.questions);
        this.disableSendBtn = disableBtnObjFactory(
          v.status === Status.Ok ? false : true
        );
      });
  }

  send(questionData: Question) {
    this.mr.sendQuestion(questionData).subscribe((_) => {
      this.doesQuestionSend = true;
      this.disableSendBtn = disableBtnObjFactory(true);
    });
  }

  close() {
    this.mr.closeQuestion().subscribe((_) => {
      const shouldDisable = !R.equals(this.questions, this.storedQuestions);
      this.disableSendBtn = disableBtnObjFactory(shouldDisable);
      this.doesQuestionSend = false;
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
