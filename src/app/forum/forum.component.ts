import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';

declare let $: any;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {
  questions;
  constructor(private forumService: ForumService ) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
      $('.fixed-action-btn').floatingActionButton();
      $('.tooltipped').tooltip();
      $('.modal').modal();
    });

    this.forumService.getForumQuesiions().subscribe( res => {
      console.log(res);
    });

}

}
