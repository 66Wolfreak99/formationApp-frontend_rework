import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent implements OnInit {

  deleteConfirm: boolean

  constructor(public dialogRef: MatDialogRef<DeleteProjectDialogComponent>) { }

  ngOnInit(): void {
  }

  close(confirmation) {
    this.deleteConfirm = confirmation
    this.dialogRef.close(this.deleteConfirm);
  }

}
