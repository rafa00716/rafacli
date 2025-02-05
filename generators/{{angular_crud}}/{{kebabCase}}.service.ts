import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { {{classCase}}Interface } from './{{kebabCase}}.interface';
import {
  PaginatedRequestInterface,
  PaginatedResponse,
} from './paginated.interface';
@Injectable({
  providedIn: 'root',
})
export class {{classCase}}Service {
  private readonly urlBase = environment.url; // change this urlBase to you url api
  private readonly route = '{{camelCase}}';

  constructor(private http: HttpClient) {}

  getOne(id: string | number): Observable<{{classCase}}Interface> {
    return this.http.get<{{classCase}}Interface>(
      `${this.urlBase}/${this.route}/${id}`
    );
  }

  getAll(): Observable<{{classCase}}Interface[]> {
    return this.http.get<{{classCase}}Interface[]>(`${this.urlBase}/${this.route}`);
  }

  getPaginated(
    paginatedRequest: PaginatedRequestInterface
  ): Observable<PaginatedResponse<{{classCase}}Interface>> {
    const params = new HttpParams({ fromObject: paginatedRequest });
    return this.http.get<PaginatedResponse<{{classCase}}Interface>>(
      `${this.urlBase}/${this.route}/paginated`,
      { params }
    );
  }

  create({{camelCase}}: {{classCase}}Interface): Observable<{{classCase}}Interface> {
    return this.http.post<{{classCase}}Interface>(
      `${this.urlBase}/${this.route}`,
      {{camelCase}}
    );
  }

  update(
    id: string | number,
    {{camelCase}}: {{classCase}}Interface
  ): Observable<{{classCase}}Interface> {
    return this.http.patch<{{classCase}}Interface>(
      `${this.urlBase}/${this.route}/${id}`,
      {{camelCase}}
    );
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${this.route}/${id}`);
  }
}
