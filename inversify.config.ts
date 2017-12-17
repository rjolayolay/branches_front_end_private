import * as firebase from 'firebase';
import {Container, ContainerModule, interfaces} from 'inversify'
import 'reflect-metadata'
import {log} from './app/core/log'
import {FIREBASE_PATHS} from './app/loaders/paths';
import {TreeLoader, TreeLoaderArgs} from './app/loaders/tree/TreeLoader';
import {TreeLocationLoaderArgs} from './app/loaders/treeLocation/TreeLocationLoader';
import {SubscribableContent, SubscribableContentArgs} from './app/objects/content/SubscribableContent';
import {ContentUserData, ContentUserDataArgs} from './app/objects/contentUserData/ContentUserData';
import {
    SubscribableContentUser,
    SubscribableContentUserArgs
} from './app/objects/contentUserData/SubscribableContentUser';
import {FirebaseRef} from './app/objects/dbSync/FirebaseRef';
import {FirebaseSaverArgs} from './app/objects/dbSync/FirebaseSaver';
import {SyncToDB, SyncToDBArgs} from './app/objects/dbSync/SyncToDB';
import {
    SubscribableMutableField,
    SubscribableMutableFieldArgs
} from './app/objects/field/SubscribableMutableField';
import firebaseDevConfig = require('./app/objects/firebase.dev.config.json')
import {
    IDatedMutation, IMutableSubscribablePoint, IStoreSourceUpdateListenerCore, ISubscribableContentStoreSource,
    ISubscribableContentUserStoreSource, ISubscribableTreeLocationStoreSource, ISubscribableTreeStoreSource,
    ISubscribableTreeUserStoreSource, ITreeLoader,
    ObjectDataTypes
} from './app/objects/interfaces';
import Reference = firebase.database.Reference;
// import firebase from './app/objects/firebaseService.js'
import {
    FieldMutationTypes, IColorSlice, IContentUserData, IDatabaseSyncer, IDetailedUpdates,
    IFirebaseRef, IMutableStringSet, IProficiencyStats, IProppedDatedMutation, ISaveUpdatesToDBFunction,
    ISigmaNode, ISubscribableContentUser,
    ISubscribableMutableField, ISubscribableMutableStringSet,  ITree,
    radian,
    TreePropertyNames
} from './app/objects/interfaces';
import {
    CONTENT_TYPES,
    fGetSigmaIdsForContentId, IMutableSubscribableContentStore,
    IMutableSubscribableContentUserStore,
    IMutableSubscribableGlobalStore, IMutableSubscribableTree,
    IMutableSubscribableTreeLocation, IMutableSubscribableTreeLocationStore,
    IMutableSubscribableTreeStore, IMutableSubscribableTreeUserStore, IRenderedNodesManager, IRenderedNodesManagerCore,
    ISigmaNodesUpdater,
    ISigmaRenderManager,
    IStoreSourceUpdateListener, ISubscribableContent,
    ISubscribableContentStore,
    ISubscribableContentUserStore,
    ISubscribableGlobalStore, ISubscribableTree, ISubscribableTreeLocationStore,
    ISubscribableTreeStore,
    ISubscribableTreeUser,
    ISubscribableTreeUserStore
} from './app/objects/interfaces';
import {MutableSubscribablePoint, SubscribableMutablePointArgs} from './app/objects/point/MutableSubscribablePoint';
import {PROFICIENCIES} from './app/objects/proficiency/proficiencyEnum';
import {defaultProficiencyStats} from './app/objects/proficiencyStats/IProficiencyStats';
import {
    SubscribableMutableStringSet,
    SubscribableMutableStringSetArgs
} from './app/objects/set/SubscribableMutableStringSet';
import {
    CanvasUI,
    CanvasUIArgs
} from './app/objects/sigmaNode/CanvasUI';
import {ColorSlice} from './app/objects/sigmaNode/ColorSlice';
import {RenderedNodesManager, RenderedNodesManagerArgs} from './app/objects/sigmaNode/RenderedNodesManager';
import {RenderedNodesManagerCore, RenderedNodesManagerCoreArgs} from './app/objects/sigmaNode/RenderedNodesManagerCore';
import {SigmaNode, SigmaNodeArgs} from './app/objects/sigmaNode/SigmaNode';
import {SigmaNodesUpdater, SigmaNodesUpdaterArgs} from './app/objects/sigmaNode/SigmaNodesUpdater';
import {SigmaRenderManager, SigmaRenderManagerArgs} from './app/objects/sigmaNode/SigmaRenderManager';
import {MutableSubscribableContentStore} from './app/objects/stores/content/MutableSubscribableContentStore';
import {
    SubscribableContentStore,
    SubscribableContentStoreArgs
} from './app/objects/stores/content/SubscribableContentStore';
import {MutableSubscribableContentUserStore} from './app/objects/stores/contentUser/MutableSubscribableContentUserStore';
import {
    SubscribableContentUserStore,
    SubscribableContentUserStoreArgs
} from './app/objects/stores/contentUser/SubscribableContentUserStore';
import {
    MutableSubscribableGlobalStore,
    MutableSubscribableGlobalStoreArgs
} from './app/objects/stores/MutableSubscribableGlobalStore';
import {StoreSourceUpdateListener, StoreSourceUpdateListenerArgs} from './app/objects/stores/StoreSourceUpdateListener';
import {
    StoreSourceUpdateListenerCore,
    StoreSourceUpdateListenerCoreArgs
} from './app/objects/stores/StoreSourceUpdateListenerCore';
import {SubscribableGlobalStore, SubscribableGlobalStoreArgs} from './app/objects/stores/SubscribableGlobalStore';
import {SubscribableStoreArgs} from './app/objects/stores/SubscribableStore';
import {
    SubscribableContentStoreSource, SubscribableContentStoreSourceArgs,
    SubscribableContentUserStoreSource, SubscribableContentUserStoreSourceArgs,
    SubscribableStoreSourceArgs, SubscribableTreeLocationStoreSource,
    SubscribableTreeLocationStoreSourceArgs,
    SubscribableTreeStoreSource,
    SubscribableTreeStoreSourceArgs, SubscribableTreeUserStoreSource, SubscribableTreeUserStoreSourceArgs
} from './app/objects/stores/SubscribableStoreSource';
import {MutableSubscribableTreeStore} from './app/objects/stores/tree/MutableSubscribableTreeStore';
import {SubscribableTreeStore, SubscribableTreeStoreArgs} from './app/objects/stores/tree/SubscribableTreeStore';
import {MutableSubscribableTreeLocationStore} from './app/objects/stores/treeLocation/MutableSubscribableTreeLocationStore';
import {
    SubscribableTreeLocationStore,
    SubscribableTreeLocationStoreArgs
} from './app/objects/stores/treeLocation/SubscribableTreeLocationStore';
import {MutableSubscribableTreeUserStore} from './app/objects/stores/treeUser/MutableSubscribableTreeUserStore';
import {
    SubscribableTreeUserStore,
    SubscribableTreeUserStoreArgs
} from './app/objects/stores/treeUser/SubscribableTreeUserStore';
import {SubscribableArgs} from './app/objects/subscribable/Subscribable';
import {DBSubscriberToTreeArgs} from './app/objects/tree/DBSubscriberToTree';
import {MutableSubscribableTree} from './app/objects/tree/MutableSubscribableTree';
import {SubscribableTree, SubscribableTreeArgs} from './app/objects/tree/SubscribableTree';
import {MutableSubscribableTreeLocation} from './app/objects/treeLocation/MutableSubscribableTreeLocation';
import {SubscribableTreeLocationArgs} from './app/objects/treeLocation/SubscribableTreeLocation';
import {SubscribableTreeUser, SubscribableTreeUserArgs} from './app/objects/treeUser/SubscribableTreeUser';
import {TYPES } from './app/objects/types'
import {UIColor} from './app/objects/uiColor';
import { TREE_ID3} from './app/testHelpers/testHelpers';

