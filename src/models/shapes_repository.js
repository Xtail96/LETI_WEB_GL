/**
 * Репозиторий для всех объектов на сцене.
 */
let SHAPES_REPOSITORY = {
    data: [],

    init: function() {
        SHAPES_REPOSITORY.data = [
            // begin board
            ...Parallelepiped.build(new Position(0, 0, 0), 50, 5, 50, new Color(0, 0, 0, 1)),
            // end board

            // begin cubes
            ...Cube.build(new Position(20, 5, 0.0), 5, new Color(1.0, 0.0, 0.0, 1.0)),
            ...Cube.build(new Position(20, 9, 0.0), 3, new Color(0.0, 0.0, 1.0, 1.0), 60, COORDINATE_AXISES.Y),
            ...Cube.build(new Position(-20, 4.0, 15.0), 3, new Color(0.0, 1.0, 0.0, 1.0), 30, COORDINATE_AXISES.X),
            ...Cube.build(new Position(-10, 4.0, 15.0), 3, new Color(0.0, 1.0, 0.0, 1.0), 120, COORDINATE_AXISES.Z),
            // end cubes


            /*new Figure(
                new Position(-1.5, 1.0, -7.0),
                [
                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(-1.0, -1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),

                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0, -1.0, new Color(0.0, 0.0, 1.0, 1.0)),

                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0, -1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.0, -1.0, -1.0, new Color(0.0, 0.0, 1.0, 1.0)),

                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(-1.0, -1.0, -1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.0, -1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0))
                ],
                0,
                0
            ),

            // begin cube
            new Figure(
                new Position(1.5, -0.5, -2.5),
                [
                    new Vertex(0.0,  0.0,  0.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  0.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0,  1.0,  0.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),

                    new Vertex(0.0,  1.0,  1.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  0.0,  1.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0,  0.0,  1.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  0.0,  0.0, new Color(1.0, 0.0, 0.0, 1.0)),
                ],
                0,
                1
            ),

            new Figure(
                new Position(1.5, -0.5, -2.5),
                [
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  0.0,  0.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  1.0,  0.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(0.0,  1.0,  0.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(0.0,  0.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  0.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  0.0,  0.0, new Color(0.0, 1.0, 0.0, 1.0)),
                ],
                0,
                1
            ),
            // end cube

            new Figure(
                new Position(-3.0, -0.5, -2.5),
                [
                    new Vertex(0.0,  0.0,  1.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0,  0.0,  1.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  1.0, new Color(1.0, 0.0, 0.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(1.0, 0.0, 0.0, 1.0)),

                    new Vertex(1.0,  1.0,  1.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  1.0,  0.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  1.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  0.0, new Color(1.0, 1.0, 0.0, 1.0)),

                    new Vertex(0.0,  1.0,  0.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  0.0,  0.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(0.0,  0.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),

                    new Vertex(0.0,  0.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  0.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(0.0,  0.0,  0.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  0.0,  0.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(1.0,  0.0,  0.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  0.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  0.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),

                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 0.0, 1.0, 1.0)),
                ],
                0,
                0
            ),

            new Figure(
                new Position(3, -2.5, -12.5),
                [
                    new Vertex(-1.0, -1.0,  1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0, -1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.0,  1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(-1.0, -1.0, -1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(-1.0,  1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0, -1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(-1.0,  1.0, -1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(-1.0,  1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0,  1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(-1.0, -1.0, -1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0, -1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0, -1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.0, -1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(1.0, -1.0, -1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.0,  1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(1.0, -1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),

                    new Vertex(-1.0, -1.0, -1.0, new Color(1.0, 0.0, 1.0, 1.0)),
                    new Vertex(-1.0, -1.0,  1.0, new Color(0.0, 1.0, 1.0, 1.0)),
                    new Vertex(-1.0,  1.0,  1.0, new Color(0.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.0,  1.0, -1.0, new Color(0.0, 1.0, 1.0, 1.0))
                ],
                0,
                1
            ),

            new Figure(
                new Position(0.0, -3.0, -14.0),
                [
                    new Vertex(1.1,  1.1,  -1.1, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.1,  1.1,  -1.1, new Color(1.0, 1.0, 1.0, 1.0)),
                    new Vertex(1.1, -1.1,  -1.1, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-1.1, -1.1,  -1.1, new Color(1.0, 1.0, 1.0, 1.0))
                ],
                0,
                0
            )*/
        ];
    }
}