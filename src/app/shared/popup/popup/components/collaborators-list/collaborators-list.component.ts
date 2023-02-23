import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CollaboratorService } from 'src/app/shared/services/collaborator.service';
import { Collaborator } from '../../models/collaborator.model';
import { PopupComponent } from '../../popup.component';

@Component({
  selector: 'app-collaborators-list',
  templateUrl: './collaborators-list.component.html',
  styleUrls: ['./collaborators-list.component.css']
})
export class CollaboratorsListComponent implements OnInit{
  collaborators: Collaborator[] = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupComponent>,
    private collaboratorService: CollaboratorService) {}

  ngOnInit(): void {
    this.getCollaborators();
  }

  getCollaborators(): void {
    this.collaboratorService
      .getCollaborators()
      .subscribe((collaborators) => (this.collaborators = collaborators));
  }

  delete(collaborator: Collaborator): void {
    this.collaborators = this.collaborators.filter((h) => h !== collaborator);
    this.collaboratorService.deleteCollaborator(collaborator.id).subscribe();
  }

  toggleAddCollaboratorPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { type: 'add-collaborator' },
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
