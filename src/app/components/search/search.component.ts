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
  displayedColumns: string[] = ['Image', 'Artist', 'Trackname', "DetailsUrl"]
  private searchFilterSubject = new Subject<string>();
  showFilterText = true;
  showSearchingText = false;

  readonly musicList$ = this.searchFilterSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(filter =>  {
      let data = this.musicService.getMusic(filter);
      this.showSearchingText = false;
      return data;
    })
  );

  constructor(private musicService: MusicService) {

  }

  searchMusic(filter: string) {
    console.log(filter);
    if (filter != "") {
      this.showFilterText = false;
      this.showSearchingText = true;
    } else {
      this.showFilterText = true;
    }
    this.searchFilterSubject.next(filter);
  }

}
