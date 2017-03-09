const { markdown } = require('markdown');

const { MarkdownSlide } = require('./markdown-slide');

class MarkdownSlideDeck {

    constructor(markdownContent) {
        this.tree = markdown.parse(markdownContent);
        this.process();
    }

    process() {

        const titleNodeIndex = this.tree.findIndex(node => node[0] === 'header' && node[1].level === 1);
        this.titleNode = this.tree[titleNodeIndex];
        this.title = this.titleNode[2];
        const metadataNode = this.tree[titleNodeIndex + 1];
        metadataNode[1].split('\n').forEach(metadata => {

            const [ fieldName, fieldValue ] = metadata.split(':');

            switch(fieldName.trim()) {
                case 'Series Title':
                    this.seriesTitle = fieldValue.trim();
                    break;
                case 'Episode Title':
                    this.episodeTitle = fieldValue.trim();
                    break;
                case 'Version Label':
                    this.versionLabel = fieldValue.trim();
                    break;
                case 'Author Name':
                    this.authorName = fieldValue.trim();
                    break;
                case 'Author Title':
                    this.authorTitle = fieldValue.trim();
                    break;
                case 'Author Email':
                    this.authorEmail = fieldValue.trim();
                    break;
                case 'Revision':
                    this.revision = fieldValue.trim();
                    break;
                case 'Subject':
                    this.subject = fieldValue.trim();
                    break;
                case 'Company':
                    this.company = fieldValue.trim();
                    break;
            }

        });

        this.slides = this.tree.filter(node =>
            node[0] === 'header' && node[1].level === 2).map(node =>
                this.tree.indexOf(node)).map((slideIndex, index, slideIndexes) =>
                    this.tree.slice(slideIndex, slideIndexes[index + 1])).map(nodes =>
                        new MarkdownSlide(nodes));

    }
}

module.exports = { MarkdownSlideDeck };