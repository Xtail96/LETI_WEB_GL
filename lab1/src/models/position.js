/**
 * Позиция.
 * Является оберткой над Vertex.
 */
class Position {
    constructor(x, y, z) {
       this.vertex = new Vertex(x, y, z); 
    }

    getCoords() {
        return [this.vertex.getX(), this.vertex.getY(), this.vertex.getZ()];
    }

    getReversedCoords() {
        return [-1 * this.vertex.getX(), -1 * this.vertex.getY(), -1 * this.vertex.getZ()];
    }

    setCoords(x, y, z) {
        this.coords = [x, y, z];
    }
}