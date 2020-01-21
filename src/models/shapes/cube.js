class Cube {
    /*static build(position, size, color, angle = 0, rotationAxis = COORDINATE_AXISES.Y) {
        return Parallelepiped.build(position, size, size, size, color, angle, rotationAxis);
    }*/

    static build(position, size, color, angle = 0, rotationAxis = COORDINATE_AXISES.Y) {
        return [
            new Figure(position,
                [
                    // Front face
                    new Vertex(-size/2, -size/2, size/2, color),
                    new Vertex(size/2, -size/2, size/2, color),
                    new Vertex(size/2, size/2, size/2, color),
                    new Vertex(-size/2, size/2, size/2, color),

                    // Back face
                    new Vertex(-size/2, -size/2, -size/2, color),
                    new Vertex(-size/2, size/2, -size/2, color),
                    new Vertex(size/2, size/2, -size/2, color),
                    new Vertex(size/2, -size/2, -size/2, color),

                    // Top face
                    new Vertex(-size/2, size/2, -size/2, color),
                    new Vertex(-size/2, size/2, size/2, color),
                    new Vertex(size/2, size/2, size/2, color),
                    new Vertex(size/2, size/2, -size/2, color),

                    // Bottom face
                    new Vertex(-size/2, -size/2, -size/2, color),
                    new Vertex(size/2, -size/2, -size/2, color),
                    new Vertex(size/2, -size/2, size/2, color),
                    new Vertex(-size/2, -size/2, size/2, color),

                    // Right face
                    new Vertex(size/2, -size/2, -size/2, color),
                    new Vertex(size/2, size/2, -size/2, color),
                    new Vertex(size/2, size/2, size/2, color),
                    new Vertex(size/2, -size/2, size/2, color),

                    // Left face
                    new Vertex(-size/2, -size/2, -size/2, color),
                    new Vertex(-size/2, -size/2, size/2, color),
                    new Vertex(-size/2, size/2, size/2, color),
                    new Vertex(-size/2, size/2, -size/2, color),
                ],
                DRAWING_TYPE.TRIANGLES,
                angle,
                rotationAxis)
        ]
    }
}