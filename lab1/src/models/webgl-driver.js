let gl;
let shaderProgram;
let mvMatrix = mat4.create();
let pMatrix = mat4.create();
let tmpBuffer = undefined;

let WEBGL_DRIVER = {
    // public
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

    initBuffer: function(vertices) {
        let buffer = this._createEmptyBuffer();
        this._setCurrentArrayBuffer(buffer);
        this._fillBuffer(vertices);
        this._resetCurrentBuffer();

        return buffer;
    },

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

    _createEmptyBuffer: function() {
        return gl.createBuffer();
    },

    _setCurrentArrayBuffer: function(buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    },

    _fillBuffer: function(vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    },

    _resetCurrentBuffer: function() {
        if(tmpBuffer === undefined) {
            tmpBuffer = this._createEmptyBuffer();
        }
        this._setCurrentArrayBuffer(tmpBuffer);
    },

    _setCurrentPosition(positionFromZero) {
        this._setCurrentPositionToZero();
        mat4.translate(mvMatrix, positionFromZero.getCoords());
    },

    _setCurrentPositionToZero() {
        mat4.identity(mvMatrix);
    },

    _setMatrixUniforms: function () {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
}