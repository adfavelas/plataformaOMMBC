import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.sass']
})
export class ProblemsComponent implements OnInit {
    problems;
    constructor(private problemService: ProblemService, private router: Router) { }

    ngOnInit() {
        this.problemService.getProblems().subscribe(res => {
            if (res.message === 'Success' && res.problems) {
                console.log(res);
                this.problems = res.problems;
            }
        });
        $(document).ready(function() {
            const primaryColorLight = '#0767A4';
            const secondaryColor = '#0693BE';

            $('select').formSelect();
            $('.dropdown-content li:not(.disabled) > a, .dropdown-content li:not(.disabled) > span').css('color', secondaryColor);
        });
    }

    viewProblem(problemId) {
        console.log(problemId);
        this.router.navigate([`problem/${problemId}`]);

    }

}
