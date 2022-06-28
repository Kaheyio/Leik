import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  // User collection
  baseUrl = 'http://localhost:3000/api/user';


  constructor(private http: HttpClient) { }

  getTypeRequest(url: any) {
    return this.http.get(`${this.baseUrl}${url}`, { withCredentials : true }).pipe(map(res => {
      return res;
    }));
  };

  // for login
  postTypeRequest(url: any, payload: any) {
    // add withCredentials : true to get cookie from server in browser storage
    return this.http.post(`${this.baseUrl}${url}`, payload, { withCredentials : true }).pipe(map(res => {
      return res;
    }));
  };


  putTypeRequest(url: any, payload: any) {
    return this.http.put(`${this.baseUrl}${url}`, payload, { withCredentials : true }).pipe(map(res => {
      return res;
    }));
  };

  deleteTypeRequest(url: any) {
    return this.http.delete(`${this.baseUrl}${url}`, { withCredentials : true }).pipe(map(res => {
      return res;
    }));
  };


}
