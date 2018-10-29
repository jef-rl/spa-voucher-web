import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Task, NewTask } from '../../models/dashboard/task.model';
import { tap, take, map } from 'rxjs/operators';
import { Process } from '../../models/dashboard/process.model';
import { ProcessService } from './process.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskId$: BehaviorSubject<string> = new BehaviorSubject(null);
  private task$: BehaviorSubject<Task> = new BehaviorSubject(null);
  private process$: BehaviorSubject<Partial<Process>[]> = new BehaviorSubject(
    null
  );
  private taskDocumentRef: AngularFirestoreDocument;
  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(null);
  private taskId;
  constructor(
    private afs: AngularFirestore,
    private processService: ProcessService
  ) {
    const watchTaskId = this.taskId$
      .pipe(
        tap((taskId: string) => {
          if (taskId) {
            this.taskDocumentRef = this.afs.collection('task').doc(taskId);
            this.taskDocumentRef
              .valueChanges()
              .pipe(
                tap((taskDoc: Task) => {
                  if (taskDoc.forKind === 'booking') {
                    this.task$.next({
                      ...taskDoc,
                      forDoc: this.afs
                        .doc('booking/' + taskDoc.id)
                        .valueChanges()
                        .pipe(map(rtn => rtn))
                    });
                  } else if (taskDoc.forKind === 'voucher') {
                    this.task$.next({
                      ...taskDoc,
                      forDoc: this.afs
                        .doc('voucher/' + taskDoc.id)
                        .valueChanges()
                        .pipe(map(rtn => rtn))
                    });
                  }
                })
              )
              .subscribe();
            const p$ = this.afs
              .collection('process', ref => ref.where('taskId', '==', taskId))
              .valueChanges()
              .pipe(
                tap((processes: Partial<Process>[]) => {
                  this.process$.next(
                    processes.sort((a, b) => {
                      if (!a.reminder && !b.reminder) {
                        return 0;
                      }
                      if (!a.reminder && b.reminder && b.reminder[0]) {
                        return -1;
                      }
                      if (a.reminder && b.reminder[0] && !b.reminder) {
                        return 1;
                      }
                      if (
                        a.reminder[0] &&
                        b.reminder[0] &&
                        a.reminder[0] < b.reminder[0]
                      ) {
                        return -1;
                      }
                      if (
                        a.reminder[0] &&
                        b.reminder[0] &&
                        a.reminder[0] > b.reminder[0]
                      ) {
                        return 1;
                      }
                      return 0;
                    })
                  );
                })
              )
              .subscribe();
          } else {
            this.task$.next(null);
          }
        })
      )
      .subscribe();
    const watchTasks = this.afs
      .collection('task', ref => ref.orderBy('created', 'asc'))
      .valueChanges()
      .pipe(
        tap((tasks: Task[]) => {
          if (tasks && tasks.length && tasks.length > 0) {
            const tasksMap = tasks.map(task => {
              if (task.forKind === 'booking') {
                return {
                  ...task,
                  forDoc: this.afs
                    .doc('booking/' + task.id)
                    .valueChanges()
                    .pipe(map(rtn => rtn))
                };
              } else if (task.forKind === 'voucher') {
                return {
                  ...task,
                  forDoc: this.afs
                    .doc('voucher/' + task.id)
                    .valueChanges()
                    .pipe(map(rtn => rtn))
                };
              }
            });
            this.tasks$.next(tasksMap);
          } else {
            this.tasks$.next(null);
          }
        })
      )
      .subscribe();
  }
  New(initTask: Partial<Task>, initProcesses?: Partial<Process>[]): void {
    const newTask = NewTask(initTask);
    this.afs
      .collection('task')
      .doc(newTask.id)
      .set(newTask)
      .then(() => {
        if (initProcesses && Array.isArray(initProcesses)) {
          for (
            let processIdx = 0;
            processIdx < initProcesses.length;
            processIdx++
          ) {
            const process = this.processService.New(
              initProcesses[processIdx],
              newTask
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  Select(selectTask: string | Partial<Task>): void {
    if (
      (selectTask && typeof selectTask === 'string') ||
      (selectTask && selectTask['id'])
    ) {
      const taskId = selectTask['id'] ? selectTask['id'] : selectTask;
      this.taskId = taskId;
      this.taskId$.next(taskId);
    }
  }
  Update(changes: Partial<Task>) {
    this.taskDocumentRef.update(changes);
  }
  Close() {
    this.taskId = null;
    this.taskId$.next(null);
  }
  Task() {
    return this.task$;
  }
  Tasks() {
    return this.tasks$;
  }
  AddProcess(initProcess: Partial<Process>) {
    this.taskDocumentRef
      .valueChanges()
      .pipe(
        take(1),
        tap(task => {
          this.processService.New(initProcess, task);
        })
      )
      .subscribe();
  }
  TaskProcesses() {
    return this.process$;
  }
  assignOwner(user, task?) {
    let tskId = task && task.id ? task.id : null;
    if (!tskId) {
      tskId = this.taskId;
    }
    if (user && user.uid) {
      this.afs
        .collection('task')
        .doc(tskId)
        .update({
          ownerUid: user.uid
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  assignProcessOwner(user, process) {
    console.log(user, process);
    if (user && user.uid && process && process.id) {
      this.afs
        .collection('process')
        .doc(process.id)
        .update({
          ownerUid: user.uid
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
