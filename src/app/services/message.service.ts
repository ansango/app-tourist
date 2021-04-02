import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  setErrorMessage,
  setSuccessMessage,
} from '../store/shared/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageOK: string = '';
  messageErr: string = '';
  constructor(private store: Store<AppState>) {}

  resetMessages() {
    this.messageErr = '';
    this.messageOK = '';
  }

  setMessageErr(message: string) {
    this.messageErr = message;
  }

  getMessageErr() {
    return this.messageErr;
  }

  setMessageOK(message: string) {
    this.messageOK = message;
  }

  getMessageOK() {
    return this.messageOK;
  }

  alertDispatch(status: string) {
    if (status === 'err') {
      const errMessage = this.getMessageErr();
      this.store.dispatch(setErrorMessage({ message: errMessage }));
    }
    if (status === 'ok') {
      const okMessage = this.getMessageOK();
      this.store.dispatch(setSuccessMessage({ message: okMessage }));
      this.autoReset('ok');
    }
    if (status === 'reset') {
      this.store.dispatch(setErrorMessage({ message: '' }));
      this.store.dispatch(setSuccessMessage({ message: '' }));
    }

    if (status === 'resetErr') {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }

    if (status === 'resetOk') {
      this.store.dispatch(setSuccessMessage({ message: '' }));
    }
  }

  autoReset(status: string) {
    setTimeout(() => {
      if (status === 'ok') {
        this.store.dispatch(setSuccessMessage({ message: '' }));
      }
      if (status === 'ko') {
        this.store.dispatch(setErrorMessage({ message: '' }));
      }
    }, 5000);
  }
}
