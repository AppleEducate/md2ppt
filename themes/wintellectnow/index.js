const path = require('path');

// theme variables
const layoutWidth = 13.6;
const layoutHeight = 7.65;
const layoutMargins = [ 0.25, 0.25, 0.25, 0.25 ];
const lightBackground = 'FFFFFF';
const darkBackground = '3A525F';

const titleSlideFontFamily = 'Segoe UI Light';
const titleSlideFontColor = 'FFFFFF';
const seriesTitleFontSize = 54;
const episodeTitleFontSize = 36;
const authorNameFontSize = 32;
const authorEmailFontSize = 24;
const versionLabelFontSize = 20;

const titleFontFamily = 'Segoe UI Light';
const titleFontSize = '48';
const titleColor = '48';

const contentFontFamily = 'Segoe UI';
const contentFontSize = '28';
const contentColor = '28';

const logoPath = path.join(__dirname, 'wintellect_logo.png');

const titleSlideTextLines = [
    [ 'seriesTitle', {
        x: 0.61, y: 2.32, w: 11, h: 1, margin: 5,
        color: titleSlideFontColor, align: 'left', valign: 'top',
        font_face: titleSlideFontFamily, font_size: seriesTitleFontSize,
    } ],
    [ 'episodeTitle' , { y: 3.17, h: 0.5, font_size: episodeTitleFontSize } ],
    [ 'authorName' , { y: 4.32, font_size: authorNameFontSize } ],
    [ 'authorTitle' , { y: 4.82 } ],
    [ 'authorEmail' , { y: 5.32, font_size: authorEmailFontSize } ],
    [ 'versionLabel' , { x: 8.3, y: 2.75, w: 3, font_size: versionLabelFontSize } ],
];

const footerBox = [
    { type:'rectangle', x:0, y:layoutHeight-0.82, w:'100%', h:0.82, fill:'FFFFFF' },
    { type: 'image', path:logoPath, x:0.47, y:7.03, h: 0.39, w:1.04 },
];

// theme export
module.exports = {
    layoutWidth,
    layoutHeight,
    layoutMargins,
    lightBackground,
    darkBackground,
    titleFontFamily,
    titleFontSize,
    contentFontFamily,
    contentFontSize,
    logoPath,
    titleSlideTextLines,
    masters: {
        MASTER_SLIDE: {
            title:  'Master Slide',
            margin: layoutMargins,
            bkgd:   lightBackground,
        },
        TITLE_SLIDE: {
            title:  'Title Slide',
            margin: layoutMargins,
            bkgd:   darkBackground,
            shapes: [
                ...footerBox
            ],
        },
        TITLE_AND_CONTENT_SLIDE: {
            title:  'Title and Content Slide',
            margin: layoutMargins,
            bkgd:   lightBackground,
        },
        DEMO_SLIDE: {
            title:  'Demo Slide',
            margin: layoutMargins,
            bkgd:   darkBackground,
            shapes: [
                { 
                    type: 'text', text: 'Demo', x: 0.60, y: 2.30, w:10, h:2,
                    align:'left', valign:'bottom', font_size: 72,
                    font_face: 'Segoe UI Light', color: 'FFFFFF',
                },
                ...footerBox
            ],
        },
        WEBSITE_SLIDE: {
            title:  'Website Slide',
            margin: layoutMargins,
            bkgd:   darkBackground,
            shapes: [
                ...footerBox
            ],
        },
    }
};