const firebaseConfig = firebaseDevConfig
log('firebaseDevConfig is' + JSON.stringify(firebaseDevConfig))
const myContainer = new Container()
// throw new Error('inversify error error error')

// const firebaseConfig = {
//     apiKey: 'AIzaSyCqzA9NxQsKpY4WzKbJf59nvrf-8-60i8A',
//     authDomain: 'branches-dev.firebaseapp.com',
//     databaseURL: 'https://branches-dev.firebaseio.com',
//     projectId: 'branches-dev',
//     storageBucket: 'branches-dev.appspot.com',
//     messagingSenderId: '354929800016'
// }
firebase.initializeApp(firebaseConfig)
const treesRef = firebase.database().ref(FIREBASE_PATHS.TREES)
const treeLocationsRef = firebase.database().ref(FIREBASE_PATHS.TREE_LOCATIONS)
log('firebase trees ref is' + treesRef)
const loaders = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<ITreeLoader>(TYPES.ITreeLoader).to(TreeLoader)
    bind<TreeLoaderArgs>(TYPES.TreeLoaderArgs).to(TreeLoaderArgs)
    bind<SubscribableStoreArgs>(TYPES.SubscribableStoreArgs).to(SubscribableStoreArgs)
    // bind<Reference>(TYPES.Reference).toConstantValue(treesRef)
    //     .whenInjectedInto(TreeLoaderArgs)
    // bind<Reference>(TYPES.Reference).toConstantValue(firebaseApp.database().ref(FIREBASE_PATHS.TREE_LOCATIONS))
    //     .whenInjectedInto(TreeLocationLoaderArgs)
})
const stores = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<ISubscribableTreeLocationStoreSource>(TYPES.ISubscribableTreeLocationStoreSource)
        .to(SubscribableTreeLocationStoreSource)
    bind<ISubscribableTreeStoreSource>(TYPES.ISubscribableTreeStoreSource)
        .to(SubscribableTreeStoreSource)
    bind<ISubscribableTreeUserStoreSource>(TYPES.ISubscribableTreeUserStoreSource)
        .to(SubscribableTreeUserStoreSource)
    bind<ISubscribableContentStoreSource>(TYPES.ISubscribableContentStoreSource)
        .to(SubscribableContentStoreSource)
    bind<ISubscribableContentUserStoreSource>(TYPES.ISubscribableContentUserStoreSource)
        .to(SubscribableContentUserStoreSource)

    bind<SubscribableGlobalStoreArgs>(TYPES.SubscribableGlobalStoreArgs).to(SubscribableGlobalStoreArgs)
    bind<IMutableSubscribableGlobalStore>
    (TYPES.IMutableSubscribableGlobalStore).to(MutableSubscribableGlobalStore)

    bind<SubscribableContentUserStoreArgs>(TYPES.SubscribableContentUserStoreArgs)
        .to(SubscribableContentUserStoreArgs)
    bind<SubscribableContentStoreArgs>(TYPES.SubscribableContentStoreArgs).to(SubscribableContentStoreArgs)
    bind<SubscribableTreeStoreArgs>(TYPES.SubscribableTreeStoreArgs).to(SubscribableTreeStoreArgs)
    bind<SubscribableTreeUserStoreArgs>(TYPES.SubscribableTreeUserStoreArgs).to(SubscribableTreeUserStoreArgs)
    bind<SubscribableTreeLocationStoreArgs>(TYPES.SubscribableTreeLocationStoreArgs)
        .to(SubscribableTreeLocationStoreArgs)

    bind<IMutableSubscribableTreeStore>(TYPES.IMutableSubscribableTreeStore).to(MutableSubscribableTreeStore)
    bind<IMutableSubscribableTreeUserStore>(TYPES.IMutableSubscribableTreeUserStore)
        .to(MutableSubscribableTreeUserStore)
    bind<IMutableSubscribableTreeLocationStore>(TYPES.IMutableSubscribableTreeLocationStore)
        .to(MutableSubscribableTreeLocationStore)
    bind<IMutableSubscribableTreeLocation>(TYPES.IMutableSubscribableTreeLocation)
        .to(MutableSubscribableTreeLocation)
    bind<IMutableSubscribableContentStore>(TYPES.IMutableSubscribableContentStore)
        .to(MutableSubscribableContentStore)
    bind<IMutableSubscribableContentUserStore>(TYPES.IMutableSubscribableContentUserStore)
        .to(MutableSubscribableContentUserStore)

    bind<SubscribableStoreSourceArgs>(TYPES.SubscribableStoreSourceArgs)
        .to(SubscribableStoreSourceArgs)

    bind<MutableSubscribableGlobalStoreArgs>(TYPES.MutableSubscribableGlobalStoreArgs)
        .to(MutableSubscribableGlobalStoreArgs)

    bind<ISubscribableGlobalStore>(TYPES.ISubscribableGlobalStore).to(SubscribableGlobalStore)

    bind<SubscribableContentStoreSourceArgs>(TYPES.SubscribableContentStoreSourceArgs)
        .to(SubscribableContentStoreSourceArgs)

    bind<SubscribableContentUserStoreSourceArgs>(TYPES.SubscribableContentUserStoreSourceArgs)
        .to(SubscribableContentUserStoreSourceArgs)
    bind<SubscribableTreeStoreSourceArgs>(TYPES.SubscribableTreeStoreSourceArgs)
        .to(SubscribableTreeStoreSourceArgs)
    bind<SubscribableTreeLocationStoreSourceArgs>(TYPES.SubscribableTreeLocationStoreSourceArgs)
        .to(SubscribableTreeLocationStoreSourceArgs)
    bind<SubscribableTreeUserStoreSourceArgs>(TYPES.SubscribableTreeUserStoreSourceArgs)
        .to(SubscribableTreeUserStoreSourceArgs)
