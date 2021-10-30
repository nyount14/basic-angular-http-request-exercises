import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-angular-http-request-exercises';
  myMovies = [];


  constructor(private http: HttpClient){

  }

  onSubmit(form){
    console.log(form)
    this.sendData(form.value)
    };

  sendData(createdMovie: {title: string; genre: string }){
    this.http.post('https://movies-project-8b820-default-rtdb.firebaseio.com/movies.json',
    createdMovie
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }
  onRecieveMovies(){
    this.http.get('https://movies-project-8b820-default-rtdb.firebaseio.com/movies.json')
    .pipe(map(responseData => {
      const myMovies = [];
      for(const elem in responseData){
        myMovies.push(responseData[elem]);
      }
      return myMovies;
    })).subscribe(stuff => {
      this.myMovies = stuff
      ;
    })
  }

}

