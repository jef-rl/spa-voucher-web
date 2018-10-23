import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Task, NewTask } from '../../models/dashboard/task.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskId$: BehaviorSubject<string> = new BehaviorSubject(null);
  private task$: BehaviorSubject<Task> = new BehaviorSubject(null);
  private taskDocumentRef: AngularFirestoreDocument;
  constructor(private afs: AngularFirestore) {
    const watchTaskId = this.taskId$
      .pipe(
        tap((taskId: string) => {
          if (taskId) {
            this.taskDocumentRef = this.afs.collection('task').doc(taskId);
            this.taskDocumentRef
              .valueChanges()
              .pipe(
                tap((taskDoc: Task) => {
                  this.task$.next(taskDoc);
                })
              )
              .subscribe();
          } else {
            this.task$.next(null);
          }
        })
      )
      .subscribe();
  }
  New(forKind: string, forId: string, deadline: Date): void {
    const newTask = NewTask({ id: forId, forKind, forId, deadline });
    this.afs
      .collection('task')
      .doc(forId)
      .set(newTask)
      .then(() => {
        this.taskId$.next(forId);
      })
      .catch(err => {
        console.log(err);
      });
  }
  Get(selectTask: string | Partial<Task>): void {
    if (
      (selectTask && typeof selectTask === 'string') ||
      (selectTask && selectTask['id'])
    ) {
      const taskId = selectTask['id'] ? selectTask['id'] : selectTask;

      this.taskId$.next(taskId);
    }
  }
  Update(changes: Partial<Task>) {
    this.taskDocumentRef.update(changes);
  }
  Close() {
    this.taskId$.next(null);
  }
  Task() {
    return this.task$;
  }
}
