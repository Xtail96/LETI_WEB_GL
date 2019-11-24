/**
 * Вершина.
 */
class Vertex {
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX() {
        return this.x;
    }

    setX(value) {
        this.x = value;
    }

    getY() {
        return this.y;
    }

    setY(value) {
        this.y = value;
    }

    getZ() {
        return this.z;
    }

    setZ(value) {
        this.z = value;
    }

    static size() {
        return 3;
    }
}