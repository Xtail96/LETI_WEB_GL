/**
 * Фигура - базовый примитив.
 */
class Figure {
    /**
     * Конструктор класса.
     * @param {Position} positionFromZero - позиция фигуры относительно нуля.
     * @param {Array<Vertex>} vertices - массив координат вершин.
     * @param {number} angle - угол поворота фигуры.
     * @param {DRAWING_TYPE} drawingType - тип отрисовки.
     */
    constructor(positionFromZero, vertices, angle, drawingType) {
        this.positionFromZero = positionFromZero;
        this.vertices = Figure.moveTo(vertices, positionFromZero);
        this.vertexBuffer = undefined;
        this.colorBuffer = undefined;
        this.angle = UTILS.degToRad(angle);
        this.drawingType = drawingType;
    }

    /**
     * Возвращает координаты фигуры относительно нуля.
     * @returns Position.
     */
    getPositionFromZero() {
        return this.positionFromZero;
    }

    /**
     * Возвращает вершины фигуры.
     */
    getVertices() {
        return this.vertices;
    }
 
    /**
     * Возвращает вершинный буфер фигуры - место в памяти видеокарты.
     */
    getVertexBuffer() {
        return this.vertexBuffer;
    }

    getColorBuffer() {
        return this.colorBuffer;
    }

    /**
     * Возвращает количество вершин фигуры.
     */
    getVerticesCount() {
        return this.vertices.length;
    }

    /**
     * Возвращает угол поворота фигуры.
     */
    getAngle() {
        return this.angle;
    }

    /**
     * Возвращает тип отрисовки фигуры.
     */
    getDrawingType() {
        return this.drawingType;
    }

    /**
     * Рисует фигуру на холсте, который использует драйвер.
     */
    draw() {
        this.vertexBuffer = WEBGL_DRIVER.initBuffer(this.vertices, BUFFER_TYPE.vertex);
        this.colorBuffer = WEBGL_DRIVER.initBuffer(this.vertices, BUFFER_TYPE.color);
        WEBGL_DRIVER.drawFigure(this);
    }

    /**
     * Возвращает вершины фигуры в виде одномерного массива.
     */
    static joinVerticesPositions(vertices) {
        let result = [];

        for(let vertex of vertices) {
            result.push(...vertex.getCoords());
        }

        return result;
    }

    static joinVerticesColors(vertices) {
        let result = [];

        for(let vertex of vertices) {
            result.push(...vertex.getColorCode());
        }

        return result;
    }

    static moveTo(vertices, position) {
        let result = [];

        for(let vertex of vertices) {
            let coords = vertex.getPosition();

            console.log(coords, position)

            result.push(new Vertex(
                coords.getX() + position.getX(),
                coords.getY() + position.getY(),
                coords.getZ() + position.getZ(),
                vertex.getColor()
            ));

            console.log(result);
        }

        return result;
    }
}