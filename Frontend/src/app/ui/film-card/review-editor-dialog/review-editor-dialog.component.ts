import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataApiService } from 'src/app/api/data-api.service';
import { Globals } from 'src/assets/Globals';

@Component({
  selector: 'app-review-editor-dialog',
  templateUrl: './review-editor-dialog.component.html',
  styleUrls: ['./review-editor-dialog.component.scss']
})
export class ReviewEditorDialogComponent implements OnInit {

  stars: number | undefined;
  movieID: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) data: number, public dialogRef: MatDialogRef<any>, private service: DataApiService) {
    this.movieID = data;
  }
  ngOnInit() {
    this.dialogRef.updateSize('40%', '60%');
  }

  submitReview(reviewText: string) {
    this.service.postReview(this.movieID!, reviewText, this.stars!, Globals.Username);
  }

  test(event: any) {
    this.stars = (event.rating as number);
  }
}
