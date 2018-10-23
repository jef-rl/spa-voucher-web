import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Shirt {
  id: string;
  name: string;
  price: number;
}
export interface ShirtId extends Shirt {
  id: string;
}

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  private shirtCollection: AngularFirestoreCollection<Shirt>;
  shirts: Observable<ShirtId[]>;
  selectedShirt: Shirt = null;
  constructor(private afs: AngularFirestore) {
    this.shirtCollection = afs.collection<Shirt>('shirts');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.shirts = this.shirtCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Shirt;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    afs
      .collection('shirts')
      .auditTrail(['added', 'modified'])
      .pipe(
        tap(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const type = a.type;
            this.afs
              .doc('shirts/' + id)
              .collection('log')
              .add({ id, ...data, type });
          })
        )
      )
      .subscribe();
    // this.actions = afs.collection('shirts').auditTrail().pipe( map((action:DocumentChangeAction<Shirt>,indx:number) => {
    //   return {action.}
    // }));
  }

  ngOnInit() {}
  add() {
    this.shirtCollection.add({ id: this.afs.createId(), name: '', price: 0 });
  }
  update(shirtUpdate: Shirt) {
    this.afs.doc('shirts/' + shirtUpdate.id).set(shirtUpdate);
  }
}
