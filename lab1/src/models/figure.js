/**
 * Фигура - базовый примитив.
 */
class Figure {
    /**
     * Конструктор класса.
     * @param {Position} positionFromZero - позиция фигуры относительно нуля.
     * @param {Array<Vertex>} vertices - массив координат вершин.
     */
    constructor(positionFromZero, vertices) {
        this.positionFromZero = positionFromZero;
        this.vertices = vertices;
        this.buffer = WEBGL_DRIVER.initBuffer(vertices);
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
     * Возвращает буфер фигуры - место в памяти видеокарты.
     */
    getBuffer() {
        return this.buffer;
    }

    /**
     * Возвращает размер каждой вершин фигуры.
     * Всегда равен 3.
     */
    getVertexSize() {
        return Vertex.size();
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
     * Возвращает вершины фигуры в виде плоского массива.
     */
    static getVerticesAsArray(vertices) {
        let result = [];

        for(let vertex of vertices) {
            result.push(...[vertex.getX(), vertex.getY(), vertex.getZ()]);
        }

        return result;
    }
}