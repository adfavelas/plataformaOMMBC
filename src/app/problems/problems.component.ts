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
    area;
    topic;
    level;
    constructor(private problemService: ProblemService, private router: Router) { }

    ngOnInit() {
        this.problemService.getProblems(null).subscribe(res => {
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

    queryArea(area: HTMLInputElement) {
        console.log(area.value);
        this.area = area.value;
        let query = `?area=${this.area}`;
        if (this.topic  && this.level) {
            query += `&topic=${this.topic}&level=${this.level}`;
        } else if (this.topic) {
            query += `&topic=${this.topic}`;
        } else if (this.topic) {
            query += `&level=${this.level}`;
        }

        this.problemService.getProblems(query).subscribe(res => {
            this.problems = res.problems;
        });
    }

    querytopic(topic: HTMLInputElement) {
        this.topic = topic.value;
        let query = `?topic=${this.topic}`;
        if (this.area  && this.level) {
            query += `&area=${this.area}&level=${this.level}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else if (this.area) {
            query += `&area=${this.area}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else if (this.level) {
            query += `&level=${this.level}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else {
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        }
    }

    queryLevel(level: HTMLInputElement) {
        this.level = level.value;
        let query = `?level=${this.level}`;
        console.log(this.level);
        if (this.area  && this.topic) {
            query += `&area=${this.area}&topic=${this.topic}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else if (this.area) {
            query += `&area=${this.area}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else if (this.area) {
            query += `&level=${this.level}`;
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        } else {
            this.problemService.getProblems(query).subscribe(res => {
                this.problems = res.problems;
            });
        }
    }
}
