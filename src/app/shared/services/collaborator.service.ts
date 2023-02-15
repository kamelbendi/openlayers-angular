import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/messages.service';
import { Collaborator } from 'src/app/shared/popup/popup/models/collaborator.model';

@Injectable({ providedIn: 'root' })
export class CollaboratorService {
  private collaboratorsUrl = 'api/collaborators'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET heroes from the server */
  getCollaborators(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(this.collaboratorsUrl).pipe(
      tap((_) => this.log('fetched collaborators')),
      catchError(this.handleError<Collaborator[]>('getCollaborators', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCollaboratorNo404<Data>(id: number): Observable<Collaborator> {
    const url = `${this.collaboratorsUrl}/?id=${id}`;
    return this.http.get<Collaborator[]>(url).pipe(
      map((collaborators) => collaborators[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} collaborator id=${id}`);
      }),
      catchError(this.handleError<Collaborator>(`getCollaborator id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getCollaborator(id: number): Observable<Collaborator> {
    const url = `${this.collaboratorsUrl}/${id}`;
    return this.http.get<Collaborator>(url).pipe(
      tap((_) => this.log(`fetched collaborator id=${id}`)),
      catchError(this.handleError<Collaborator>(`getCollaborator id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Collaborator[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Collaborator[]>(`${this.collaboratorsUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found collaborators matching "${term}"`)
            : this.log(`no collaborators matching "${term}"`)
        ),
        catchError(this.handleError<Collaborator[]>('searchCollaborators', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCollaborator(collaborator: Collaborator): Observable<Collaborator> {
    
    return this.http
      .post<Collaborator>(this.collaboratorsUrl, collaborator, this.httpOptions)
      .pipe(
        tap((newCollaborator: Collaborator) =>
          this.log(`added hero w/ id=${newCollaborator.id}`)
        ),
        catchError(this.handleError<Collaborator>('addCollaborator'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteCollaborator(id: number): Observable<Collaborator> {
    const url = `${this.collaboratorsUrl}/${id}`;

    return this.http.delete<Collaborator>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted collaborator id=${id}`)),
      catchError(this.handleError<Collaborator>('deleteCollaborator'))
    );
  }

  /** PUT: update the hero on the server */
  updateCollaborator(collaborator: Collaborator): Observable<any> {
    return this.http
      .put(this.collaboratorsUrl, collaborator, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated collaborator id=${collaborator.id}`)),
        catchError(this.handleError<any>('updateCollaborator'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CollaboratorService: ${message}`);
  }
}
