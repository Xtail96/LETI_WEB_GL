class Cube {
    static build(position, size, color, angle = 0, rotationAxis = COORDINATE_AXISES.Y) {
        return Parallelepiped.build(position, size, size, size, color, angle, rotationAxis);
    }
}