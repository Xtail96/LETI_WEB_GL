// Контекст WebGL.
let gl;

// Шейдеры.
let shaderProgram;

// Модельно-видовая матрица.
let mvMatrix = mat4.create();

// Проекционная матрица.
let pMatrix = mat4.create();

// Временный буфер.
let tmpBuffer = undefined;

/**
 * Драйвер WebGL.
 */
let WEBGL_DRIVER = {
    // public

    /**
     * Инициализирует драйвер.
     * @param {string} canvas_id - идентификатор canvas на странице.
     */
    init: function(canvas_id) {
        let canvas = document.getElementById(canvas_id);
        WEBGL_DRIVER._initContext(canvas);
        WEBGL_DRIVER._initShaders();
    
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
    },

    /**
     * Иницаилизирует вершинный буфер.
     * @param {Array<Vertex>} vertices - массив вершин.
     */
    initBuffer: function(vertices) {
        let buffer = this._createEmptyBuffer();
        this._setCurrentArrayBuffer(buffer);
        this._fillBuffer(vertices);
        this._resetCurrentBuffer();

        return buffer;
    },

    /**
     * Рисует фигуру на холсте.
     * @param {Figure} figure - фигура.
     */
    drawFigure: function(figure) {
        this._setCurrentPosition(figure.getPositionFromZero());
        this._setCurrentArrayBuffer(figure.getBuffer());
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, figure.getVertexSize(), gl.FLOAT, false, 0, 0);
        this._setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, figure.getVerticesCount());
        this._resetCurrentBuffer();
        this._setCurrentPositionToZero();
    },

    //private

    /**
     * Инициализирует контекст WebGL.
     * @param {string} canvas - идентификатор canvas на странице.
     */
    _initContext: function(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    },

    /**
     * Инициализирует шейдеры.
     */
    _initShaders: function() {
        let fragmentShader = WEBGL_DRIVER._getShader(gl, "shader-fs");
        let vertexShader = WEBGL_DRIVER._getShader(gl, "shader-vs");
    
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
    
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    
        gl.useProgram(shaderProgram);
    
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    },

    /**
     * Инициализирует шейдер.
     * @param gl - контекст WebGL.
     * @param id - идентификатор тэга script, содержащего шейдер.
     * @returns объект шейдера.
     */
    _getShader: function(gl, id) {
        let shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
    
        let str = "";
        let k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }
    
        let shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
    
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
    
        return shader;
    },

    /**
     * Создает пустой буфер.
     */
    _createEmptyBuffer: function() {
        return gl.createBuffer();
    },

    /**
     * Устанавливает буфер в качестве активного.
     * @param {WebGLBuffer} buffer - буфер.
     */
    _setCurrentArrayBuffer: function(buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    },

    /**
     * Заполняет буфер данными о вершинах.
     * @param {Array<Vertex>} vertices - вершины.
     */
    _fillBuffer: function(vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Figure.getVerticesAsArray(this.vertices)), gl.STATIC_DRAW);
    },

    /**
     * Сбрасывает текущий буфер.
     * Устанавливается временный буфер.
     */
    _resetCurrentBuffer: function() {
        if(tmpBuffer === undefined) {
            tmpBuffer = this._createEmptyBuffer();
        }
        this._setCurrentArrayBuffer(tmpBuffer);
    },

    /**
     * Устанавливает позицию для рисования.
     * @param {Position} positionFromZero - позиция относительно нуля.
     */
    _setCurrentPosition(positionFromZero) {
        this._setCurrentPositionToZero();
        mat4.translate(mvMatrix, positionFromZero.getCoords());
    },

    /**
     * Перемещает позицию для рисования в нулевые координаты.
     */
    _setCurrentPositionToZero() {
        mat4.identity(mvMatrix);
    },

    /**
     * Инициализирует поля программы шейдеров (uniform-переменные) объектами JS,
     * соответствующими матрице проекции и матрице модели.
     */
    _setMatrixUniforms: function () {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
}