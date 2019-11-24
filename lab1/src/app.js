function init(canvas_node_id) {
    WEBGL_DRIVER.init(canvas_node_id);
    SHAPES_REPOSITORY.init();
}

function main(canvas_node_id) {
    init(canvas_node_id);
    SHAPES_REPOSITORY.data.forEach((figure) => {
        figure.draw();
    });
}