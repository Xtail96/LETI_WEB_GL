function init(canvas_node_id) {
    WEBGL_DRIVER.init(canvas_node_id);
    SHAPES_REPOSITORY.init();
}

function update() {
    WEBGL_DRIVER.resetScene();
    let container = document.getElementById('vertexColors');
    container.innerHTML = '';

    SHAPES_REPOSITORY.data.forEach((figure) => {
        figure.draw();
    });

    setupUI();
}

function main(canvas_node_id) {
    init(canvas_node_id);
    update();
}

function setupUI() {
    let container = document.getElementById('vertexColors');

    createVertexColorNode = function(figure, figureIndex) {
        let vertexIndex = 0;
        figure.getVertices().forEach((vertex) => {
            let wrapper = document.createElement('div');
                let input = document.createElement('input');
                input.setAttribute('id', `vertex_${figureIndex}_${vertexIndex}`);
                input.value = String(vertex.getColorCode());
                input.addEventListener('keydown', function(e) {
                    if (e.keyCode === 13) {
                        colorChanged(e.target.id, this.value);
                    }     
                });
                wrapper.appendChild(input);
            container.appendChild(wrapper);
            vertexIndex++;
        });
    }

    let i = 0;
    SHAPES_REPOSITORY.data.forEach((figure) => {
        createVertexColorNode(figure, i);
        i++;
    });
}

function colorChanged(node_id, value) {
    let meta = node_id.split('_');

    let figureIndex = meta[1];
    let vertexIndex = meta[2];

    meta = value.split(',');
    let r = meta[0];
    let g = meta[1];
    let b = meta[2];
    let a = meta[3];
    SHAPES_REPOSITORY.data[figureIndex].vertices[vertexIndex].color = new Color(r, g, b, a);

    update();
}
