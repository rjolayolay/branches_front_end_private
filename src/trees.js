import {Facts} from './facts.js'
import {Tree} from './tree.js'
import {Config} from './config.js'
import getFirebase from './firebaseService.js'
const firebase = getFirebase()
console.log('trees.js imported')
const trees = {
}
const offlineTreesData = {
    //LAST UPDATED 6/28 9am
    "1":
        {
            "factId":"24",
            "id": "1",
            "x":"0",
            "y":"0",
            "children": ["075d07593a01ae43d7e045e7effadfb2","35d917de5c0bd13a49d6e86bb7c540c1"]
        },
    "075d07593a01ae43d7e045e7effadfb2":
        {
            "factId":"c8d26306d29ff13f0c1010ee0467d47a",
            "id":"075d07593a01ae43d7e045e7effadfb2",
            "parentId":"1",
            "x":"300",
            "y":"300"
        },
    "35d917de5c0bd13a49d6e86bb7c540c1": // the more you learn the more you earn
        {
            "factId":"bc62641cfd029c281b8ce6135d8991e0",
            "id":"35d917de5c0bd13a49d6e86bb7c540c1",
            "parentId":"1",
            "x":"500",
            "y":"400"
        }
};

//
// Facts.getAll((facts) => {
//    var i = 0;
//    Object.keys(facts).forEach((factId) => {
//        const tree = new Tree(factId, null)
//        tree.x = 100 * i;
//        tree.y = 100 * i;
//        trees[tree.id] = tree;
//        i++;
//    })
// })

export class Trees {
    static getAll(success){
        if (Config.offlineMode){
            success(trees)
        }
    }
    // static get(treeId, success){
    //     let tree;
    //     if (Config.offlineMode){
    //         tree = offlineTreesData[treeId]
    //         success(tree)
    //     } else {
    //        firebase.database().ref('trees/' + treeId).on("value", function(snapshot){
    //            tree = snapshot.val()
    //            success(tree)
    //        })
    //     }
    // }
    //returns promise
    //TODO: make resolve "null" or something if fact not found
    static get(treeId){
        return new Promise((resolve, reject) => {
            let treeObj;
            if (Config.offlineMode){
                treeObj = offlineTreesData[treeId]
                var tree = new Tree(treeObj)
                resolve(tree)
            } else {
                if (trees[treeId]){
                    console.log('tree id', treeId, 'found locally')
                    resolve(trees[treeId])
                } else {
                    console.log('tree id', treeId, ' NOT found locally')
                    firebase.database().ref('trees/' + treeId).on("value", function(snapshot){
                        treeObj = snapshot.val()
                        console.log('the tree Obj passed into tree constructor is', treeObj)
                        var tree = new Tree(treeObj)
                        trees[tree.id] = tree
                        console.log('the tree just loaded from trees.get is', tree)
                        resolve(tree)
                    })
                }
            }
        })
    }
}
