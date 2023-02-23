import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Collaborator } from './shared/popup/popup/models/collaborator.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const collaborators = [
      { id: 12, name: 'Politechnika slaska', position: [10, 15] },
      { id: 13, name: 'Bombasto', position: [-10, 25] },
      { id: 14, name: 'Celeritas', position: [10, 5] },
      { id: 15, name: 'Magneta', position: [30, 150] },
      { id: 16, name: 'RubberMan', position: [20, -15] },
      { id: 17, name: 'Dynama', position: [30, -15] },
      { id: 18, name: 'Dr. IQ', position: [10, 15] },
      { id: 19, name: 'Magma', position: [10, 15] },
      { id: 20, name: 'Tornado', position: [100, 5] },
    ];
    return { collaborators };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(collaborators: Collaborator[]): number {
    return collaborators.length > 0
      ? Math.max(...collaborators.map((collaborator) => collaborator.id)) + 1
      : 11;
  }
}
