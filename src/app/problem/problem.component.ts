import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from '../problem.service';
import { reserveSlots } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.sass']
})
export class ProblemComponent implements OnInit {
        problemId: String;
        problem;
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
    }


}
