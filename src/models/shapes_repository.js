/**
 * Репозиторий для всех объектов на сцене.
 */
let SHAPES_REPOSITORY = {
    data: [],

    init: function() {
        SHAPES_REPOSITORY.data = [
            // begin board
            new Figure(
                new Position(0.0, 0.0, -100.0),
                [
                    new Vertex(-25.0,  0.0,  -25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(25.0,  0.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                    new Vertex(25.0,  5.0,  -25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-25.0,  5.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),

                    new Vertex(-25.0,  5.0,  25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-25.0,  0.0,  25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                    new Vertex(25.0,  0.0,  25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(25.0,  0.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                ],
                0,
                1
            ),

            new Figure(
                new Position(0.0, 0.0, -100.0),
                [
                    new Vertex(25.0,  5.0,  25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(25.0,  0.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                    new Vertex(25.0,  5.0,  -25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-25.0,  5.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),

                    new Vertex(-25.0,  5.0,  25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(-25.0,  0.0,  25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                    new Vertex(25.0,  0.0,  25.0, new Color(1.0, 1.0, 0.0, 1.0)),
                    new Vertex(25.0,  0.0,  -25.0, new Color(1.0, 1.0, 1.0, 1.0)),
                ],
                0,
                1
            ),
            // end board




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
                new Position(1.5, -0.5, -5.0),
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
                new Position(1.5, -0.5, -5.0),
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
                new Position(-3.0, -0.5, -5.0),
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
                new Position(3, -5.0, -15.0),
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