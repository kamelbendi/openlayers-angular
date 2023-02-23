import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InMemoryDataService } from 'src/app/in-memory-data.service';
import { CollaboratorService } from 'src/app/shared/services/collaborator.service';
import { Collaborator } from '../../models/collaborator.model';
import { PopupComponent } from '../../popup.component';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.css']
})
export class AddCollaboratorComponent implements OnInit {
  newCollaborator: Collaborator;
  collaborators: Collaborator[] = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupComponent>,
    private collaboratorService: CollaboratorService,
    private inMemoryService: InMemoryDataService) {
      this.newCollaborator = {id: 0, position: [0, 0], name: ""}
    }
    //@Input() collaborators: Collaborator[];
    
    ngOnInit(): void {
    //this.newCollaborator.id = this.inMemoryService.genId(this.)
  }
  ngOnChanges(): void {
    console.log(this.collaborators)
  }

  add(newCollaborator: Collaborator): void {
    console.log(newCollaborator);
    newCollaborator.name = newCollaborator.name.trim();
    if (!newCollaborator.name) {
      return;
    }
    this.collaboratorService
      .addCollaborator(newCollaborator)
      .subscribe();

    const dialogRef = this.dialog.open(PopupComponent, {
      data: { type: 'collaborators' },
    });
  }
  addCollaborator(newCollaborator: Collaborator) {
    this.collaboratorService.getCollaborators().subscribe((collaborators) => (this.collaborators = collaborators));
    this.newCollaborator.id = this.inMemoryService.genId(this.collaborators);
    this.add(newCollaborator)
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
