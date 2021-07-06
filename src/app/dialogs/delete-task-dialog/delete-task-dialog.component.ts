import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent implements OnInit {

  deleteConfirm: boolean

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  close(confirmation) {
    this.deleteConfirm = confirmation
    this.dialogRef.close(this.deleteConfirm);
  }

  

}