// myContainer.bind<ISubscribableStore<ISubscribableTreeCore>>
// (TYPES.ISubscribableStore_ISubscribableTreeCore).to(SubscribableStore)
    /* ^^ TODO: Why can't i specify the interface on the SubscribableStore type? */
    bind<ISubscribableTreeStore>(TYPES.ISubscribableTreeStore).to(SubscribableTreeStore)
    bind<ISubscribableTreeUserStore>(TYPES.ISubscribableTreeUserStore).to(SubscribableTreeUserStore)
    bind<ISubscribableTreeLocationStore>(TYPES.ISubscribableTreeLocationStore).to(SubscribableTreeLocationStore)
    bind<ISubscribableContentUserStore>(TYPES.ISubscribableContentUserStore).to(SubscribableContentUserStore)
    bind<ISubscribableContentStore>(TYPES.ISubscribableContentStore).to(SubscribableContentStore)

    bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_DATA)
        .whenInjectedInto(SubscribableTreeStoreSourceArgs)
    bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_LOCATION_DATA)
        .whenInjectedInto(SubscribableTreeLocationStoreSourceArgs)
    bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_USER_DATA)
        .whenInjectedInto(SubscribableTreeUserStoreSourceArgs)
    bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.CONTENT_DATA)
        .whenInjectedInto(SubscribableContentStoreSourceArgs)
    bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.CONTENT_USER_DATA)
        .whenInjectedInto(SubscribableContentUserStoreSourceArgs)

})
//
const rendering = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<radian>(TYPES.radian).toConstantValue(0)
    bind<SigmaNodesUpdaterArgs>(TYPES.SigmaNodesUpdaterArgs).to(SigmaNodesUpdaterArgs)
    bind<CanvasUI>(TYPES.CanvasUI).to(CanvasUI)
    bind<CanvasUIArgs>(TYPES.CanvasUIArgs)
        .to(CanvasUIArgs)

    bind<SigmaNodeArgs>(TYPES.SigmaNodeArgs).to(SigmaNodeArgs)
    bind<ISigmaRenderManager>(TYPES.SigmaRenderManager).to(SigmaRenderManager)
    bind<SigmaRenderManagerArgs>(TYPES.SigmaRenderManagerArgs).to(SigmaRenderManagerArgs)

    bind<StoreSourceUpdateListenerArgs>(TYPES.StoreSourceUpdateListenerArgs).to(StoreSourceUpdateListenerArgs)
    bind<IStoreSourceUpdateListener>(TYPES.IStoreSourceUpdateListener).to(StoreSourceUpdateListener)

    bind<StoreSourceUpdateListenerCoreArgs>(TYPES.StoreSourceUpdateListenerCoreArgs)
        .to(StoreSourceUpdateListenerCoreArgs)
    bind<IStoreSourceUpdateListenerCore>(TYPES.IStoreSourceUpdateListenerCore).to(StoreSourceUpdateListenerCore)

    bind<IRenderedNodesManager>(TYPES.IRenderedNodesManager).to(RenderedNodesManager)
    bind<IRenderedNodesManagerCore>(TYPES.IRenderedNodesManagerCore).to(RenderedNodesManagerCore)
    bind<RenderedNodesManagerArgs>(TYPES.RenderedNodesManagerArgs).to(RenderedNodesManagerArgs)
    bind<RenderedNodesManagerCoreArgs>(TYPES.RenderedNodesManagerCoreArgs).to(RenderedNodesManagerCoreArgs)
    bind<ISigmaNode>(TYPES.ISigmaNode).to(SigmaNode)
    bind<ISigmaRenderManager>(TYPES.ISigmaRenderManager).to(SigmaRenderManager)
    bind<ISigmaNodesUpdater>(TYPES.ISigmaNodesUpdater).to(SigmaNodesUpdater)

    myContainer.bind<IColorSlice>(TYPES.IColorSlice).to(ColorSlice)
    myContainer.bind<fGetSigmaIdsForContentId>(TYPES.fGetSigmaIdsForContentId).toConstantValue(() => [])
})
//
const dataObjects = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IDatedMutation<FieldMutationTypes>>(TYPES.IDatedMutation).toConstantValue({
        data: {id: '12345'},
        timestamp: Date.now(),
        type: FieldMutationTypes.SET,
    })
    bind<IProppedDatedMutation<FieldMutationTypes, TreePropertyNames>>
    (TYPES.IProppedDatedMutation).toConstantValue({
        data: {id: TREE_ID3},
        propertyName: TreePropertyNames.PARENT_ID,
        timestamp: Date.now(),
        type: FieldMutationTypes.SET,
    })
    bind<ContentUserDataArgs>(TYPES.ContentUserDataArgs).to(ContentUserDataArgs)
    bind<DBSubscriberToTreeArgs>(TYPES.DBSubscriberToTreeArgs).to(DBSubscriberToTreeArgs)

    bind<IMutableSubscribablePoint>(TYPES.IMutableSubscribablePoint).to(MutableSubscribablePoint)
    bind<SubscribableMutablePointArgs>(TYPES.SubscribableMutablePointArgs).to(SubscribableMutablePointArgs)

    bind<ISubscribableContent>(TYPES.ISubscribableContent).to(SubscribableContent)
    bind<ISubscribableContentUser>(TYPES.ISubscribableContentUser).to(SubscribableContentUser)
    bind<ISubscribableTree>(TYPES.ISubscribableTree).to(SubscribableTree)
    bind<ISubscribableTreeUser>(TYPES.ISubscribableTreeUser).to(SubscribableTreeUser)
    bind<ISubscribableMutableField<boolean>>(TYPES.ISubscribableMutableBoolean).to(SubscribableMutableField)
    bind<SubscribableMutableFieldArgs>(TYPES.SubscribableMutableFieldArgs).to(SubscribableMutableFieldArgs)
    bind<SubscribableContentUserArgs>(TYPES.SubscribableContentUserArgs).to(SubscribableContentUserArgs)
    bind<ISubscribableMutableField<number>>(TYPES.ISubscribableMutableNumber).to(SubscribableMutableField)
    bind<ISubscribableMutableField<string>>(TYPES.ISubscribableMutableString).to(SubscribableMutableField)
    bind<ISubscribableMutableField<PROFICIENCIES>>(TYPES.ISubscribableMutableProficiency)
        .to(SubscribableMutableField)
    bind<ISubscribableMutableField<CONTENT_TYPES>>(TYPES.ISubscribableMutableContentType)
        .to(SubscribableMutableField)
    bind<ISubscribableMutableField<IProficiencyStats>>(TYPES.ISubscribableMutableProficiencyStats)
        .to(SubscribableMutableField)
    bind<ISubscribableMutableStringSet>(TYPES.ISubscribableMutableStringSet).to(SubscribableMutableStringSet)
