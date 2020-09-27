import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MusicItem } from './../model/MusicItem';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MusicService {
    private ITUNES_URL = "https://itunes.apple.com";
    data;
    filter = "";

    constructor(private http: HttpClient) {

    }

    getMusicWithId(trackId: string) {
        if (this.data == undefined) {
            return null;
        }
        let musicItem;
        this.data.forEach(element => {
            if (element.trackId == trackId) {
                musicItem = element;
            }
        });
        return musicItem;
    }

    getMusic(filter: string): Observable<MusicItem[]> {
        this.filter = filter;
        let temp = this.http.get<MusicItem[]>(this.ITUNES_URL + `/search?term=${filter}&limit=10`).pipe();
        temp.subscribe(results => {
            this.data = results['results'];
        });
        return temp;
    }

    getFilter() {
        return this.filter;
    }
}