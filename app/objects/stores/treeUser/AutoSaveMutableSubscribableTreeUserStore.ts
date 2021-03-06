import {log} from '../../../core/log';
import {
	IMutableSubscribableTreeUserStore,
	IObjectFirebaseAutoSaver,
	ISyncableMutableSubscribableTreeUser,
	ITreeUserData,
} from '../../interfaces';
import {inject, injectable, tagged} from 'inversify';
import {TYPES} from '../../types';
import {ObjectFirebaseAutoSaver} from '../../dbSync/ObjectAutoFirebaseSaver';
import * as firebase from 'firebase';
import {MutableSubscribableTreeUserStore} from './MutableSubscribableTreeUserStore';
import {TAGS} from '../../tags';
import Reference = firebase.database.Reference;

@injectable()
export class AutoSaveMutableSubscribableTreeUserStore extends MutableSubscribableTreeUserStore
	implements IMutableSubscribableTreeUserStore {
	// TODO: I sorta don't like how store is responsible for connecting the item to an auto saver
	private treeUsersFirebaseRef: Reference;

	constructor(@inject(TYPES.AutoSaveMutableSubscribableTreeUserStoreArgs){
		storeSource, updatesCallbacks, treeUsersFirebaseRef,
	}: AutoSaveMutableSubscribableTreeUserStoreArgs) {
		super({storeSource, updatesCallbacks});
		// log('328pm AutoSaverMutableSubscribableTreeUserStore created')
		this.treeUsersFirebaseRef = treeUsersFirebaseRef;
	}

	public addAndSubscribeToItemFromData(
		{id, treeUserData}:
			{ id: string; treeUserData: ITreeUserData; })
		: ISyncableMutableSubscribableTreeUser {
		const treeUserId = id;
		const treeUser: ISyncableMutableSubscribableTreeUser =
			super.addAndSubscribeToItemFromData({id, treeUserData});
		const treeUserFirebaseRef = this.treeUsersFirebaseRef.child(treeUserId);
		// const treeUserFirebaseRef = treeUserFirebaseRef.child(userId)
		const objectFirebaseAutoSaver: IObjectFirebaseAutoSaver = new ObjectFirebaseAutoSaver({
			syncableObject: treeUser,
			syncableObjectFirebaseRef: treeUserFirebaseRef
		});
		objectFirebaseAutoSaver.initialSave();
		objectFirebaseAutoSaver.start();
		// TODO: this needs to add the actual value into the db
		return treeUser;
	}
}

@injectable()
export class AutoSaveMutableSubscribableTreeUserStoreArgs {
	@inject(TYPES.ISubscribableTreeUserStoreSource) public storeSource;
	@inject(TYPES.Array) public updatesCallbacks;
	@inject(TYPES.FirebaseReference)
	@tagged(TAGS.TREE_USERS_REF, true)
	public treeUsersFirebaseRef: Reference;
}
