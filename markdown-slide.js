class MarkdownSlide {

    constructor(nodes) {
        this.nodes = nodes;
        this.process();
    }

    process() {

        const titleNodeIndex = this.nodes.findIndex(node => node[0] === 'header' && node[1].level === 2);
        this.title = this.nodes[titleNodeIndex][2];

        const bulletList = this.nodes.find(node => node[0] === 'bulletlist');
        if (bulletList) {
            this.contentItems = bulletList.slice(1).map(node => node[1]);
        } else {
            this.contentItems = [];
        }

        const metadataNode = this.nodes[titleNodeIndex + 1];

        metadataNode[1].replace('<!--', '').replace('-->', '')
            .trim().split('\n').forEach(metadata => {

                const [ fieldName, fieldValue ] = metadata.split(':');

                switch(fieldName.trim()) {
                    case 'Master':
                        this.master = fieldValue.trim();
                        break;
                    case 'Subtitle':
                        this.subtitle = fieldValue.trim();
                        break;
                }

            });

    }

}

module.exports = { MarkdownSlide };