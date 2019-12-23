// Контекст WebGL.
let gl;

// Шейдеры.
let shaderProgram;

// Модельно-видовая матрица.
let mvMatrix = mat4.create();
let mvMatrixStack = [];

// Проекционная матрица.
let pMatrix = mat4.create();

// Временный буфер.
let tmpBuffer = undefined;

let BUFFER_TYPE = {vertex : 0, color: 1};

let DRAWING_TYPE = {STRIP: 0, FAN: 1};

let COORDINATE_AXISES = {X: 0, Y: 1, Z: 2};

let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;

let sceneRotationMatrix = mat4.create();
mat4.identity(sceneRotationMatrix);

// Позиция начала отрисовки
let initialPosition = new Position(0, 0, -100);

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

        this.resetScene();

        canvas.onmousedown = WEBGL_DRIVER._onMouseDown;
        document.onmouseup = WEBGL_DRIVER._onMouseUp;
        document.onmousemove = WEBGL_DRIVER._onMouseMove;
    },

    resetScene() {
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, pMatrix);
        mat4.identity(mvMatrix);
    },

    /**
     * Иницаилизирует вершинный буфер.
     * @param {Array<any>} vertices - массив вершин.
     */
    initBuffer: function(vertices, type) {
        let buffer = this._createEmptyBuffer();

        this._setCurrentArrayBuffer(buffer);

        switch(type) {
            case BUFFER_TYPE.vertex:
                this._fillVertexBuffer(vertices);
                break;
            case BUFFER_TYPE.color:
                this._fillColorBuffer(vertices);
                break;
        }
        
        this._resetCurrentBuffer();

        return buffer;
    },

    /**
     * Рисует фигуру на холсте.
     * @param {Figure} figure - фигура.
     */
    drawFigure: function(figure, verticesBuffer, colorBuffer) {
        this._setCurrentPosition(initialPosition);
        
        this._mvMatrixPush();
        mat4.multiply(mvMatrix, sceneRotationMatrix);

        this._setCurrentArrayBuffer(verticesBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Position.size(), gl.FLOAT, false, 0, 0);
        
        this._setCurrentArrayBuffer(colorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, Color.size(), gl.FLOAT, false, 0, 0);
        
        this._setMatrixUniforms();

        switch (figure.getDrawingType()) {
            case DRAWING_TYPE.STRIP:
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, figure.getVerticesCount());
                break;
            case DRAWING_TYPE.FAN:
                gl.drawArrays(gl.TRIANGLE_FAN, 0, figure.getVerticesCount());
                break;
        }
        

        this._mvMatrixPop();
        
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

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    
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
    _fillVertexBuffer: function(vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Figure.joinVerticesPositions(vertices)), gl.STATIC_DRAW);
    },

    /**
     * Заполняет буфер данными о цвете.
     * @param {Array<Color>} vertices - вершины.
     */
    _fillColorBuffer: function(vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Figure.joinVerticesColors(vertices)), gl.STATIC_DRAW);
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
    },

    _mvMatrixPush: function() {
        let copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    },

    _mvMatrixPop: function() {
        if (mvMatrixStack.length == 0) {
            throw "Matrix stack is empty";
        }
        mvMatrix = mvMatrixStack.pop();
    },

    _onMouseDown: function (event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    },

    _onMouseUp: function (event) {
        mouseDown = false;
    },


    _onMouseMove: function (event) {
        if (!mouseDown) {
            return;
        }

        let newX = event.clientX;
        let newY = event.clientY;
        let deltaX = newX - lastMouseX;

        let newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, UTILS.degToRad(deltaX / 10), [0, 1, 0]);
        let deltaY = newY - lastMouseY;
        mat4.rotate(newRotationMatrix, UTILS.degToRad(deltaY / 10), [1, 0, 0]);
        mat4.multiply(newRotationMatrix, sceneRotationMatrix, sceneRotationMatrix);
        lastMouseX = newX
        lastMouseY = newY;
    }
}