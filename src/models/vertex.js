/**
 * Вершина.
 */
class Vertex {
    constructor (x, y, z, color) {
        this.position = new Position(x, y, z);
        this.color = color;
    }

    getPosition() {
        return this.position;
    }

    getCoords() {
        return this.position.getCoords();
    }

    getColor() {
        return this.color;
    }

    getColorCode() {
        return this.color.getColorCode();
    }

    static size() {
        return 3;
    }
}