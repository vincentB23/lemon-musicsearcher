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
  data;

  constructor(private musicService: MusicService) {
    this.searchFilterSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
    ).subscribe(filter => {
        this.musicService.getMusic(filter).subscribe(data => {
        this.showSearchingText = false;
        this.data = data['results'];
      });
    })
  }

  ngOnInit() {
    let filterFromService = this.musicService.getFilter();
    
    if (filterFromService != "") {
      this.showFilterText = false;
      this.searchFilterSubject.next(filterFromService);
    }
  }
  

  searchMusic(filter: string) {
    if (filter != "") {
      this.showFilterText = false;
      this.showSearchingText = true;
    } else {
      this.showFilterText = true;
    }
    this.searchFilterSubject.next(filter);
  }

}