//
    bind<SubscribableMutableStringSetArgs>
    (TYPES.SubscribableMutableStringSetArgs).to(SubscribableMutableStringSetArgs)
    bind<SubscribableArgs>(TYPES.SubscribableArgs).to(SubscribableArgs)
    bind<SubscribableTreeArgs>(TYPES.SubscribableTreeArgs).to(SubscribableTreeArgs)
    bind<SubscribableTreeLocationArgs>(TYPES.SubscribableTreeLocationArgs).to(SubscribableTreeLocationArgs)

    bind<IMutableSubscribableTree>(TYPES.IMutableSubscribableTree).to(MutableSubscribableTree)
    bind<IMutableStringSet>(TYPES.IMutableStringSet).to(SubscribableMutableStringSet)

    bind<SubscribableTreeUserArgs>(TYPES.SubscribableTreeUserArgs).to(SubscribableTreeUserArgs)
    bind<IDatabaseSyncer>(TYPES.IDatabaseSyncer).to(SyncToDB)
    bind<SubscribableContentArgs>(TYPES.SubscribableContentArgs).to(SubscribableContentArgs)

    bind<any[]>(TYPES.Array).toDynamicValue((context: interfaces.Context) => [] )
// tslint:disable-next-line ban-types
    bind<Number>(TYPES.Number).toConstantValue(0)
    bind<PROFICIENCIES>(TYPES.PROFICIENCIES).toConstantValue(PROFICIENCIES.ONE)

