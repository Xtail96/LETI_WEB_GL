/**
 * Фигура - базовый примитив.
 */
class Figure {
    /**
     * Конструктор класса.
     * @param {Position} positionFromZero - позиция фигуры относительно нуля.
     * @param {Array<Vertex>} vertices - массив координат вершин.
     */
    constructor(positionFromZero, vertices, angle) {
        this.positionFromZero = positionFromZero;
        this.vertices = vertices;
        this.vertexBuffer = undefined;
        this.colorBuffer = undefined;
        this.angle = UTILS.degToRad(angle);
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

    getAngle() {
        return this.angle;
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
}