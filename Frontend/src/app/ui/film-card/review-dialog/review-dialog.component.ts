import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reviews } from 'src/assets/json-objects/IReviews';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  reviews: Reviews | undefined;
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) data: Reviews, private dialogRef: MatDialogRef<ReviewDialogComponent>, private fb: FormBuilder) {
    this.reviews = data;
  }

  getStarString(stars: number): string {
    let str: string = "";
    for (let i = 0; i < stars; i++) str += "⭑";
    for (let i = 5 - stars; i > 0; i--) str += "✩";
    return str;
  }

  getStarStringAvg(reviews: Reviews): string {
    let avgStars: number;
    for (let i = 0; i < reviews.length; i++) {
      if (i === 0) avgStars = reviews[i].rating;
      else {
        avgStars! += reviews[i].rating;
        avgStars! = avgStars! / 2;
      }
    }
    return this.getStarString(Math.floor(avgStars!));
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
