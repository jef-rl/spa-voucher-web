import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Process, NewProcess } from '../../models/dashboard/process.model';
import { Task } from '../../models/dashboard/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private processId$: BehaviorSubject<string> = new BehaviorSubject(null);
  private process$: BehaviorSubject<Process> = new BehaviorSubject(null);
  private processDocumentRef: AngularFirestoreDocument;
  constructor(private afs: AngularFirestore) {
    const watchProcessId = this.processId$
      .pipe(
        tap((processId: string) => {
          if (processId) {
            this.processDocumentRef = this.afs
              .collection('process')
              .doc(processId);
            this.processDocumentRef
              .valueChanges()
              .pipe(
                tap((processDoc: Process) => {
                  this.process$.next(processDoc);
                })
              )
              .subscribe();
          } else {
            this.process$.next(null);
          }
        })
      )
      .subscribe();
  }
  New(initProcess: Partial<Process>, forTask?: Partial<Task>): void {
    if (initProcess && !initProcess.id) {
      initProcess.id = this.afs.createId();
    }
    if (forTask) {
      initProcess.taskId = forTask.id;
      initProcess.ownerUid = initProcess.ownerUid
        ? initProcess.ownerUid
        : forTask.ownerUid;
    }
    const newProcess = NewProcess(initProcess);
    this.afs
      .collection('process')
      .doc(newProcess.id)
      .set(newProcess)
      .catch(err => {
        console.log(err);
      });
  }
  Get(selectProcess: string | Partial<Process>): void {
    if (
      (selectProcess && typeof selectProcess === 'string') ||
      (selectProcess && selectProcess['id'])
    ) {
      const processId = selectProcess['id']
        ? selectProcess['id']
        : selectProcess;

      this.processId$.next(processId);
    }
  }
  Update(changes: Partial<Process>) {
    this.processDocumentRef.update(changes);
  }
  Close() {
    this.processId$.next(null);
  }
  Process() {
    return this.process$;
  }
}
