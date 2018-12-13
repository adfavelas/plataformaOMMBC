import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {
  questions;
  replyError;
  questionError;
  questionForm: FormGroup;
  replyForm: FormGroup;

  constructor(private forumService: ForumService ) { }

  ngOnInit() {
    this.initQuestionForm();
    this.initReplyForm();
    $(document).ready(function() {
      $('.collapsible').collapsible();
      $('.fixed-action-btn').floatingActionButton();
      $('.tooltipped').tooltip();
      $('.modal').modal({ dismissible: false });
    });

    this.getForumQuestions();

  }

  initQuestionForm(): void {
    this.questionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      question: new FormControl(null, Validators.required)
    });
  }

  initReplyForm(): void {
    this.replyForm = new FormGroup({
      reply: new FormControl(null, Validators.required)
    });
  }

  getForumQuestions(): void {
    this.forumService.getForumQuesiions().subscribe( res => {
      if (res.errorCode === 0) {
        this.questions = res.forumQuestions;
      }
    });
  }

  buildQuestion(): Object {
    return {
      title: this.questionForm.controls.title.value,
      question: this.questionForm.controls.question.value
    };
  }

  buildReply(questionId: string): Object {
    return {
      questionId: questionId,
      reply: this.replyForm.controls.reply.value
    };
  }

  createQuestion(): void {
    const newQuestion = this.buildQuestion();
    this.forumService.createForumQuestion(newQuestion).subscribe(res => {
      if (res.errorCode === 0) {
        this.getForumQuestions();
        this.questionForm.reset();
        $('#forumQuestionModal').modal('close');
      } else {
        this.questionError = res.message;
      }
    });
  }

  createReply(questionId: string): void {
    const newReply = this.buildReply(questionId);
    this.forumService.createForumReply(newReply).subscribe(res => {
      if (res.errorCode === 0) {
        this.getForumQuestions();
        this.replyForm.reset();
      } else {
        this.replyError = res.message;
      }
    });
  }

}
