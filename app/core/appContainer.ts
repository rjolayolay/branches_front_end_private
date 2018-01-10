// for now, this is where we will inject all the dependencies
import {TreeLoader} from '../loaders/tree/TreeLoader';
import {
    IApp, IContentLoader, IHash, IKnawledgeMapCreator, IMutable, IMutableSubscribableContentStore,
    IMutableSubscribableContentUserStore,
    IMutableSubscribableTree,
    IMutableSubscribableTreeLocation,
    IMutableSubscribableTreeUserStore, IOneToManyMap,
    IRenderedNodesManager,
    IRenderedNodesManagerCore, ISigma, ISigmaNode,
    ISigmaRenderManager, ISigmaUpdater, IStoreSourceUpdateListener, IStoreSourceUpdateListenerCore,
    ISubscribableContentStoreSource, ISubscribableContentUserStoreSource,
    ISubscribableStoreSource,
    ISubscribableTreeLocationStoreSource,
    ISubscribableTreeStoreSource,
    ITreeLoader, ITreeLocationLoader, ITreeUserLoader
} from '../objects/interfaces';

import firebase from 'firebase'
import {ISubscribableContentStore} from '../objects/interfaces';
import {ISubscribableContentUserStore} from '../objects/interfaces';
import {IMutableSubscribableGlobalStore} from '../objects/interfaces';
import {
    fGetSigmaIdsForContentId, IMutableSubscribableTreeLocationStore, IMutableSubscribableTreeStore,
    ISigmaNodesUpdater,
    IUI,
    ISubscribableTreeUserStoreSource,
} from '../objects/interfaces';
import {CanvasUI} from '../objects/sigmaNode/CanvasUI';
import {SigmaNodesUpdater} from '../objects/sigmaNode/SigmaNodesUpdater';
import {App} from './app';
import BranchesStore from './store2'

import Vue from 'vue';
import VueRouter from 'vue-router';
import {Store} from 'vuex';
import {myContainer} from '../../inversify.config';
import {KnawledgeMapCreator} from '../components/knawledgeMap/knawledgeMap2';
import {FIREBASE_PATHS} from '../loaders/paths';
import {TreeLocationLoader} from '../loaders/treeLocation/TreeLocationLoader';
import {RenderedNodesManager} from '../objects/sigmaNode/RenderedNodesManager';
import {RenderedNodesManagerCore} from '../objects/sigmaNode/RenderedNodesManagerCore';
import {TYPES} from '../objects/types';
import {INITIAL_ID_TO_DOWNLOAD} from './globals';
import {log, error} from './log'
import studyMenu from '../components/studyMenu/studyMenu'
import BranchesFooter from '../components/footer/branchesFooter'
import {SigmaUpdater} from '../objects/sigmaUpdater/sigmaUpdater';
// import GraphData = SigmaJs.GraphData;
import {configureSigma} from '../objects/sigmaNode/configureSigma';
// import Sigma = SigmaJs.Sigma;
// import {SigmaJs} from 'sigmajs';
import sigma from '../../other_imports/sigma/sigma.core.js'
import {StoreSourceUpdateListenerCore} from '../objects/stores/StoreSourceUpdateListenerCore';
import {StoreSourceUpdateListener} from '../objects/stores/StoreSourceUpdateListener';
import {MutableSubscribableGlobalStore} from '../objects/stores/MutableSubscribableGlobalStore';
import {MutableSubscribableTreeStore} from '../objects/stores/tree/MutableSubscribableTreeStore';
import {MutableSubscribableTreeUserStore} from '../objects/stores/treeUser/MutableSubscribableTreeUserStore';
import {MutableSubscribableTreeLocationStore} from '../objects/stores/treeLocation/MutableSubscribableTreeLocationStore';
import {MutableSubscribableContentStore} from '../objects/stores/content/MutableSubscribableContentStore';
import {MutableSubscribableContentUser} from '../objects/contentUser/MutableSubscribableContentUser';
import {MutableSubscribableContentUserStore} from '../objects/stores/contentUser/MutableSubscribableContentUserStore';
import {TreeUserLoader} from '../loaders/treeUser/TreeUserLoader';
import {ContentLoader} from '../loaders/content/ContentLoader';