// tslint:disable-next-line ban-types
    bind<String>(TYPES.String).toConstantValue('')
    bind<SyncToDBArgs>(TYPES.SyncToDBArgs).to(SyncToDBArgs)
    bind<ISaveUpdatesToDBFunction>(TYPES.ISaveUpdatesToDBFunction)
        .toConstantValue((updates: IDetailedUpdates) => void 0)
    bind<UIColor>(TYPES.UIColor).toConstantValue(UIColor.GRAY);
// tslint:disable-next-line ban-types
    bind<Object>(TYPES.Object).toDynamicValue((context: interfaces.Context) => ({}))

    bind<any>(TYPES.Any).toConstantValue(null)
    bind<boolean>(TYPES.Boolean).toConstantValue(false)
    bind<FirebaseSaverArgs>(TYPES.FirebaseSaverArgs).to(FirebaseSaverArgs)
    bind<ITree>(TYPES.ITree).to(SubscribableTree)
// TODO: maybe only use this constant binding for a test container. . . Not production container

    bind<IContentUserData>(TYPES.IContentUserData).to(ContentUserData)
    bind<IFirebaseRef>(TYPES.IFirebaseRef).to(FirebaseRef)

// myContainer.bind<Reference>(TYPES.Reference).to
    bind<IProficiencyStats>(TYPES.IProficiencyStats).toConstantValue(defaultProficiencyStats)
})

// =============================================
// loaders
myContainer.bind<ITreeLoader>(TYPES.ITreeLoader).to(TreeLoader)
myContainer.bind<TreeLoaderArgs>(TYPES.TreeLoaderArgs).to(TreeLoaderArgs)
myContainer.bind<SubscribableStoreArgs>(TYPES.SubscribableStoreArgs).to(SubscribableStoreArgs)
myContainer.bind<Reference>(TYPES.Reference).toConstantValue(treesRef)
    .whenInjectedInto(TreeLoaderArgs)
// myContainer.bind<Reference>(TYPES.Reference).toConstantValue(treeLocationsRef)
//     .whenInjectedInto(TreeLocationLoaderArgs)
// stores
myContainer.bind<ISubscribableTreeLocationStoreSource>(TYPES.ISubscribableTreeLocationStoreSource)
    .to(SubscribableTreeLocationStoreSource)
myContainer.bind<ISubscribableTreeStoreSource>(TYPES.ISubscribableTreeStoreSource)
    .to(SubscribableTreeStoreSource)
myContainer.bind<ISubscribableTreeUserStoreSource>(TYPES.ISubscribableTreeUserStoreSource)
    .to(SubscribableTreeUserStoreSource)
myContainer.bind<ISubscribableContentStoreSource>(TYPES.ISubscribableContentStoreSource)
    .to(SubscribableContentStoreSource)
