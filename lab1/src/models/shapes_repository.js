/**
 * Репозиторий для всех объектов на сцене.
 */
let SHAPES_REPOSITORY = {
    data: [],

    init: function() {
        SHAPES_REPOSITORY.data = [
            new Figure(
                new Position(-1.5, 1.0, -7.0),
                [
                    new Vertex(0.0,  1.0,  0.0),
                    new Vertex(-1.0, -1.0,  0.0),
                    new Vertex(1.0, -1.0,  0.0)
                ]
            ),
            new Figure(
                new Position(1.5, 0.0, -5.0),
                [
                    new Vertex(1.0,  1.0,  0.0),
                    new Vertex(-1.0,  1.0,  0.0),
                    new Vertex(1.0, -1.0,  0.0),
                    new Vertex(-1.0, -1.0,  0.0)
                ]
            ),
            new Figure(
                new Position(0.0, -3.0, -14.0),
                [
                    new Vertex(1.1,  1.1,  -1.1),
                    new Vertex(-1.1,  1.1,  -1.1),
                    new Vertex(1.1, -1.1,  -1.1),
                    new Vertex(-1.1, -1.1,  -1.1)
                ]
            )
        ];
    }
}