import {createContext} from 'react';
import {observable} from 'mobx';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export class GlobalState {
  @observable authorized: FirebaseAuthTypes.User | null = null;
  @observable loading: boolean = true;
  @observable page: 'login' | 'register' | 'activate' | 'splash' = 'splash';
}

export const GlobalContext = createContext(new GlobalState());
