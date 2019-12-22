/**
 * Вершина.
 */
class Vertex {
    constructor (x, y, z, color) {
        this.position = new Position(x, y, z);
        this.color = color;
    }

    getCoords() {
        return this.position.getCoords();
    }

    getColorCode() {
        return this.color.getColorCode();
    }

    static size() {
        return 3;
    }
}