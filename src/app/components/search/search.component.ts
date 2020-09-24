import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private searchFilterSubject = new Subject<string>();

/*   readonly musicList$ = this.searchFilterSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(filter => this.musicService.getMusic(filter))
  ).subscribe(
    data => {
      return data['results'];
    }
  ); */

  readonly musicList$ = this.searchFilterSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(filter => this.musicService.getMusic(filter))
  );

  //musicList;
  showMessageTypeFilter = true;

  constructor(private musicService: MusicService) {

  }

/*   ngOnInit() {
    this.musicService.getMusic("madonna").subscribe(
      data => {
        this.musicList = data['results'];
        console.log(this.musicList);
      }
    )
  } */

  searchMusic(filter: string) {
    console.log(filter);
    this.searchFilterSubject.next(filter);
  }

}
