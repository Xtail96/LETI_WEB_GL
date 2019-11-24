class Figure {
    constructor(positionFromZero, vertices) {
        this.positionFromZero = positionFromZero;
        this.vertices = vertices;
        this.buffer = WEBGL_DRIVER.initBuffer(Figure.getVerticesAsArray(this.vertices));
    }

    getPositionFromZero() {
        return this.positionFromZero;
    }

    getVertices() {
        return this.vertices;
    }

    static getVerticesAsArray(vertices) {
        let result = [];

        for(let vertex of vertices) {
            result.push(...[vertex.getX(), vertex.getY(), vertex.getZ()]);
        }

        return result;
    }
 
    getBuffer() {
        return this.buffer;
    }

    getVertexSize() {
        return Vertex.size();
    }

    getVerticesCount() {
        return this.vertices.length;
    }

    draw() {
        WEBGL_DRIVER.drawFigure(this);
    }
}