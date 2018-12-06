import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from '../problem.service';

declare var $: any;
declare var M: any;
declare var MathJax: any;

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.sass']
})
export class ProblemComponent implements OnInit {
        uploading = false;
        serverResponse = null;
        error = null;
        problemId: String;
        problem;
        empty = true;
        clicked = false;

        constructor(private activatedRoute: ActivatedRoute, private problemService: ProblemService) {
        this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
            this.problemId = paramMap.get('id');
        });
    }

    ngOnInit() {
        this.problemService.getProblemById(this.problemId).subscribe( res => {
           if (res.errorCode === 0) {
               this.problem = res.problem;
           }
        });

        $('.modal').modal({ dismissible: false });
        $('.tabs').tabs();
        $('.tabs .indicator').css('background-color', 'rgb(7,103,164)');
    }

    submitProblem(answerInput: HTMLInputElement) {
        this.error = null;
        const answer = answerInput.value;
        this.clicked = true;

        const modalInstance = M.Modal.getInstance($('#submitModal'));
        if ( answer )  {
            this.uploading = true;
            modalInstance.open();
            this.empty = false;
            const body = {
                problemId: this.problemId,
                answer: answerInput.value,
            };
            this.problemService.submitProblem(body).subscribe( res => {
                if (res.errorCode === 0) {
                    this.uploading = false;
                    answerInput.value = '';
                    modalInstance.open();
                } else {
                    this.uploading = false;
                    modalInstance.open();
                }
                console.log(res);
            });
        } else {
            this.error = 'La respuesta no puede estar vacía. Por favor envía una respuesta válida.';
            this.empty = true;
            return;
        }
    }

    preview(area: HTMLInputElement) {
        $('#preview').text(area.value);
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'preview']);
    }
}
