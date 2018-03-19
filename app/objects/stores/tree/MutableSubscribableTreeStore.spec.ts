// tslint:disable object-literal-sort-keys
import {injectFakeDom} from '../../../testHelpers/injectFakeDom';
import test from 'ava'
import {expect} from 'chai'
import * as sinon from 'sinon'
import {myContainer, myContainerLoadAllModules} from '../../../../inversify.config';
import {CONTENT_ID2, TREE_ID} from '../../../testHelpers/testHelpers';
import {MutableSubscribableField} from '../../field/MutableSubscribableField';
import {
    FieldMutationTypes,
    IIdProppedDatedMutation,
    IMutableSubscribableTreeStore,
    IProppedDatedMutation,
    ISubscribableTreeStoreSource,
    TreePropertyMutationTypes,
    TreePropertyNames
} from '../../interfaces';
import {MutableSubscribableStringSet} from '../../set/MutableSubscribableStringSet';
import {TYPES} from '../../types';
import {MutableSubscribableTreeStore} from './MutableSubscribableTreeStore';
import {SyncableMutableSubscribableTree} from '../../tree/SyncableMutableSubscribableTree';
import {TAGS} from '../../tags';
injectFakeDom();

myContainerLoadAllModules({fakeSigma: true});
test('MutableSubscribableTreeStore > addMutation::::addMutation to storeSource' +
    ' should call addMutation on the appropriate item,' +
    ' and with a modified mutation argument that no longer has the id', (t) => {
    const contentIdVal = CONTENT_ID2;
    const contentId = new MutableSubscribableField<string>({field: contentIdVal });
    const parentId = new MutableSubscribableField<string>({field: 'adf12356' });
    const children = new MutableSubscribableStringSet();
    const id = TREE_ID;
    const tree = new SyncableMutableSubscribableTree({
        id, contentId, parentId, children, updatesCallbacks: [],
    });

    const storeSource: ISubscribableTreeStoreSource
        = myContainer.getTagged(TYPES.ISubscribableTreeStoreSource, TAGS.MAIN_APP, true);
    storeSource.set(TREE_ID, tree);

    const treeStore: IMutableSubscribableTreeStore = new MutableSubscribableTreeStore({
        storeSource,
        updatesCallbacks: []
    });
    const treeAddMutationSpy = sinon.spy(tree, 'addMutation');

    const NEW_CONTENT_ID = CONTENT_ID2;
    const proppedMutation: IProppedDatedMutation<TreePropertyMutationTypes, TreePropertyNames> = {
        data: NEW_CONTENT_ID,
        propertyName: TreePropertyNames.CONTENT_ID,
        timestamp: Date.now(),
        type: FieldMutationTypes.SET,
    };

    const sampleMutation: IIdProppedDatedMutation<TreePropertyMutationTypes, TreePropertyNames> = {
        ...proppedMutation,
        id,
    };

    treeStore.addMutation(sampleMutation);

    expect(treeAddMutationSpy.callCount).to.equal(1);
    const calledWith = treeAddMutationSpy.getCall(0).args[0];
    expect(calledWith).to.deep.equal(proppedMutation);
    t.pass();
});
test('MutableSubscribableTreeStore > addMutation::::addMutation' +
    ' to storeSource that doesn\'t contain the item (and I guess couldn\'t load it on the fly' +
    ' it either, should throw a RangeError', (t) => {

    const nonExistentId = 'abdf1295';

    const storeSource: ISubscribableTreeStoreSource
        = myContainer.getTagged(TYPES.ISubscribableTreeStoreSource, TAGS.MAIN_APP, true);

    const treeStore: IMutableSubscribableTreeStore = new MutableSubscribableTreeStore({
        storeSource,
        updatesCallbacks: []
    });

    const NEW_CONTENT_ID = CONTENT_ID2;
    const proppedMutation: IProppedDatedMutation<TreePropertyMutationTypes, TreePropertyNames> = {
        data: NEW_CONTENT_ID,
        propertyName: TreePropertyNames.CONTENT_ID,
        timestamp: Date.now(),
        type: FieldMutationTypes.SET,
    };

    const sampleMutation: IIdProppedDatedMutation<TreePropertyMutationTypes, TreePropertyNames> = {
        ...proppedMutation,
        id: nonExistentId,
    };

    expect(() => treeStore.addMutation(sampleMutation)).to.throw(RangeError);
    t.pass();
});
