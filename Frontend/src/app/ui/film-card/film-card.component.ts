import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Reviews } from 'src/assets/json-objects/IReviews';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReviewEditorDialogComponent } from './review-editor-dialog/review-editor-dialog.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  
 
  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
  }

  openReviews(movieID: number) {
    this.api.getReviewsByMovieId(movieID).subscribe({
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
