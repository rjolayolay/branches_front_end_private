import {MutableSubscribableField} from '../../objects/field/MutableSubscribableField';
import {
    IHash, IMutableSubscribableBranchesMap, IBranchesMapData, CONTENT_TYPES,
    ISyncableMutableSubscribableBranchesMap, IBranchesMapDataFromDB, timestamp, id
} from '../../objects/interfaces';
import {SyncableMutableSubscribableBranchesMap} from '../../objects/branchesMap/SyncableMutableSubscribableBranchesMap';
import {isValidBranchesMapDataFromDB} from '../../objects/branchesMap/branchesMapValidator';
import {log} from '../../core/log'
import {GLOBAL_MAP_ROOT_TREE_ID} from '../../core/globals';

export class BranchesMapDeserializer {
   public static deserialize(
       {branchesMapData}: {branchesMapData: IBranchesMapData}
       ): ISyncableMutableSubscribableBranchesMap {
       const rootTreeId
           = new MutableSubscribableField<id>({field: branchesMapData.rootTreeId})
       const user: ISyncableMutableSubscribableBranchesMap = new SyncableMutableSubscribableBranchesMap(
           {
               updatesCallbacks: [],
               rootTreeId,
           })
       log('J14I: The Deserialized BranchesMap is', user)
       return user
   }
   public static convertBranchesMapDataFromDBToApp(
       {branchesMapDataFromDB}: {branchesMapDataFromDB: IBranchesMapDataFromDB}): IBranchesMapData {
      const branchesMapData: IBranchesMapData = {
          rootTreeId:
            branchesMapDataFromDB.rootTreeId && branchesMapDataFromDB.rootTreeId.val || GLOBAL_MAP_ROOT_TREE_ID,
      }
      return branchesMapData
   }
    public static deserializeFromDB(
        {branchesMapDataFromDB }: {branchesMapDataFromDB: IBranchesMapDataFromDB}
    ): ISyncableMutableSubscribableBranchesMap {
       if (!isValidBranchesMapDataFromDB(branchesMapDataFromDB)) {
           throw new Error('Cannot deserialize user from db with  value of ' + branchesMapDataFromDB)
       }
       const branchesMapData: IBranchesMapData =
           BranchesMapDeserializer.convertBranchesMapDataFromDBToApp({branchesMapDataFromDB})
       log('branchesMapData from db is', branchesMapData)
       const user: ISyncableMutableSubscribableBranchesMap
            = BranchesMapDeserializer.deserialize({branchesMapData})
       return user
    }
}