log('about to call configureSigma')
configureSigma(sigma)
log('just called configureSigma')

Vue.component('branchesFooter', BranchesFooter)
class AppContainer {
    constructor() {

    }
    // this should be the only place where I have new statements
    // and I should only have new statements here . . .
    // and one start statement that starts off the initialization/download / logic process
    /* TODO: have an appContainerContainer that does
    const myAppContainer = myContainer.get<IAppContainerContainer>(TYPES.IAppContainerContainer).
     Have that file be put as the root in webpack
     And then have AppContainer have all its objects injected in its args

    */
    public async start() {
        const firebaseContentRef = firebase.database().ref(FIREBASE_PATHS.CONTENT)
        const firebaseContentUsersRef = firebase.database().ref(FIREBASE_PATHS.CONTENT_USERS)
        const firebaseTreesRef = firebase.database().ref(FIREBASE_PATHS.TREES)
        const firebaseTreeUsersRef = firebase.database().ref(FIREBASE_PATHS.TREE_USERS)
        const firebaseTreeLocationsRef = firebase.database().ref(FIREBASE_PATHS.TREE_LOCATIONS)
        const contentStoreSource: ISubscribableContentStoreSource
            = myContainer.get<ISubscribableContentStoreSource>(TYPES.ISubscribableContentStoreSource)
        const contentUserStoreSource: ISubscribableContentUserStoreSource
            = myContainer.get<ISubscribableContentUserStoreSource>(TYPES.ISubscribableContentUserStoreSource)
        const treeStoreSource: ISubscribableTreeStoreSource
        = myContainer.get<ISubscribableTreeStoreSource>(TYPES.ISubscribableTreeStoreSource)
        const treeUserStoreSource: ISubscribableTreeUserStoreSource
            = myContainer.get<ISubscribableTreeUserStoreSource>
        (TYPES.ISubscribableTreeUserStoreSource)
        const treeLocationStoreSource: ISubscribableTreeLocationStoreSource
        = myContainer.get<ISubscribableTreeLocationStoreSource>
            (TYPES.ISubscribableTreeLocationStoreSource)
        const treeLoader: ITreeLoader =
            new TreeLoader({firebaseRef: firebaseTreesRef, storeSource: treeStoreSource})
        const treeLocationLoader: ITreeLocationLoader =
            new TreeLocationLoader({firebaseRef: firebaseTreeLocationsRef, storeSource: treeLocationStoreSource})
        const treeUserLoader: ITreeUserLoader =
            new TreeUserLoader({firebaseRef: firebaseTreeUsersRef, storeSource: treeUserStoreSource})
        const contentLoader: IContentLoader =
            new ContentLoader({firebaseRef: firebaseContentRef, storeSource: contentStoreSource})

        const treeStore: IMutableSubscribableTreeStore =
            new MutableSubscribableTreeStore({storeSource: treeStoreSource, updatesCallbacks: [] })

        const treeUserStore: IMutableSubscribableTreeUserStore =
            new MutableSubscribableTreeUserStore({storeSource: treeUserStoreSource, updatesCallbacks: []})
            // myContainer.get<IMutableSubscribableTreeUserStore>(TYPES.IMutableSubscribableTreeUserStore)

        const treeLocationStore: IMutableSubscribableTreeLocationStore =
            new MutableSubscribableTreeLocationStore({storeSource: treeLocationStoreSource, updatesCallbacks: []})
            // myContainer.get<IMutableSubscribableTreeLocationStore>(TYPES.IMutableSubscribableTreeLocationStore)

        const contentStore: IMutableSubscribableContentStore =
            new MutableSubscribableContentStore({storeSource: contentStoreSource, updatesCallbacks: []})
            // myContainer.get<IMutableSubscribableContentStore>(TYPES.IMutableSubscribableContentStore)

        const contentUserStore: IMutableSubscribableContentUserStore =
            new MutableSubscribableContentUserStore({storeSource: contentUserStoreSource, updatesCallbacks: []})

        const globalStore: IMutableSubscribableGlobalStore =
            new MutableSubscribableGlobalStore(
                {updatesCallbacks: [], contentUserStore, treeStore, treeLocationStore, treeUserStore, contentStore})

        const store: Store<any> = new BranchesStore() as Store<any>

        const getSigmaIdsForContentId: fGetSigmaIdsForContentId = () => {
            return []
        }
        const sigmaInstance: ISigma = myContainer.get<ISigma>(TYPES.ISigma)

        const camera = sigmaInstance.cameras[0]
        function focusNode(node) {
            if (!node) {
                error('Tried to go to node');
                error(node);
                return;
            }
            const cameraCoord = {
                x: node['read_cam0:x'],
                y: node['read_cam0:y'],
                ratio: 0.20
            };
            camera.goTo(cameraCoord);
        }
        const sigmaUpdater: ISigmaUpdater =
            new SigmaUpdater({
                store
            })
        const sigmaNodes: IHash<ISigmaNode> = {}
        const renderedNodesManagerCore: IRenderedNodesManagerCore
        = new RenderedNodesManagerCore({sigmaNodes, addNodeToSigma: sigmaUpdater.addNode.bind(sigmaUpdater)})
        const renderedNodesManager: IRenderedNodesManager = new RenderedNodesManager({renderedNodesManagerCore})
        const sigmaRenderManager: ISigmaRenderManager = myContainer.get<ISigmaRenderManager>(TYPES.ISigmaRenderManager)
        renderedNodesManager.subscribe(sigmaRenderManager)
        // TODO: << ^^^ this should somehow be handled in ui.start or canvasui.start or something
        const sigmaNodesUpdater: ISigmaNodesUpdater
        = new SigmaNodesUpdater({sigmaRenderManager, sigmaNodes, getSigmaIdsForContentId})

        const contentIdSigmaIdMap: IOneToManyMap<string> = myContainer.get<IOneToManyMap<string>>(TYPES.IOneToManyMap)
        const storeSourceUpdateListenerCore: IStoreSourceUpdateListenerCore
            = new StoreSourceUpdateListenerCore({sigmaNodes, sigmaNodesUpdater, contentIdSigmaIdMap})
        const storeSourceUpdateListener: IStoreSourceUpdateListener
            = new StoreSourceUpdateListener({storeSourceUpdateListenerCore})

        storeSourceUpdateListener.subscribe(treeStoreSource)
        storeSourceUpdateListener.subscribe(treeLocationStoreSource)
        storeSourceUpdateListener.subscribe(treeUserStoreSource)
        storeSourceUpdateListener.subscribe(contentStoreSource)
        storeSourceUpdateListener.subscribe(contentUserStoreSource)

        const canvasUI: IUI = new CanvasUI({sigmaNodesUpdater})
        // const
        // DataLoader.start()

        // const globalStore: IMutableSubscribableGlobalStore
        // = myContainer.get<IMutableSubscribableGlobalStore>(TYPES.IMutableSubscribableGlobalStore)
        // const app: IApp = myContainer.get<IApp>(TYPES.IApp)
        const app: IApp = new App({store: globalStore, UIs: [canvasUI]})
        const knawledgeMapCreator: IKnawledgeMapCreator =
            new KnawledgeMapCreator({store, treeLoader, treeLocationLoader, contentLoader})
        const knawledgeMap = knawledgeMapCreator.create()
        const routes = [
            { path: '/', component: knawledgeMap, props: true }
        ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
        const router = new VueRouter({
            routes, // short for `routes: routes`
            mode: 'history',
        })
        const treeIdToDownload = 1
        app.start()
        // For now, new Vue must be called after app.start()
        const vm = new Vue({
            el: '#branches-app',
            created() {
                log('Vue instance created')
                return void 0
            },
            data() {
                return {
                }
            },
            computed: {
            },
            methods: {
            },
            store,
            router
        })

        // TODO: don't make the app container container be fetched thorugh dependency injection until we have the UI
        // manually wired and up
        // and running with db saves and everything. Then define the dependency graph inside of the inversify config
    }

}

export {AppContainer}
