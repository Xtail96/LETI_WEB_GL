/**
 * Фигура - базовый примитив.
 */
class Figure {
    /**
     * Конструктор класса.
     * @param {Position} positionFromZero - позиция фигуры относительно нуля.
     * @param {Array<Vertex>} vertices - массив координат вершин.
     * @param {Color} color - цвет вершины.
     */
    constructor(positionFromZero, vertices, color) {
        this.positionFromZero = positionFromZero;
        this.vertices = vertices;
        this.vertexBuffer = WEBGL_DRIVER.initBuffer(vertices, BUFFER_TYPE.vertex);
        this.colorBuffer = WEBGL_DRIVER.initBuffer(vertices, BUFFER_TYPE.color);
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
     * Рисует фигуру на холсте, который использует драйвер.
     */
    draw() {
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