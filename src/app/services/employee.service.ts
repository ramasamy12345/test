import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  constructor(protected http: Http) {
  }

  addEmployee(employee) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8001/api/employee/add", JSON.stringify(employee), {headers: headers}).map(response => response.json());
  }

  public getEmployee(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get("http://localhost:8001/api/employee/get_employee/" + id, {headers: headers}).map(res => res.json());
  }

  public editEmployee(request) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:8001/api/employee/update_employee/" + request.id, JSON.stringify(request.data), {headers: headers}).map(res => res.json());
  }

  public deleteEmployee(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete("http://localhost:8001/api/employee/delete_employee/" + id, {headers: headers}).map(res => res.json());
  }

  public listEmployee(filterArray) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8001/api/employee/list", JSON.stringify(filterArray), {headers: headers}).map(res => res.json());
  }
}
