import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {
  questions;
  error;
  form: FormGroup;
  constructor(private forumService: ForumService ) { }

  ngOnInit() {
    this.initForm();
    $(document).ready(function() {
      $('.collapsible').collapsible();
      $('.fixed-action-btn').floatingActionButton();
      $('.tooltipped').tooltip();
      $('.modal').modal({ dismissible: false });
    });

    this.getForumQuestions();

  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(Validators.required),
      question: new FormControl(Validators.required)
    });
  }

  getForumQuestions(): void {
    this.forumService.getForumQuesiions().subscribe( res => {
      if (res.errorCode === 0) {
        this.questions = res.forumQuestions;
      }
    });
  }

  buildQuestions(): object {
    const newQuestion = {
      title: this.form.controls.title.value,
      question: this.form.controls.question.value,
    };
    return newQuestion;
  }

  createQuestion(): void {
    const newQuestion = this.buildQuestion();
    this.forumService.createForumQuestion(newQuestion).subscribe(res => {
      if (res.errorCode === 0) {
        this.getForumQuestions();
        $('#forumQuestionModal').modal('close');
      } else {
        this.error = res.message;
      }
    });
  }

}
