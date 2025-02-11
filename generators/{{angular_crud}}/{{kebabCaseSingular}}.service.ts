import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { {{classCaseSingular}}Interface } from './{{kebabCaseSingular}}.interface';
import {
  PaginatedRequestInterface,
  PaginatedResponse,
} from './paginated.interface';
@Injectable({
  providedIn: 'root',
})
export class {{classCaseSingular}}Service {
  private readonly urlBase = environment.url; // change this urlBase to you url api
  private readonly route = '{{kebabCasePlural}}';

  constructor(private http: HttpClient) {}

  getOne(id: string | number): Observable<{{classCaseSingular}}Interface> {
    return this.http.get<{{classCaseSingular}}Interface>(
      `${this.urlBase}/${this.route}/${id}`
    );
  }

  getAll(): Observable<{{classCaseSingular}}Interface[]> {
    return this.http.get<{{classCaseSingular}}Interface[]>(`${this.urlBase}/${this.route}`);
  }

  getPaginated(
    paginatedRequest: PaginatedRequestInterface
  ): Observable<PaginatedResponse<{{classCaseSingular}}Interface>> {
    const params = new HttpParams({ fromObject: paginatedRequest });
    return this.http.get<PaginatedResponse<{{classCaseSingular}}Interface>>(
      `${this.urlBase}/${this.route}/paginated`,
      { params }
    );
  }

  create({{camelCaseSingular}}: {{classCaseSingular}}Interface): Observable<{{classCaseSingular}}Interface> {
    return this.http.post<{{classCaseSingular}}Interface>(
      `${this.urlBase}/${this.route}`,
      {{camelCaseSingular}}
    );
  }

  update(
    id: string | number,
    {{camelCaseSingular}}: {{classCaseSingular}}Interface
  ): Observable<{{classCaseSingular}}Interface> {
    return this.http.patch<{{classCaseSingular}}Interface>(
      `${this.urlBase}/${this.route}/${id}`,
      {{camelCaseSingular}}
    );
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${this.route}/${id}`);
  }
}
