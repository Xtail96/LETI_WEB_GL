let FIGURES = [];

function init(canvas_node_id) {
    WEBGL_DRIVER.init(canvas_node_id);
    
    FIGURES = [
        /*new Figure(
            new Position(-1.5, 1.0, -7.0),
            [
                new Vertex(0.0,  1.0,  0.0),
                new Vertex(-1.0, -1.0,  0.0),
                new Vertex(1.0, -1.0,  0.0)
            ]
        ),
        new Figure(
            new Position(1.5, 0.0, -7.0),
            [
                new Vertex(1.0,  1.0,  0.0),
                new Vertex(-1.0,  1.0,  0.0),
                new Vertex(1.0, -1.0,  0.0),
                new Vertex(-1.0, -1.0,  0.0)
            ]
        ),*/
        new Figure(
            new Position(0.1, 0.1, -5.0),
            [
                new Vertex(1.1,  1.1,  -1.1),
                new Vertex(-1.1,  1.1,  -1.1),
                new Vertex(1.1, -1.1,  -1.1),
                new Vertex(-1.1, -1.1,  -1.1)
            ]
        )
    ];
}

function main(canvas_node_id) {
    init(canvas_node_id);
    WEBGL_DRIVER.drawFigure(FIGURES[0]);
    /*FIGURES.forEach((figure) => {
        figure.draw();
    });*/
}