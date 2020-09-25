import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private musicItem;

  constructor(
    private musicService: MusicService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.musicItem = this.musicService.getMusicWithId(params.get('trackId'));
      if (this.musicItem == null) {
        this.router.navigate(['']);
      }
    })
  }

}
