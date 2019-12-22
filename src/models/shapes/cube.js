class Cube {
    static build(position, size, angle, color) {
        return [
            new Figure(position,
                [
                    new Vertex(-size/2,  -size/2,  -size/2, color),
                    new Vertex(size/2,  -size/2,  -size/2, color),
                    new Vertex(size/2,  size/2,  -size/2, color),
                    new Vertex(-size/2,  size/2,  -size/2, color),

                    new Vertex(-size/2,  size/2,  size/2, color),
                    new Vertex(-size/2,  -size/2,  size/2, color),
                    new Vertex(size/2,  -size/2,  size/2, color),
                    new Vertex(size/2,  -size/2,  -size/2, color),
                ],
                angle,
                DRAWING_TYPE.FAN
            ),


            new Figure(position,
                [
                    new Vertex(size/2,  size/2,  size/2, color),
                    new Vertex(size/2,  -size/2,  -size/2, color),
                    new Vertex(size/2,  size/2,  -size/2, color),
                    new Vertex(-size/2,  size/2,  -size/2, color),
                    new Vertex(-size/2,  size/2,  size/2, color),
                    new Vertex(-size/2,  -size/2,  size/2, color),
                    new Vertex(size/2,  -size/2,  size/2, color),
                    new Vertex(size/2,  -size/2,  -size/2, color),
                ],
                angle,
                DRAWING_TYPE.FAN
            ),
        ]
    }
}