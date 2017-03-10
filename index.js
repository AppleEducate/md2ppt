const fs = require('fs');
const { EOL } = require('os');

const pptx = require('pptxgenjs');
const program = require('commander');
 
program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-t, --theme [theme name]', 'Specify a theme')
  .option('-o, --output [file name]', 'Specify file name')
  .parse(process.argv);

if (!program.theme) {
    process.stdout.write('Please specify a theme.' + EOL);
    return;
}

if (!program.output) {
    process.stdout.write('Please specify an output file.' + EOL);
    return;
}

if (program.args.length !== 1) {
    process.stdout.write('Please specify an input file.' + EOL);
    return;
}


const { MarkdownSlideDeck } = require('./markdown-slide-deck');
const { MarkdownSlide } = require('./markdown-slide');
const {
    layoutWidth, layoutHeight, contentFontFamily,
    titleFontFamily, titleSlideTextLines, masters
} = require('./themes/' + program.theme);

const mdContent = fs.readFileSync(program.args[0], 'utf8');

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

    const masterKey = Object.keys(masters).find(key => masters[key].title === slide.master);
    const newSlide = pptx.addNewSlide(masters[masterKey]);

    switch(masterKey) {
        case 'DEMO_SLIDE':
            newSlide.addText(slide.title, { x: 0.60, y: 4.15, h: 0.75, w: 10, valign:'top', align:'left', font_face: titleFontFamily, font_size: 32, color: 'FFFFFF' });
            break;
        default:
            newSlide.addText(slide.title, { x: 0.3, y: 0.32, h:0.75, w:13, valign:'top', align:'left', font_face: titleFontFamily, font_size: 48, color: '3F3F3F' });
            newSlide.addText(slide.subtitle, { x: 0.3, y: 1.07, h:0.5, w:13, valign:'top', align:'left', font_face: titleFontFamily, font_size: 40, color: 'EB3428' });
            const contentItems = slide.contentItems.map(contentItem => '- ' + contentItem).join('\n');
            newSlide.addText(contentItems, { x: 0.3, y: 2, h:4.75, w:13, valign:'top', align:'left', font_face: contentFontFamily, font_size: 28, color: '000000' });
            break;
    }


});

pptx.save(program.output, () => {});