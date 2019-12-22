class Parallelepiped {
    static build(position, sizeX, sizeY, sizeZ, angle, color) {
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
                angle,
                DRAWING_TYPE.FAN
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
                angle,
                DRAWING_TYPE.FAN
            ),
        ]
    }
}
	
