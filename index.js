const fs = require('fs');

const pptx = require('pptxgenjs');

const { MarkdownSlideDeck } = require('./markdown-slide-deck');
const { MarkdownSlide } = require('./markdown-slide');
const {
    layoutWidth, layoutHeight, contentFontFamily,
    titleFontFamily, titleSlideTextLines, masters
} = require('./themes/wintellectnow');

const mdContent = fs.readFileSync('./sample.md', 'utf8');

const slideDeck = new MarkdownSlideDeck(mdContent);

pptx.setTitle(slideDeck.title);
pptx.setSubject(slideDeck.subject);
pptx.setAuthor(slideDeck.authorName);
pptx.setRevision(slideDeck.revision);
pptx.setCompany(slideDeck.company);
pptx.setLayout({ name:'CUSTOM', width: layoutWidth, height: layoutHeight });

const titleSlide = pptx.addNewSlide( masters.TITLE_SLIDE );
titleSlideTextLines.reduce((textLineOptions, textLine) => {
    textLineOptions = Object.assign({}, textLineOptions, textLine[1]);
    titleSlide.addText(slideDeck[textLine[0]], textLineOptions);
    return textLineOptions;
}, {});

slideDeck.slides.forEach(slide => {
    const s = pptx.addNewSlide( Object.keys(masters).find(key => masters[key].title === slide.master) );
    s.addText(slide.title, { x: 0.3, y: 0.32, h:0.75, w:13, valign:'top', align:'left', font_face: titleFontFamily, font_size: 48, color: '3F3F3F' });

    s.addText(slide.subtitle, { x: 0.3, y: 1.07, h:0.5, w:13, valign:'top', align:'left', font_face: titleFontFamily, font_size: 40, color: 'EB3428' });

    const contentItems = slide.contentItems.map(contentItem => '- ' + contentItem).join('\n');
    s.addText(contentItems, { x: 0.3, y: 2, h:4.75, w:13, valign:'top', align:'left', font_face: contentFontFamily, font_size: 28, color: '000000' });

});

pptx.save('sample', err => {

    if (err) {
        console.error(err);
        return;
    }

    console.log('saved!');
    return;

});