class Cube {
    static build(position, size, angle, color) {
        return Parallelepiped.build(position, size, size, size, angle, color);
    }
}