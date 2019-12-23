/**
 * Фигура - базовый примитив.
 */
class Figure {
    /**
     * Конструктор класса.
     * @param {Position} positionFromZero - позиция фигуры относительно нуля.
     * @param {Array<Vertex>} vertices - массив координат вершин.
     * @param {DRAWING_TYPE} drawingType - тип отрисовки.
     * @param {number} angle - угол поворота фигуры.
     * @param {COORDINATE_AXISES} rotationAxis - ось вдоль которой требуется осуществить поворот.
     */
    constructor(positionFromZero, vertices, drawingType, angle, rotationAxis) {
        this.vertices = Figure.rotate(vertices, UTILS.degToRad(angle), rotationAxis);
        this.vertices = Figure.moveTo(this.vertices, positionFromZero);
        this.angle = UTILS.degToRad(angle);
        this.drawingType = drawingType;
    }

    /**
     * Возвращает вершины фигуры.
     */
    getVertices() {
        return this.vertices;
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
        let vertexBuffer = WEBGL_DRIVER.initBuffer(this.vertices, BUFFER_TYPE.vertex);
        let colorBuffer = WEBGL_DRIVER.initBuffer(this.vertices, BUFFER_TYPE.color);
        WEBGL_DRIVER.drawFigure(this, vertexBuffer, colorBuffer);
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

            result.push(new Vertex(
                coords.getX() + position.getX(),
                coords.getY() + position.getY(),
                coords.getZ() + position.getZ(),
                vertex.getColor()
            ));
        }

        return result;
    }

    static rotate(vertices, angle, rotationAxis) {
        let result = [];

        for(let vertex of vertices) {
            let coords = vertex.getPosition();
            let newCoords = {};

            switch(rotationAxis) {
                case COORDINATE_AXISES.X:
                    newCoords = new Position(
                        coords.getX(),
                        coords.getY() * Math.cos(angle) - coords.getZ() * Math.sin(angle),
                        coords.getY() * Math.sin(angle) + coords.getZ() * Math.cos(angle)
                    );
                    break;
                case COORDINATE_AXISES.Y:
                    newCoords = new Position(
                        coords.getX() * Math.cos(angle) - coords.getZ() * Math.sin(angle),
                        coords.getY(),
                        coords.getX() * Math.sin(angle) + coords.getZ() * Math.cos(angle)
                    );
                    break;
                case COORDINATE_AXISES.Z:
                    newCoords = new Position(
                        coords.getX() * Math.cos(angle) - coords.getY() * Math.sin(angle),
                        coords.getX() * Math.sin(angle) + coords.getY() * Math.cos(angle),
                        coords.getZ(),
                    );
                    break;
                default:
                    newCoords = coords;
            }

            result.push(new Vertex(
                newCoords.getX(),
                newCoords.getY(),
                newCoords.getZ(),
                vertex.getColor()
            ));
        }

        return result;
    }
}