myContainer.bind<ISubscribableContentUserStoreSource>(TYPES.ISubscribableContentUserStoreSource)
    .to(SubscribableContentUserStoreSource)

myContainer.bind<SubscribableGlobalStoreArgs>(TYPES.SubscribableGlobalStoreArgs).to(SubscribableGlobalStoreArgs)
myContainer.bind<IMutableSubscribableGlobalStore>
(TYPES.IMutableSubscribableGlobalStore).to(MutableSubscribableGlobalStore)

myContainer.bind<SubscribableContentUserStoreArgs>(TYPES.SubscribableContentUserStoreArgs)
    .to(SubscribableContentUserStoreArgs)
myContainer.bind<SubscribableContentStoreArgs>(TYPES.SubscribableContentStoreArgs).to(SubscribableContentStoreArgs)
myContainer.bind<SubscribableTreeStoreArgs>(TYPES.SubscribableTreeStoreArgs).to(SubscribableTreeStoreArgs)
myContainer.bind<SubscribableTreeUserStoreArgs>(TYPES.SubscribableTreeUserStoreArgs).to(SubscribableTreeUserStoreArgs)
myContainer.bind<SubscribableTreeLocationStoreArgs>(TYPES.SubscribableTreeLocationStoreArgs)
    .to(SubscribableTreeLocationStoreArgs)

myContainer.bind<IMutableSubscribableTreeStore>(TYPES.IMutableSubscribableTreeStore).to(MutableSubscribableTreeStore)
myContainer.bind<IMutableSubscribableTreeUserStore>(TYPES.IMutableSubscribableTreeUserStore)
    .to(MutableSubscribableTreeUserStore)
myContainer.bind<IMutableSubscribableTreeLocationStore>(TYPES.IMutableSubscribableTreeLocationStore)
    .to(MutableSubscribableTreeLocationStore)
myContainer.bind<IMutableSubscribableTreeLocation>(TYPES.IMutableSubscribableTreeLocation)
    .to(MutableSubscribableTreeLocation)
myContainer.bind<IMutableSubscribableContentStore>(TYPES.IMutableSubscribableContentStore)
    .to(MutableSubscribableContentStore)
myContainer.bind<IMutableSubscribableContentUserStore>(TYPES.IMutableSubscribableContentUserStore)
    .to(MutableSubscribableContentUserStore)

myContainer.bind<SubscribableStoreSourceArgs>(TYPES.SubscribableStoreSourceArgs)
    .to(SubscribableStoreSourceArgs)

myContainer.bind<MutableSubscribableGlobalStoreArgs>(TYPES.MutableSubscribableGlobalStoreArgs)
    .to(MutableSubscribableGlobalStoreArgs)

myContainer.bind<ISubscribableGlobalStore>(TYPES.ISubscribableGlobalStore).to(SubscribableGlobalStore)

myContainer.bind<SubscribableContentStoreSourceArgs>(TYPES.SubscribableContentStoreSourceArgs)
    .to(SubscribableContentStoreSourceArgs)

myContainer.bind<SubscribableContentUserStoreSourceArgs>(TYPES.SubscribableContentUserStoreSourceArgs)
    .to(SubscribableContentUserStoreSourceArgs)
myContainer.bind<SubscribableTreeStoreSourceArgs>(TYPES.SubscribableTreeStoreSourceArgs)
    .to(SubscribableTreeStoreSourceArgs)
myContainer.bind<SubscribableTreeLocationStoreSourceArgs>(TYPES.SubscribableTreeLocationStoreSourceArgs)
    .to(SubscribableTreeLocationStoreSourceArgs)
myContainer.bind<SubscribableTreeUserStoreSourceArgs>(TYPES.SubscribableTreeUserStoreSourceArgs)
    .to(SubscribableTreeUserStoreSourceArgs)
// myContainer.bind<ISubscribableStore<ISubscribableTreeCore>>
// (TYPES.ISubscribableStore_ISubscribableTreeCore).to(SubscribableStore)
/* ^^ TODO: Why can't i specify the interface on the SubscribableStore type? */
myContainer.bind<ISubscribableTreeStore>(TYPES.ISubscribableTreeStore).to(SubscribableTreeStore)
myContainer.bind<ISubscribableTreeUserStore>(TYPES.ISubscribableTreeUserStore).to(SubscribableTreeUserStore)
myContainer.bind<ISubscribableTreeLocationStore>(TYPES.ISubscribableTreeLocationStore).to(SubscribableTreeLocationStore)
myContainer.bind<ISubscribableContentUserStore>(TYPES.ISubscribableContentUserStore).to(SubscribableContentUserStore)
myContainer.bind<ISubscribableContentStore>(TYPES.ISubscribableContentStore).to(SubscribableContentStore)

myContainer.bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_DATA)
    .whenInjectedInto(SubscribableTreeStoreSourceArgs)
myContainer.bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_LOCATION_DATA)
    .whenInjectedInto(SubscribableTreeLocationStoreSourceArgs)
