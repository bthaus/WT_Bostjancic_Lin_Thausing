import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataApiService } from 'src/app/api/data-api.service';
import { Film } from 'src/assets/json-objects/IFilm';

@Component({
  selector: 'app-movie-date-picker',
  templateUrl: './movie-date-picker.component.html',
  styleUrls: ['./movie-date-picker.component.scss']
})
export class MovieDatePickerComponent implements OnInit {
  @Input() dates: Date[] | undefined;
  @Output() dateEmitter = new EventEmitter<{ hallID: number, movieID: number, date: Date }>();
  @Input() hallAndMovie: { hallID: number, movieID: number } | undefined;

  constructor(private service: DataApiService) { }

  ngOnInit(): void {
  }

  dateSet(date: Date) {
    this.dateEmitter.emit({ hallID: this.hallAndMovie!.hallID, movieID: this.hallAndMovie!.movieID, date: date });
  }
}
