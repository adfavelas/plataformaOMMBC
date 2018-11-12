import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

declare var $: any;

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.sass']
})
export class ProblemsComponent implements OnInit {
    problems;
    constructor(private problemService: ProblemService) { }

    ngOnInit() {
        this.problemService.getProblems().subscribe(res => {
            if (res.message === 'Success' && res.problems) {
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

}