myContainer.bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.TREE_USER_DATA)
    .whenInjectedInto(SubscribableTreeUserStoreSourceArgs)
myContainer.bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.CONTENT_DATA)
    .whenInjectedInto(SubscribableContentStoreSourceArgs)
myContainer.bind<ObjectDataTypes>(TYPES.ObjectDataTypes).toConstantValue(ObjectDataTypes.CONTENT_USER_DATA)
    .whenInjectedInto(SubscribableContentUserStoreSourceArgs)

// rendering

myContainer.bind<radian>(TYPES.radian).toConstantValue(0)
myContainer.bind<SigmaNodesUpdaterArgs>(TYPES.SigmaNodesUpdaterArgs).to(SigmaNodesUpdaterArgs)
myContainer.bind<CanvasUI>(TYPES.CanvasUI).to(CanvasUI)
myContainer.bind<CanvasUIArgs>(TYPES.CanvasUIArgs)
    .to(CanvasUIArgs)

myContainer.bind<SigmaNodeArgs>(TYPES.SigmaNodeArgs).to(SigmaNodeArgs)
myContainer.bind<ISigmaRenderManager>(TYPES.SigmaRenderManager).to(SigmaRenderManager)
myContainer.bind<SigmaRenderManagerArgs>(TYPES.SigmaRenderManagerArgs).to(SigmaRenderManagerArgs)

myContainer.bind<StoreSourceUpdateListenerArgs>(TYPES.StoreSourceUpdateListenerArgs).to(StoreSourceUpdateListenerArgs)
myContainer.bind<IStoreSourceUpdateListener>(TYPES.IStoreSourceUpdateListener).to(StoreSourceUpdateListener)

myContainer.bind<StoreSourceUpdateListenerCoreArgs>(TYPES.StoreSourceUpdateListenerCoreArgs)
    .to(StoreSourceUpdateListenerCoreArgs)
myContainer.bind<IStoreSourceUpdateListenerCore>(TYPES.IStoreSourceUpdateListenerCore).to(StoreSourceUpdateListenerCore)

myContainer.bind<IRenderedNodesManager>(TYPES.IRenderedNodesManager).to(RenderedNodesManager)
myContainer.bind<IRenderedNodesManagerCore>(TYPES.IRenderedNodesManagerCore).to(RenderedNodesManagerCore)
myContainer.bind<RenderedNodesManagerArgs>(TYPES.RenderedNodesManagerArgs).to(RenderedNodesManagerArgs)
myContainer.bind<RenderedNodesManagerCoreArgs>(TYPES.RenderedNodesManagerCoreArgs).to(RenderedNodesManagerCoreArgs)
myContainer.bind<ISigmaNode>(TYPES.ISigmaNode).to(SigmaNode)
myContainer.bind<ISigmaRenderManager>(TYPES.ISigmaRenderManager).to(SigmaRenderManager)
myContainer.bind<ISigmaNodesUpdater>(TYPES.ISigmaNodesUpdater).to(SigmaNodesUpdater)

myContainer.bind<IColorSlice>(TYPES.IColorSlice).to(ColorSlice)
myContainer.bind<fGetSigmaIdsForContentId>(TYPES.fGetSigmaIdsForContentId).toConstantValue(() => [])
//  dataObjects

myContainer.bind<IDatedMutation<FieldMutationTypes>>(TYPES.IDatedMutation).toConstantValue({
    data: {id: '12345'},
    timestamp: Date.now(),
    type: FieldMutationTypes.SET,
})
myContainer.bind<IProppedDatedMutation<FieldMutationTypes, TreePropertyNames>>
(TYPES.IProppedDatedMutation).toConstantValue({
    data: {id: TREE_ID3},
    propertyName: TreePropertyNames.PARENT_ID,
    timestamp: Date.now(),
    type: FieldMutationTypes.SET,
})
myContainer.bind<ContentUserDataArgs>(TYPES.ContentUserDataArgs).to(ContentUserDataArgs)
myContainer.bind<DBSubscriberToTreeArgs>(TYPES.DBSubscriberToTreeArgs).to(DBSubscriberToTreeArgs)

myContainer.bind<IMutableSubscribablePoint>(TYPES.IMutableSubscribablePoint).to(MutableSubscribablePoint)
myContainer.bind<SubscribableMutablePointArgs>(TYPES.SubscribableMutablePointArgs).to(SubscribableMutablePointArgs)

