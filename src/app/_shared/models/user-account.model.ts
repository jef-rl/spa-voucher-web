export interface UserAccount {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
  address: string;
  name: string;
  isAdmin?: boolean;
  hasRole?: 'full' | 'lead' | 'user';
}
