import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

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
  userEmail;
  constructor(private forumService: ForumService, private profileService: ProfileService, private authService: AuthService ) { }

  ngOnInit() {
    this.initQuestionForm();
    this.initReplyForm();
    this.userEmail = this.authService.verifyToken(sessionStorage.getItem('token'));
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

  createReply(question): void {
    const newReply = this.buildReply(question._id);
    this.forumService.createForumReply(newReply).subscribe(res => {
      if (res.errorCode === 0) {
        this.addReply(newReply, question);
      } else {
        this.replyError = res.message;
      }
      this.replyForm.reset();
    });
  }

  addReply(newReply, question) {
    this.profileService.getUserObject().subscribe( res => {
      console.log(res);
      newReply.date = Date.now();
      newReply.replierName = res.student.name;
      newReply.replierEmail = res.student.email;
      question.replies.push(newReply);

    });
  }

}
