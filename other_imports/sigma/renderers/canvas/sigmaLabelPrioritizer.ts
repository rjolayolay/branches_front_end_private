import sigmaImport from '../../sigma.core';
import {isMobile} from '../../../../app/core/utils';

const sigma: any = sigmaImport;
const A_BIG_NUMBER = 9001;
const windowAny: any = window;
const numColumnsOnScreen = isMobile.any();

export let labelLevels = {};

export let packageData = {
    width: 0,
    height: 0,
    numRowsOnScreen: 0,
    numColumnsOnScreen: 5,
    initialized: false,
    labels: {},
    labelLevels,
    rowHeight: sigma.settings.defaultLabelSize * 1.75,
    columnWidth: 100,
};

export function initializePackageData() {
    const graphContainer = document.querySelector('#graph-container');
    if (!graphContainer) {
        return; // e.g. a user is not on the knowledgeMap page
    }
    packageData.width = graphContainer.clientWidth;
    packageData.height = graphContainer.clientHeight;
    packageData.numRowsOnScreen = packageData.height / packageData.rowHeight;
    packageData.numColumnsOnScreen = packageData.width / packageData.columnWidth;
    packageData.initialized = true;
    clearLabelKnowledge();
    windowAny.packageData = packageData;

}
export function clearLabelKnowledge() {
    for (let row = 0; row < packageData.numRowsOnScreen; row++) {
        labelLevels[row] = [];
        for (let column = 0; column < packageData.numColumnsOnScreen; column++) {
            labelLevels[row][column] = {id: null, label: null, level: A_BIG_NUMBER};
        }
    }
}
