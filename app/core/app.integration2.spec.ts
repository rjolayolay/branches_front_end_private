import {expect} from 'chai'
import {MockFirebase} from 'firebase-mock'
import * as sinon from 'sinon'
import {myContainer} from '../../inversify.config';
import {FIREBASE_PATHS} from '../loaders/paths';
import {TreeLoader} from '../loaders/tree/TreeLoader';
import {TreeLocationLoader} from '../loaders/treeLocation/TreeLocationLoader';
import {
    IHash,
    IRenderedNodesManagerCore,
    ISigmaNode, ISigmaNodesUpdater, IStoreSourceUpdateListenerCore,
} from '../objects/interfaces';
import {ITreeDataWithoutId, ITreeLocationData} from '../objects/interfaces';
import {
    IRenderedNodesManager,
    IStoreSourceUpdateListener
} from '../objects/interfaces';
import {ISigmaRenderManager, ISubscribableTreeLocationStoreSource, ISubscribableTreeStoreSource} from '../objects/interfaces';
import {RenderedNodesManager} from '../objects/sigmaNode/RenderedNodesManager';
import {RenderedNodesManagerCore} from '../objects/sigmaNode/RenderedNodesManagerCore';
import {SigmaNodesUpdater} from '../objects/sigmaNode/SigmaNodesUpdater';
import {StoreSourceUpdateListener} from '../objects/stores/StoreSourceUpdateListener';
import {StoreSourceUpdateListenerCore} from '../objects/stores/StoreSourceUpdateListenerCore';
import {TYPES} from '../objects/types';
import {TREE_ID} from '../testHelpers/testHelpers';

describe('App integration test 2 - loadTree/loadTreeLocation -> renderedSigmaNodes', () => {
    it('once a tree/treeLocation is loaded,' +
        ' that treeId should appear as a node in the renderedSigmaNodes set', async () => {
        const treeIdToDownload = TREE_ID

        const sampleTreeData: ITreeDataWithoutId = {
            contentId: '12345532',
            parentId: '493284',
            children: ['2948, 2947']
        }

        const sampleTreeLocationData: ITreeLocationData = {
            point: {
                x: 5,
                y: 8,
            }
        }

        const firebaseTreesRef = new MockFirebase(FIREBASE_PATHS.TREES)
        const treeRef = firebaseTreesRef.child(treeIdToDownload)
        const firebaseTreeLocationsRef = new MockFirebase(FIREBASE_PATHS.TREE_LOCATIONS)
        const treeLocationRef = firebaseTreeLocationsRef.child(treeIdToDownload)

        const treeStoreSource: ISubscribableTreeStoreSource
            = myContainer.get<ISubscribableTreeStoreSource>(TYPES.ISubscribableTreeStoreSource)
        const treeLocationStoreSource: ISubscribableTreeLocationStoreSource
            = myContainer.get<ISubscribableTreeLocationStoreSource>
        (TYPES.ISubscribableTreeLocationStoreSource)
        const treeLoader = new TreeLoader({firebaseRef: firebaseTreesRef, storeSource: treeStoreSource})
        const treeLocationLoader
            = new TreeLocationLoader({firebaseRef: firebaseTreeLocationsRef, storeSource: treeLocationStoreSource})

        const sigmaNodes: IHash<ISigmaNode> = {}

        const sigmaRenderManager: ISigmaRenderManager = myContainer.get<ISigmaRenderManager>(TYPES.ISigmaRenderManager)
        const sigmaNodesUpdater: ISigmaNodesUpdater
            = new SigmaNodesUpdater({sigmaNodes, sigmaRenderManager, getSigmaIdsForContentId: () => void 0})

        const storeSourceUpdateListenerCore: IStoreSourceUpdateListenerCore
            = new StoreSourceUpdateListenerCore({sigmaNodes, sigmaNodesUpdater})
        const storeSourceUpdateListener: IStoreSourceUpdateListener
            = new StoreSourceUpdateListener({storeSourceUpdateListenerCore})
        const renderedNodes: IHash<ISigmaNode> = {}
        const renderedNodesManagerCore: IRenderedNodesManagerCore
            = new RenderedNodesManagerCore({allSigmaNodes: sigmaNodes, renderedNodes})
        const renderedNodesManager: IRenderedNodesManager = new RenderedNodesManager({renderedNodesManagerCore})
        renderedNodesManager.subscribe(sigmaRenderManager)

        storeSourceUpdateListener.subscribe(treeStoreSource)
        storeSourceUpdateListener.subscribe(treeLocationStoreSource)

        const treeStoreSourceCallCallbacks = sinon.spy(treeStoreSource, 'callCallbacks')

        let inRenderedSet: boolean = !!renderedNodes[treeIdToDownload]
        expect(inRenderedSet).to.equal(false)
        treeRef.fakeEvent('value', undefined, sampleTreeData)
        treeLoader.downloadData(treeIdToDownload)
        treeRef.flush()
        inRenderedSet = !!renderedNodes[treeIdToDownload]
        expect(treeStoreSourceCallCallbacks.callCount).to.equal(1)
        // expect(sigmaNodeCreatorReceiveUpdateSpy.callCount).to.equal(1)
        expect(inRenderedSet).to.equal(false)

        treeLocationRef.fakeEvent('value', undefined, sampleTreeLocationData)
        treeLocationLoader.downloadData(treeIdToDownload)
        treeLocationRef.flush()
        // expect(sigmaNodeCreatorReceiveUpdateSpy.callCount).to.equal(2)

        inRenderedSet = !!renderedNodes[treeIdToDownload]
        expect(inRenderedSet).to.equal(true)

    })
})
