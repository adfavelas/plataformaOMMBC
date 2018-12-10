import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
      $('.fixed-action-btn').floatingActionButton();
      $('.tooltipped').tooltip();
      $('.modal').modal();
    });
  }

}
