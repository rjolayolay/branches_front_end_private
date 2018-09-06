export const TYPES = {
	Any: Symbol('Any'),
	AppContainer: Symbol('AppContainer'),
	AppContainerArgs: Symbol('AppContainerArgs'),
	AppArgs: Symbol('AppArgs'),
	Array: Symbol('Array'),
	AutoSaveMutableSubscribableContentStoreArgs: Symbol('AutoSaveMutableSubscribableContentStoreArgs'),
	AutoSaveMutableSubscribableContentUserStoreArgs: Symbol('AutoSaveMutableSubscribableContentUserStoreArgs'),
	AutoSaveMutableSubscribableTreeStoreArgs: Symbol('AutoSaveMutableSubscribableTreeStoreArgs'),
	AutoSaveMutableSubscribableTreeLocationStoreArgs: Symbol('AutoSaveMutableSubscribableTreeLocationStoreArgs'),
	AutoSaveMutableSubscribableTreeUserStoreArgs: Symbol('AutoSaveMutableSubscribableTreeUserStoreArgs'),
	AuthListenerArgs: Symbol('AuthListenerArgs'),
	Boolean: Symbol('Boolean'),
	BranchesMapArgs: Symbol('BranchesMapArgs'),
	BranchesMapLoaderArgs: Symbol('BranchesMapLoaderArgs'),
	BranchesMapLoaderCoreArgs: Symbol('BranchesMapLoaderCoreArgs'),
	BranchesMapLoaderAndAutoSaverArgs: Symbol('BranchesMapLoaderAndAutoSaverArgs'),
	BranchesMapUtilsArgs: Symbol('BranchesMapUtilsArgs'),
	BranchesStore: Symbol('BranchesStore'),
	BranchesStoreState: Symbol('BranchesStoreState'),
	BranchesStoreArgs: Symbol('BranchesStoreArgs'),
	ContentUserDataArgs: Symbol('ContentUserDataArgs'),
	ContentLoaderArgs: Symbol('ContentLoaderArgs'),
	ContentLoaderAndAutoSaverArgs: Symbol('ContentLoaderAndAutoSaverArgs'),
	ContentUserLoaderArgs: Symbol('ContentUserLoaderArgs'),
	ContentUserLoaderAndAutoSaverArgs: Symbol('ContentUserLoaderAndAutoSaverArgs'),
	ContentUserLoaderAndOverdueListenerArgs: Symbol('ContentUserLoaderAndOverdueListenerArgs'),
	CanvasUI: Symbol('CanvasUI'),
	CanvasUIArgs: Symbol('CanvasUIArgs'),
	DBSubscriberToTreeArgs: Symbol('DBSubscriberToTreeArgs'),
	DBSubscriberToTreeUserArgs: Symbol('DBSubscriberToTreeUserArgs'),
	DBSubscriberToTreeLocationArgs: Symbol('DBSubscriberToTreeLocationArgs'),
	fGetStore: Symbol('fGetStore'),
	fImportSigma: Symbol('fImportSigma'),
	FamilyLoaderArgs: Symbol('FamilyLoaderArgs'),
	FamilyLoaderCoreArgs: Symbol('FamilyLoaderCoreArgs'),
	FirebaseReference: Symbol('Reference'),
	FirebaseSyncerArgs: Symbol('PropertyAutoFirebaseSaverArgs'),
	Function: Symbol('Function'),
	GlobalDataStoreBranchesStoreSyncerArgs: Symbol('GlobalDataStoreBranchesStoreSyncerArgs'),
	IActivatableDatedMutation: Symbol('IActivatableDatedMutation'),
	IActivatableDatedMutationArr: Symbol('IActivatableDatedMutationArr'),
	IApp: Symbol('IApp'),
	IAuthListener: Symbol('IAuthListener'),
	IAutoSaveMutableSubscribableContentUserStore: Symbol('IAutoSaveMutableSubscribableContentUserStore'),
	IBranchesMapUtils: Symbol('IBranchesMapUtils'),
	IBranchesMap: Symbol('IBranchesMap'),
	IBranchesMapLoader: Symbol('IBranchesMapLoader'),
	IBranchesMapLoaderCore: Symbol('IBranchesMapLoaderCore'),
	IBindable: Symbol('IBindable'),
	ICanvasUI: Symbol('ICanvasUI'),
	IColorSlice: Symbol('IColorSlice'),
	IContentData: Symbol('IContentData'),
	IContentIdSigmaIdMap: Symbol('IContentIdSigmaIdMap'),
	IContentLoader: Symbol('IContentLoader'),
	IContentUserLoader: Symbol('IContentUserLoader'),
	IContentUserData: Symbol('IContentUserData'),
	Id: Symbol('Id'),
	IDatedSetMutation: Symbol('IDatedSetMutation'),
	IDatabaseAutoSaver: Symbol('IDatabaseAutoSaver'),
	IDBSubscriber: Symbol('IDBSubscriber'),
	IDBSubscriberToTreeLocation: Symbol('IDBSubscriberToTreeLocation'),
	IDBSubscriberToTree: Symbol('IDBSubscriberToTree'),
	IDatedMutation: Symbol('IDatedMutation'),
	IFamilyLoader: Symbol('IFamilyLoader'),
	IFamilyLoaderCore: Symbol('IFamilyLoaderCore'),
	IGlobalDataStoreBranchesStoreSyncer: Symbol('IGlobalDataStoreBranchesStoreSyncer'),
	IKnawledgeMapCreator: Symbol('IKnawledgeMapCreator'),
	IManagedSigmaNodeCreatorCore: Symbol('IManagedSigmaNodeCreatorCore'),
	IMutableId: Symbol('IMutableField'),
	IMutableStringSet: Symbol('IMutableStringSet'),
	IMutableSubscribableUserInfo: Symbol('IMutableSubscribableUserInfo'),
	IMutableSubscribableTree: Symbol('IMutableSubscribableTree'),
	IMutableSubscribableTreeStore: Symbol('IMutableSubscribableTreeStore'),
	IMutableSubscribableTreeUserStore: Symbol('IMutableSubscribableTreeUserStore'),
	IMutableSubscribableTreeUser: Symbol('IMutableSubscribableTreeUser'),
	IMutableSubscribableTreeLocation: Symbol('IMutableSubscribableTreeLocation'),
	IMutableSubscribableTreeLocationStore: Symbol('IMutableSubscribableTreeLocationStore'),
	IMutableSubscribableContent: Symbol('IMutableSubscribableContent'),
	IMutableSubscribableContentUser: Symbol('IMutableSubscribableContentUser'),
	IMutableSubscribableContentUserStore: Symbol('IMutableSubscribableContentUserStore'),
	IMutableSubscribableContentStore: Symbol('IMutableSubscribableContentStore'),
	IMutableSubscribableGlobalStore: Symbol('IMutableSubscribableGlobalStore'),
	INewTreeComponentCreator: ('INewTreeComponentCreator'),
	IOverdueListener: Symbol('IOverdueListener'),
	IOverdueListenerCore: Symbol('IOverdueListenerCore'),
	IOneToManyMap: Symbol('IOneToManyMap'),
	IProficiencyStats: Symbol('IProficiencyStats'),
	IProppedDatedMutation: Symbol('IProppedDatedMutation'),
	IRenderManager: Symbol('IRenderManager'),
	IRenderManagerCore: Symbol('IRenderManagerCore'),
	ISaveUpdatesToDBFunction: Symbol('ISaveUpdatesToDBFunction'),
	ISigma: Symbol('ISigma'),
	ISigmaCamera: Symbol('ISigmaCamera'),
	ISigmaEdge: Symbol('ISigmaEdge'),
	ISigmaEdges: Symbol('ISigmaEdges'),
	ISigmaEdgesUpdater: Symbol('ISigmaEdgesUpdater'),
	ISigmaFactory: Symbol('ISigmaFactory'),
	ISigmaGraph: Symbol('ISigmaGraph'),
	ISigmaNode: Symbol('ISigmaNode'),
	ISigmaNodeCreator: Symbol('ISigmaNodeCreator'),
	ISigmaNodeCreatorCore: Symbol('ISigmaNodeCreatorCore'),
	ISigmaNodeCreatorCaller: Symbol('IStoreSourceUpdateListener'),
	ISigmaNodeData: Symbol('ISigmaNodeData'),
	ISigmaNodes: Symbol('ISigmaNodes'),
	ISigmaNodeLoader: Symbol('ISigmaNodeLoader'),
	ISigmaNodeLoaderCore: Symbol('ISigmaNodeLoaderCore'),
	ISigmaNodesRemover: Symbol('ISigmaNodesRemover'),
	ISigmaNodesUpdater: Symbol('ISigmaNodesUpdater'),
	ISigmaRenderManager: Symbol('ISigmaRenderManager'),
	ISigmaUpdater: Symbol('ISigmaUpdater'),
	ISpecialTreeLoader: Symbol('ISpecialTreeLoader'),
	IStoreSourceUpdateListener: Symbol('IStoreSourceUpdateListener'),
	IStoreSourceUpdateListenerCore: Symbol('IStoreSourceUpdateListenerCore'),
	ISubscribableContent: Symbol('ISubscribableContent'),
	ISubscribableContentStore: Symbol('ISubscribableContentStore'),
	ISubscribableContentStoreSource: Symbol('ISubscribableContentStoreSource'),
	ISubscribableContentUser: Symbol('ISubscribableContentUser'),
	ISubscribableContentUserStore: Symbol('ISubscribableContentUserStore'),
	ISubscribableContentUserStoreSource: Symbol('ISubscribableContentUserStoreSource'),
	ISubscribableGlobalStore: Symbol('ISubscribableGlobalStore'),
	ISubscribableBranchesMap: Symbol('ISubscribableBranchesMap'),
	IMutableSubscribableBoolean: Symbol('IMutableSubscribableBoolean'),
	IMutableSubscribableBranchesMap: Symbol('IMutableSubscribableBranchesMap'),
	IMutableSubscribableNumber: Symbol('IMutableSubscribableNumber'),
	IMutableSubscribableContentType: Symbol('IMutableSubscribableContentType'),
	IMutableSubscribableProficiency: Symbol('IMutableSubscribableProficiency'),
	IMutableSubscribableProficiencyStats: Symbol('IMutableSubscribableProficiencyStats'),
	IMutableSubscribableString: Symbol('IMutableSubscribableString'),
	ISubscribableMutableStringSet: Symbol('IMutableSubscribableStringSet'),
	ISubscribableStore_ISubscribableTreeCore: Symbol('ISubscribableStore_ISubscribableTreeCore'),
	ISubscribableTree: Symbol('ISubscribableTreeCore'),
	ISubscribableTreeStoreSource: Symbol('ISubscribableTreeStoreSource'),
	ISubscribableTreeLocation: Symbol('ISubscribableTreeLocation'),
	ISubscribableTreeLocationStore: Symbol('ISubscribableTreeLocationStore'),
	ISubscribableTreeLocationStoreSource: Symbol('ISubscribableTreeLocationStoreSource'),
	ISubscribableTreeUser: Symbol('ISubscribableTreeUser'),
	ISubscribableTreeUserStore: Symbol('ISubscribableTreeUserStore'),
	ISubscribableTreeUserStoreSource: Symbol('ISubscribableTreeUserStoreSource'),
	ISubscribableTreeStore: Symbol('ISubscribableTreeStore'),
	IMutableSubscribablePoint: Symbol('IMutableSubscribablePoint'),
	ISubscriber_ITypeAndIdAndValUpdate_Array: Symbol('ISubscriber_ITypeAndIdAndValUpdate_Array'),
	ISyncableValableObject: Symbol('ISyncableValableObject'),
	ISyncableMutableSubscribableContent: Symbol('ISyncableMutableSubscribableContent'),
	ISyncableMutableSubscribableContentUser: Symbol('ISyncableMutableSubscribableContentUser'),
	ISyncableMutableSubscribableTree: Symbol('ISyncableMutableSubscribableTree'),
	ISyncableMutableSubscribableTreeUser: Symbol('ISyncableMutableSubscribableTreeUser'),
	ISyncableMutableSubscribableTreeLocation: Symbol('ISyncableMutableSubscribableTreeLocation'),
	ITooltipOpener: Symbol('ITooltipOpener'),
	ITooltipRenderer: Symbol('ITooltipRenderer'),
	ITooltipRendererFunction: Symbol('ITooltipRendererFunction'),
	ITree: Symbol('ITree'),
	ITreeCreator: Symbol('ITreeCreator'),
	ITreeLoader: Symbol('ITreeLoader'),
	ITreeLocation: Symbol('ITreeLocation'),
	ITreeLocationData: Symbol('ITreeLocationData'),
	ITreeLocationLoader: Symbol('ITreeLocationLoader'),
	ITreeUser: Symbol('ITree'),
	ITreeUserLoader: Symbol('ITreeUserLoader'),
	IVueConfigurer: Symbol('IVueConfigurer'),
	IUserLoader: Symbol('IUserLoader'),
	IUserUtils: Symbol('IUserUtils'),
	IVuexStore: Symbol('IVuexStore'),
	KnawledgeMapCreatorArgs: Symbol('KnawledgeMapCreatorArgs'),
	ManagedSigmaNodeCreatorCoreArgs: Symbol('ManagedSigmaNodeCreatorCoreArgs'),
	MockSigmaArgs: Symbol('MockSigmaArgs'),
	MockSigmaGraphArgs: Symbol('MockSigmaGraphArgs'),
	MutableSubscribableBranchesMapArgs: Symbol('MutableSubscribableBranchesMapArgs'),
	MutableSubscribablePointArgs: Symbol('MutableSubscribablePointArgs'),
	MutableSubscribableGlobalStoreArgs: Symbol('MutableSubscribableGlobalStoreArgs'),
	NewTreeComponentCreatorArgs: Symbol('NewTreeComponentCreatorArgs'),
	Number: Symbol('Number'),
	Object: Symbol('Object'),
	ObjectFirebaseAutoSaverArgs: Symbol('ObjectFirebaseAutoSaverArgs'),
	OverdueListenerArgs: Symbol('OverdueListenerArgs'),
	ObjectDataTypes: Symbol('CustomStoreDataTypes'),
	OverdueListenerMutableSubscribableContentUserStoreArgs:
		Symbol('OverdueListenerMutableSubscribableContentUserStoreArgs'),
	OneToManyMapArgs: Symbol('OneToManyMapArgs'),
	PropertyFirebaseSaverArgs: Symbol('PropertyFirebaseSaverArgs'),
	PROFICIENCIES: Symbol('PROFICIENCIES'),
	RenderedNodesManagerArgs: Symbol('RenderManagerArgs'),
	RenderedNodesManagerCoreArgs: Symbol('RenderManagerCoreArgs'),
	Tree2ComponentCreatorArgs: Symbol('Tree2ComponentCreatorArgs'),
	TreeCreatorArgs: Symbol('TreeCreatorArgs'),
	Sigma: Symbol('Sigma'),
	SigmaConfigs: Symbol('SigmaConfigs'),
	SigmaEventListenerArgs: Symbol('SigmaEventListenerArgs'),
	SigmaEventListener: Symbol('SigmaEventListener'),
	SigmaEdgesUpdaterArgs: Symbol('SigmaEdgesUpdaterArgs'),
	SigmaFactoryArgs: Symbol('SigmaFactoryArgs'),
	SigmaNodeArgs: Symbol('SigmaNodeArgs'),
	SigmaNodeCreatorCoreArgs: Symbol('SigmaNodeCreatorCoreArgs'),
	SigmaNodeCreatorArgs: Symbol('SigmaNodeCreatorArgs'),
	SigmaNodeLoaderArgs: Symbol('SigmaNodeLoaderArgs'),
	SigmaNodeLoaderCoreArgs: Symbol('SigmaNodeLoaderCoreArgs'),
	SigmaNodesRemoverArgs: Symbol('SigmaNodesRemoverArgs'),
	SigmaNodesUpdaterArgs: Symbol('SigmaNodesUpdaterArgs'),
	SigmaRenderManagerArgs: Symbol('SigmaRenderManagerArgs'),
	SigmaUpdaterArgs: Symbol('SigmaUpdaterArgs'),
	SpecialTreeLoaderArgs: Symbol('SpecialTreeLoaderArgs'),
	String: Symbol('String'),
	StringNotEmpty: Symbol('StringNotEmpty'),
	StoreSourceUpdateListenerArgs: Symbol('StoreSourceUpdateListenerArgs'),
	StoreSourceUpdateListenerCoreArgs: Symbol('StoreSourceUpdateListenerCoreArgs'),
	Subscribable: Symbol('Subscribable'),
	SubscribableArgs: Symbol('SubscribableArgs'),
	SubscribableBranchesMapArgs: Symbol('SubscribableBranchesMapArgs'),
	SubscribableContentArgs: Symbol('SubscribableContentArgs'),
	SubscribableContentStoreArgs: Symbol('SubscribableContentStoreArgs'),
	SubscribableContentStoreSourceArgs: Symbol('SubscribableContentStoreSourceArgs'),
	SubscribableContentUserArgs: Symbol('SubscribableContentUserArgs'),
	SubscribableContentUserStoreArgs: Symbol('SubscribableContentUserStoreArgs'),
	SubscribableContentUserStoreSourceArgs: Symbol('SubscribableContentUserStoreSourceArgs'),
	SubscribableStoreArgs: Symbol('SubscribableStoreArgs'),
	SubscribableStoreSourceArgs: Symbol('SubscribableStoreSourceArgs'),
	SubscribableGlobalStoreArgs: Symbol('SubscribableGlobalStoreArgs'),
	MutableSubscribableFieldArgs: Symbol('ISubscribableMutableFieldArgs'),
	MutableSubscribableStringSetArgs: Symbol('MutableSubscribableStringSetArgs'),
	SubscribableTreeArgs: Symbol('SubscribableTreeArgs'),
	SubscribableTreeStoreArgs: Symbol('SubscribableTreeStoreArgs'),
	SubscribableTreeUserArgs: Symbol('SubscribableTreeUserArgs'),
	SubscribableTreeUserStoreArgs: Symbol('SubscribableTreeUserStoreArgs'),
	SubscribableTreeUserStoreSourceArgs: Symbol('SubscribableTreeUserStoreSourceArgs'),
	SubscribableTreeLocationArgs: Symbol('SubscribableTreeLocationArgs'),
	SubscribableTreeLocationStoreArgs: Symbol('SubscribableTreeLocationStoreArgs'),
	SubscribableTreeLocationStoreSourceArgs: Symbol('SubscribableTreeLocationStoreSourceArgs'),
	SubscribableTreeStoreSourceArgs: Symbol('SubscribableTreeStoreSourceArgs'),
	SubscribableUserArgs: Symbol('SubscribableUserArgs'),
	PropertyAutoFirebaseSaverArgs: Symbol('PropertyAutoFirebaseSaverArgs'),
	SyncToFirebaseArgs: Symbol('PropertyAutoFirebaseSaverArgs'),
	TooltipOpenerArgs: Symbol('TooltipOpenerArgs'),
	TooltipRendererArgs: Symbol('TooltipRendererArgs'),
	TreeComponentCreatorArgs: Symbol('TreeComponentCreatorArgs'),
	TreeComponentCreator2Args: Symbol('TreeComponentCreator2Args'),
	TreeLoaderAndAutoSaverArgs: Symbol('TreeLoaderAndAutoSaverArgs'),
	TreeLoaderArgs: Symbol('TreeLoaderArgs'),
	TreeLocationLoaderArgs: Symbol('TreeLocationLoaderArgs'),
	TreeLocationLoaderAndAutoSaverArgs: Symbol('TreeLocationLoaderAndAutoSaverArgs'),
	TreeUserLoaderArgs: Symbol('TreeUserLoaderArgs'),
	UserLoaderArgs: Symbol('UserLoaderArgs'),
	UserLoaderAndAutoSaverArgs: Symbol('UserLoaderAndAutoSaverArgs'),
	UserUtilsArgs: Symbol('UserUtilsArgs'),
	UIColor: Symbol('UIColor'),
	VueConfigurerArgs: Symbol('VueConfigurerArgs'),
	fGetSigmaIdsForContentId: Symbol('fGetSigmaIdsForContentId'),
	radian: Symbol('radian'),
};