myContainer.bind<ISubscribableContent>(TYPES.ISubscribableContent).to(SubscribableContent)
myContainer.bind<ISubscribableContentUser>(TYPES.ISubscribableContentUser).to(SubscribableContentUser)
myContainer.bind<ISubscribableTree>(TYPES.ISubscribableTree).to(SubscribableTree)
myContainer.bind<ISubscribableTreeUser>(TYPES.ISubscribableTreeUser).to(SubscribableTreeUser)
myContainer.bind<ISubscribableMutableField<boolean>>(TYPES.ISubscribableMutableBoolean).to(SubscribableMutableField)
myContainer.bind<SubscribableMutableFieldArgs>(TYPES.SubscribableMutableFieldArgs).to(SubscribableMutableFieldArgs)
myContainer.bind<SubscribableContentUserArgs>(TYPES.SubscribableContentUserArgs).to(SubscribableContentUserArgs)
myContainer.bind<ISubscribableMutableField<number>>(TYPES.ISubscribableMutableNumber).to(SubscribableMutableField)
myContainer.bind<ISubscribableMutableField<string>>(TYPES.ISubscribableMutableString).to(SubscribableMutableField)
myContainer.bind<ISubscribableMutableField<PROFICIENCIES>>(TYPES.ISubscribableMutableProficiency)
    .to(SubscribableMutableField)
myContainer.bind<ISubscribableMutableField<CONTENT_TYPES>>(TYPES.ISubscribableMutableContentType)
    .to(SubscribableMutableField)
myContainer.bind<ISubscribableMutableField<IProficiencyStats>>(TYPES.ISubscribableMutableProficiencyStats)
    .to(SubscribableMutableField)
myContainer.bind<ISubscribableMutableStringSet>(TYPES.ISubscribableMutableStringSet).to(SubscribableMutableStringSet)
//
myContainer.bind<SubscribableMutableStringSetArgs>
(TYPES.SubscribableMutableStringSetArgs).to(SubscribableMutableStringSetArgs)
myContainer.bind<SubscribableArgs>(TYPES.SubscribableArgs).to(SubscribableArgs)
myContainer.bind<SubscribableTreeArgs>(TYPES.SubscribableTreeArgs).to(SubscribableTreeArgs)
myContainer.bind<SubscribableTreeLocationArgs>(TYPES.SubscribableTreeLocationArgs).to(SubscribableTreeLocationArgs)

myContainer.bind<IMutableSubscribableTree>(TYPES.IMutableSubscribableTree).to(MutableSubscribableTree)
myContainer.bind<IMutableStringSet>(TYPES.IMutableStringSet).to(SubscribableMutableStringSet)

myContainer.bind<SubscribableTreeUserArgs>(TYPES.SubscribableTreeUserArgs).to(SubscribableTreeUserArgs)
myContainer.bind<IDatabaseSyncer>(TYPES.IDatabaseSyncer).to(SyncToDB)
myContainer.bind<SubscribableContentArgs>(TYPES.SubscribableContentArgs).to(SubscribableContentArgs)

myContainer.bind<any[]>(TYPES.Array).toDynamicValue((context: interfaces.Context) => [] )
// tslint:disable-next-line ban-types
myContainer.bind<Number>(TYPES.Number).toConstantValue(0)
myContainer.bind<PROFICIENCIES>(TYPES.PROFICIENCIES).toConstantValue(PROFICIENCIES.ONE)

// tslint:disable-next-line ban-types
myContainer.bind<String>(TYPES.String).toConstantValue('')
myContainer.bind<SyncToDBArgs>(TYPES.SyncToDBArgs).to(SyncToDBArgs)
myContainer.bind<ISaveUpdatesToDBFunction>(TYPES.ISaveUpdatesToDBFunction)
    .toConstantValue((updates: IDetailedUpdates) => void 0)
myContainer.bind<UIColor>(TYPES.UIColor).toConstantValue(UIColor.GRAY);
// tslint:disable-next-line ban-types
myContainer.bind<Object>(TYPES.Object).toDynamicValue((context: interfaces.Context) => ({}))

myContainer.bind<any>(TYPES.Any).toConstantValue(null)
myContainer.bind<boolean>(TYPES.Boolean).toConstantValue(false)
myContainer.bind<FirebaseSaverArgs>(TYPES.FirebaseSaverArgs).to(FirebaseSaverArgs)
myContainer.bind<ITree>(TYPES.ITree).to(SubscribableTree)
// TODO: maybe only use this constant binding for a test container. . . Not production container

myContainer.bind<IContentUserData>(TYPES.IContentUserData).to(ContentUserData)
myContainer.bind<IFirebaseRef>(TYPES.IFirebaseRef).to(FirebaseRef)

// myContainer.bind<Reference>(TYPES.Reference).to
myContainer.bind<IProficiencyStats>(TYPES.IProficiencyStats).toConstantValue(defaultProficiencyStats)

// ====================================================

//
// myContainer.bind<IDatedMutation<FieldMutationTypes>>(TYPES.IDatedMutation).toConstantValue({
//     data: {id: '12345'},
//     timestamp: Date.now(),
//     type: FieldMutationTypes.SET,
// })
// myContainer.load(stores)
// myContainer.load(loaders)
// myContainer.load(rendering)
// myContainer.load(dataObjects)
//
// /* myContainer.bind<ISubscribable<IDetailedUpdates>>
// (TYPES.Subscribable_IDetailedUpdates).to(Subscribable<IDetailedUpdates>);
//
//  */
// // myContainer.bind<IActivatableDatedMutation>(TYPES.IActivatableDatedMutationArr).to()

export {myContainer}
