const TREE_ID = '12334'
const TREE_ID2 = '1252334'
const CONTENT_ID = '5982347'
const SIGMA_ID1 = TREE_ID
const SIGMA_ID2 = TREE_ID2
function getSigmaIdsForContentId(contentId) {
    switch (contentId) {
        case CONTENT_ID:
            return [SIGMA_ID1, SIGMA_ID2]
    }
}

export {TREE_ID, TREE_ID2, SIGMA_ID1, SIGMA_ID2, CONTENT_ID, getSigmaIdsForContentId}
