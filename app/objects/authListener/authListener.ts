import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import * as firebase from 'firebase';
import {IAuthListener, ICreateUserOrLoginMutationArgs} from '../interfaces';
import {log} from '../../core/log';
import {Store} from 'vuex';
import {MUTATION_NAMES} from '../../core/store/STORE_MUTATION_NAMES';

@injectable()

export class AuthListener implements IAuthListener {
	private store: Store<any>;

	constructor(@inject(TYPES.AuthListenerArgs) {
		store
	}: AuthListenerArgs) {
		this.store = store;
	}

	public start() {
		firebase.auth().onAuthStateChanged((user: firebase.UserInfo) => {
			if (!user) {
				return;
			}

			const mutationArgs: ICreateUserOrLoginMutationArgs = {
				userId: user && user.uid || null,
				userInfo: user,
			};

			this.store.commit(MUTATION_NAMES.CREATE_USER_OR_LOGIN, mutationArgs);
		});
	}
}

@injectable()
export class AuthListenerArgs {
	@inject(TYPES.BranchesStore) public store: Store<any>;
}
