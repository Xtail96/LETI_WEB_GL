class Parallelepiped {
    static build(position, sizeX, sizeY, sizeZ, color, angle = 0, rotationAxis = COORDINATE_AXISES.Y) {
        return [
            new Figure(position,
                [
                    new Vertex(-sizeX/2,  -sizeY/2,  -sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  -sizeZ/2, color),
                    new Vertex(sizeX/2,  sizeY/2,  -sizeZ/2, color),
                    new Vertex(-sizeX/2,  sizeY/2,  -sizeZ/2, color),

                    new Vertex(-sizeX/2,  sizeY/2,  sizeZ/2, color),
                    new Vertex(-sizeX/2,  -sizeY/2,  sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  -sizeZ/2, color),
                ],
                DRAWING_TYPE.FAN,
                angle,
                rotationAxis
            ),

            new Figure(position,
                [
                    new Vertex(sizeX/2,  sizeY/2,  sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  -sizeZ/2, color),
                    new Vertex(sizeX/2,  sizeY/2,  -sizeZ/2, color),
                    new Vertex(-sizeX/2,  sizeY/2,  -sizeZ/2, color),
                    new Vertex(-sizeX/2,  sizeY/2,  sizeZ/2, color),
                    new Vertex(-sizeX/2,  -sizeY/2,  sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  sizeZ/2, color),
                    new Vertex(sizeX/2,  -sizeY/2,  -sizeZ/2, color),
                ],
                DRAWING_TYPE.FAN,
                angle,
                rotationAxis
            ),
        ]
    }
}
	
