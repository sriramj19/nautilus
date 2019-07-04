import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import Directory from '../../util/mock/directory-list.json';
import { Folder } from './folder';

@Injectable()
export class LayoutService {

  constructor(private http: HttpClient) { }

  public getInitialDirectory(): Observable<Folder> {
    return of<Folder>(Directory);
  }
}
