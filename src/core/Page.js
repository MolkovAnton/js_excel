export class Page {
    constructor(params) {
        this.params = params;
    }
    
    getRoot() {
        throw new Error('No getRoot function');
    }
    
    afterRender() {}
    
    destroy() {}
}