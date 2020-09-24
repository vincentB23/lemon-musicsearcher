import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MusicItem } from './../model/MusicItem';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MusicService {
private ITUNES_URL = "https://itunes.apple.com";

    constructor(private http: HttpClient) {

    }

    getMusic(filter: string): Observable<MusicItem[]> {
        console.log('requesting music');
        return this.http.get<MusicItem[]>(this.ITUNES_URL + `/search?term=${filter}&limit=10`).pipe(
            catchError(err => of([]))
        );
    }
}