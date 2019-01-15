import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProblemService } from '../../services/problem.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.sass']
})
export class ProblemsComponent implements OnInit {
    @ViewChild('area') areaRef: ElementRef;
    problems;

    constructor(private problemService: ProblemService, private router: Router) { }

    ngOnInit() {
        // $(document).ready(function() {
        //     const primaryColorLight = '#0767A4';
        // });
        this.problemService.getProblems(null).subscribe(res => {
            if (res.errorCode === 3) {
                this.router.navigate(['']);
            }
            if (res.errorCode === 0) {
                this.problems = res.problems;
                $('select').formSelect();
                const secondaryColor = '#0693BE';
                $('.dropdown-content li:not(.disabled) > a, .dropdown-content li:not(.disabled) > span').css('color', secondaryColor);
            }
        });
    }

    viewProblem(problemId) {
        console.log(problemId);
        this.router.navigate([`problem/${problemId}`]);

    }

    queryProblems(area: HTMLInputElement, topic: HTMLInputElement, level: HTMLInputElement) {
        const query = `?area=${area.value}&topic=${topic.value}&level=${level.value}`;

        this.problemService.getProblems(query).subscribe(res => {
            this.problems = res.problems;
        });
    }


    resetFilters() {
        $('select').val('null');
        $('select').formSelect();
        this.problemService.getProblems(null).subscribe( res => {
            this.problems = res.problems;
        });
    }
}
