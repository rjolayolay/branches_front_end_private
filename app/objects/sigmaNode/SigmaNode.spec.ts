import {injectFakeDom} from '../../testHelpers/injectFakeDom';
injectFakeDom();
import 'reflect-metadata'
import test from 'ava'
import {expect} from 'chai'
import {myContainer, myContainerLoadAllModules} from '../../../inversify.config';
import {ContentItemUtils} from '../contentItem/ContentItemUtils';
import {ContentUserDataUtils} from '../contentUser/ContentUserDataUtils';
import {CONTENT_TYPES, ITreeLocationData} from '../interfaces';
import {
    IContentData, IContentUserData,
    ICoordinate, IProficiencyStats, ISigmaNode,
    ITreeDataWithoutId, ITreeUserData
} from '../interfaces';
import {PROFICIENCIES} from '../proficiency/proficiencyEnum';
import {TYPES} from '../types';
import {SigmaNodeUtils} from './SigmaNodeUtils';
import {linkSync} from 'fs';
import {
    sampleTreeData1, sampleTreeData1Children, sampleTreeData1ContentId,
    sampleTreeData1ParentId
} from '../tree/treeTestHelpers';
import {
    sampleContentUser1OverdueVal, sampleContentUserData1, sampleContentUser1ProficiencyVal,
    sampleContentUser1Id
} from '../contentUser/ContentUserHelpers';
import {
    sampleTreeLocationData1, sampleTreeLocationData1x,
    sampleTreeLocationData1y
} from '../treeLocation/treeLocationTestHelpers';

myContainerLoadAllModules({fakeSigma: true});
test('sigmaNode:::receive new tree', (t) => {
    const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode);

    sigmaNode.receiveNewTreeData(sampleTreeData1);
    expect(sigmaNode.parentId).to.equal(sampleTreeData1ParentId);
    expect(sigmaNode.contentId).to.equal(sampleTreeData1ContentId);
    expect(sigmaNode.children).to.deep.equal(sampleTreeData1Children);
    t.pass()
});
test('sigmaNode:::receive new treeUserData', (t) => {
    const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode);

    const aggregationTimer = 1000;
    const proficiencyStats = {
        TWO: 3,
        UNKNOWN: 3
    } as IProficiencyStats;
    const treeUserData: ITreeUserData = {
        aggregationTimer, // seconds
        proficiencyStats,
    };
    const colorSlices = SigmaNodeUtils.getColorSlicesFromProficiencyStats(treeUserData.proficiencyStats);
    sigmaNode.receiveNewTreeUserData(treeUserData);
    expect(sigmaNode.aggregationTimer).to.equal(aggregationTimer);
    expect(sigmaNode.colorSlices).to.deep.equal(colorSlices);
    expect(sigmaNode.proficiencyStats).to.deep.equal(proficiencyStats);
    t.pass()
});
test('sigmaNode:::receive new ContentData', (t) => {
    const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode);
    const contentData: IContentData = {
        answer: 'Columbus',
        question: 'Ohio',
        type: CONTENT_TYPES.FACT
    };
    const label = ContentItemUtils.getLabelFromContent(contentData);
    /* QUESTION / TODO: Doesn't this entire test seem useless?
     e.g. a redundant implementation of the implementation? */

    sigmaNode.receiveNewContentData(contentData);
    expect(sigmaNode.content).to.equal(contentData);
    expect(sigmaNode.label).to.equal(label);
    t.pass()
});
test('sigmaNode:::receive new ContentUserData', (t) => {
    const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode);
    const size = ContentUserDataUtils.getSizeFromContentUserData(sampleContentUserData1);
    /* QUESTION / TODO: Doesn't this entire test seem useless?
     e.g. a redundant implementation of the implementation? */

    sigmaNode.receiveNewContentUserData(sampleContentUserData1);
    expect(sigmaNode.size).to.equal(size);
    expect(sigmaNode.overdue).to.equal(sampleContentUser1OverdueVal);
    expect(sigmaNode.proficiency).to.equal(sampleContentUser1ProficiencyVal);
    expect(sigmaNode.contentUserId).to.equal(sampleContentUser1Id);
    expect(sigmaNode.contentUserData).to.deep.equal(sampleContentUserData1);
    t.pass()
});
test('sigmaNode:::receive new TreeLocation', (t) => {
    const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode);
    /* QUESTION / TODO: Doesn't this entire test seem useless?
     e.g. a redundant implementation of the implementation? */

    sigmaNode.receiveNewTreeLocationData(sampleTreeLocationData1);
    expect(sigmaNode.x).to.equal(sampleTreeLocationData1x);
    expect(sigmaNode.y).to.equal(sampleTreeLocationData1y);
    t.pass()
});
