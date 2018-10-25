import { Injectable } from '@angular/core';
import { Voucher } from '../models/voucher.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { TaskService } from './dashboard/task.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private id;
  private id$: BehaviorSubject<string> = new BehaviorSubject(null);
  private paid$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private amount;
  private amount$: BehaviorSubject<number> = new BehaviorSubject(null);
  private items: Voucher[] = [];
  private items$: BehaviorSubject<Voucher[]> = new BehaviorSubject([]);
  constructor(private afs: AngularFirestore, private taskService: TaskService) {
    this.orderNew();
  }

  orderConfirm(email: string, name: string, ref: string) {
    const now = new Date();
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      const vid = element.voucherCode;
      this.afs
        .collection('voucher')
        .doc(this.id + ' ' + vid)
        .set({
          ...element,
          order: this.id,
          payment: 'incomplete',
          created: now
        });
    }
    this.afs
      .collection('order')
      .doc(this.id)
      .set({
        id: this.id,
        email: email,
        name: name,
        ref: ref,
        items: this.items,
        value: this.amount,
        created: now
      });
  }
  orderId() {
    return this.id$;
  }
  orderPaid() {
    return this.paid$;
  }
  orderPayment(paymentId) {
    this.afs
      .collection('order')
      .doc(this.id)
      .update({
        payment: paymentId
      });
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      const vid = element.voucherCode;
      const voucherDocId = this.id + ' ' + vid;
      this.afs
        .collection('voucher')
        .doc(voucherDocId)
        .update({ payment: paymentId })
        .then(() => {
          this.taskService.New({
            id: voucherDocId,
            forKind: 'voucher',
            forId: voucherDocId,
            created: element.recipientDate ? element.recipientDate : new Date()
          });
        });
    }
    this.paid$.next(true);
  }
  orderAmount() {
    return this.amount$;
  }
  orderAddItem(voucher: Voucher) {
    this.items = [...this.items, voucher];
    this.items$.next(this.items);
    this.updateAmount();
  }
  orderRemoveItem(voucher: Voucher) {
    this.items = this.items.filter(v => v !== voucher);
    this.items$.next(this.items);
    this.updateAmount();
  }
  orderNew() {
    this.id = this.afs.createId();
    this.id$.next(this.id);
    this.paid$.next(false);
    this.items$.next(null);
    this.items = [];
    this.items$.next(this.items);
    this.updateAmount();
  }
  orderItems(): Observable<Voucher[]> {
    return this.items$;
  }

  private updateAmount() {
    this.amount = this.items.reduce(
      (acc, i) => acc + i.voucherAmount + i.optionalAmount,
      0
    );
    this.amount$.next(this.amount);
  }
}
