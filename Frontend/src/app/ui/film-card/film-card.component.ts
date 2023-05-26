import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataApiService } from 'src/app/api/data-api.service';
import { Film } from 'src/assets/json-objects/IFilm';
import { Reviews } from 'src/assets/json-objects/IReviews';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReviewEditorDialogComponent } from './review-editor-dialog/review-editor-dialog.component';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input()
  film: Film | undefined;

  constructor(public dialog: MatDialog, private service: DataApiService) { }

  ngOnInit(): void {
  }

  openReviews(movieID: number) {
    this.service.getReviewsByMovieId(movieID).subscribe({
      next: (reviews: Reviews) => {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        dialogConfig.data = reviews.filter(review => review.movieID === movieID);

        const dialogRef = this.dialog.open(ReviewDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
          data => console.log("Dialog output:", data)
        );
      },
      error: err => console.error(err)
    });
  }

  openReviewEditor(movieID: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = movieID;

    const dialogRef = this.dialog.open(ReviewEditorDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }
}
