import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private collaboratorService: CollaboratorService,
    private inMemoryService: InMemoryDataService) {
      this.newCollaborator = {id: 0, longitude: 0, latitude: 0, name: ""}
    }
    //@Input() collaborators: Collaborator[];
    
    ngOnInit(): void {
    //this.newCollaborator.id = this.inMemoryService.genId(this.)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.collaboratorService
      .addCollaborator({ name } as Collaborator)
      .subscribe((collaborator) => {
        //this.collaborators.push(collaborator);
      });
  }
  addCollaborator() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
