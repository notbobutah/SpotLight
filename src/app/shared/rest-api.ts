import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://127.0.0.1:8080/api/v1';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch NodeModels list
  getNodeModels(): Observable<NodeModel[]> {
      console.log("Calling JSON server")
    return this.http.get<NodeModel[]>(this.apiURL + '/node')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch NodeModel
  getNodeModel(id): Observable<NodeModel> {
    return this.http.get<NodeModel>(this.apiURL + '/node/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create NodeModel
  createNodeModel(nodeModel): Observable<NodeModel> {
    return this.http.post<NodeModel>(this.apiURL + '/nodes', JSON.stringify(nodeModel), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update NodeModel
  updateNodeModel(id, nodeModel): Observable<NodeModel> {
    return this.http.put<NodeModel>(this.apiURL + '/nodes/' + id, JSON.stringify(nodeModel), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete NodeModel
  deleteNodeModel(id){
    return this.http.delete<NodeModel>(this.apiURL + '/nodes/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
/////////////////////////
    // HttpClient API get() method => Fetch NodeModels list
    getConnectionModels(): Observable<ConnectorModel[]> {
        console.log("Calling JSON server")
      return this.http.get<ConnectorModel[]>(this.apiURL + '/connector')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // HttpClient API get() method => Fetch NodeModel
    getConnectionModel(id): Observable<ConnectorModel> {
      return this.http.get<ConnectorModel>(this.apiURL + '/connector/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  
  
    // HttpClient API post() method => Create NodeModel
    createConnectionModel(connModel): Observable<ConnectorModel> {
      return this.http.post<ConnectorModel>(this.apiURL + '/nodes', JSON.stringify(connModel), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  
  
    // HttpClient API put() method => Update NodeModel
    updateConnectionModel(id, connModel): Observable<ConnectorModel> {
      return this.http.put<ConnectorModel>(this.apiURL + '/connectors/' + id, JSON.stringify(connModel), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // HttpClient API delete() method => Delete NodeModel
    deleteConnectionModel(id){
      return this.http.delete<ConnectorModel>(this.apiURL + '/connectors/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}