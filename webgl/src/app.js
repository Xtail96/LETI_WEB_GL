'use strict';

function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    if(canvas == null) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const ext = gl.getExtension('WEBGL_depth_texture');
    if (!ext) {
        return alert('need WEBGL_depth_texture');  // eslint-disable-line
    }

    // setup GLSL programs
    const textureProgramInfo = webglUtils.createProgramInfo(gl, ['3d-vertex-shader', '3d-fragment-shader']);
    const colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);

    const planeBufferInfo = primitives.createPlaneBufferInfo(
        gl,
        25,  // width
        25,  // height
        1,   // subdivisions across
        1,   // subdivisions down
    );
    const cubeBufferInfo = primitives.createCubeBufferInfo(
        gl,
        2,  // size
    );
    
    const sphereBufferInfo = primitives.createSphereBufferInfo(
        gl,
        1,
        100,
        100,
        degToRad(0),
        degToRad(360),
        degToRad(0),
        degToRad(360)
    );

    // ------------------------------TEXTURES--------------------------------------
    //Init my textures
    const woodTexture1 = initTexture('resources/textures/wood_1.jpg');
    const woodTexture2 = initTexture('resources/textures/wood_2.jpg');
    const blackWoodTexture = initTexture('resources/textures/black_wood_1.jpg');
    // Init a 8x8 checkerboard texture
    const chessboardTexture = initTexture('resources/textures/chess_board_3.jpg');
    // Init depth texture
    const depthTextureSize = 512;
    const depthTexture = createDepthTexture();
    const depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,       // target
        gl.DEPTH_ATTACHMENT,  // attachment point
        gl.TEXTURE_2D,        // texture target
        depthTexture,         // texture
        0);                   // mip level

    // ------------------------------UI--------------------------------------
    const settings = {
        cameraX: -0.26,//-9.5,
        cameraY: 20,//12,
        posX: 1.0,
        posY: 4.8,
        posZ: 5.72,
        targetX: 3.5,
        targetY: 0,
        targetZ: 5.0,
        projWidth: 20,
        projHeight: 15,
        fieldOfView: 120,
        bias: -0.006,
    };
    webglLessonsUI.setupUI(document.querySelector('#ui'), settings, [
        {type: 'slider', key: 'cameraX', min: -20, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'cameraY', min: 1, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'posX', min: -10, max: 10, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'posY', min: 1, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'posZ', min: 1, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'targetX', min: -10, max: 10, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'targetY', min: 0, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'targetZ', min: -10, max: 20, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'projWidth', min: 0, max: 100, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'projHeight', min: 0, max: 100, change: render, precision: 2, step: 0.001,},
        {type: 'slider', key: 'fieldOfView', min: 1, max: 179, change: render,},
        {type: 'slider', key: 'bias', min: -0.01, max: 0.00001, change: render, precision: 4, step: 0.0001,},
    ]);

    const fieldOfViewRadians = degToRad(60);

    function draw3DObjects(
        projectionMatrix,
        cameraMatrix,
        textureMatrix,
        lightWorldMatrix,
        programInfo) {
        // Make a view matrix from the camera matrix.
        const viewMatrix = m4.inverse(cameraMatrix);

        gl.useProgram(programInfo.program);

        // set uniforms that are the same for both the sphere and plane
        // note: any values with no corresponding uniform in the shader
        // are ignored.
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: settings.bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: depthTexture,
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
        });

        // ------ Draw the plane --------
        drawFigure(programInfo, planeBufferInfo,
        {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: chessboardTexture,
            u_world: m4.translation(0, 0, 0),
        });
        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(0, -1.0, 0), 12.5, 1, 12.5),
        });

        // ------ Draw the cubes --------
        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(1.25, 1, 9.25), 1, 1, 1),
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.axisRotate(m4.scale(m4.translation(1.25, 2.75, 9.25), 0.75, 0.75, 0.75), [0, 1, 0], degToRad(45))
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(-6.75, 1, 9.25), 1, 1, 1),
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(-1.25, 0.75, -1.25), 0.75, 0.75, 0.75)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(-1.25, 1, -6.5), 1, 1, 1),
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(1.25, 0.75, -6.5), 0.75, 0.75, 0.75),
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(1.25, 1, -9.25), 1, 1, 1),
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.axisRotate(m4.scale(m4.translation(1.25, 2.75, -9.25), 0.75, 0.75, 0.75), [0, 1, 0], degToRad(45))
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(1.25, 1, 1.25), 1, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.axisRotate(m4.scale(m4.translation(3.75, 0.75, 3.75), 0.75, 0.75, 0.75), [0, 1, 0], degToRad(45))
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(3.75, 1, -3.75), 1, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(-6.5, 1, 4), 1, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(-7.0, 1, 1.5), 0.5, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(-6.5, 1, -1.25), 1, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.axisRotate(m4.translation(-4.0, 1, 1.5), [0, 1, 0], degToRad(45)), 0.25, 1, 1)
        });

        drawFigure(programInfo, cubeBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.axisRotate(m4.translation(-4.0, 1, 1.5), [0, 1, 0], degToRad(-45)), 0.25, 1, 1)
        });

        drawFigure(programInfo, sphereBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: woodTexture2,
            u_world: m4.scale(m4.translation(1.25, 3, 1.25), 1, 1, 1)
        });

        drawFigure(programInfo, sphereBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: blackWoodTexture,
            u_world: m4.scale(m4.translation(-6.5, 3, -1.25), 1, 1, 1)
        });
    }

    function drawFigure(program, figureBuffer, figureUniform, primitive) {
        webglUtils.setBuffersAndAttributes(gl, program, figureBuffer);

        // Set the uniforms unique to the cube
        webglUtils.setUniforms(program, figureUniform);

        // calls gl.drawArrays or gl.drawElements
        if (primitive) {
            webglUtils.drawBufferInfo(gl, figureBuffer, primitive);
        } else {
            webglUtils.drawBufferInfo(gl, figureBuffer);
        }
    }

    // Draw the scene.
    function render() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // first draw from the POV of the light
        const lightWorldMatrix = m4.lookAt(
            [settings.posX, settings.posY, settings.posZ],          // position
            [settings.targetX, settings.targetY, settings.targetZ], // target
            [0, 1, 0],                                              // up
        );
        const lightProjectionMatrix = m4.orthographic(
            -settings.projWidth / 2,   // left
            settings.projWidth / 2,   // right
            -settings.projHeight / 2,  // bottom
            settings.projHeight / 2,  // top
            0.01,                      // near
            20);                      // far

        // draw to the depth texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
        gl.viewport(0, 0, depthTextureSize, depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Depth rendering
        draw3DObjects(
            lightProjectionMatrix,
            lightWorldMatrix,
            m4.identity(),
            lightWorldMatrix,
            colorProgramInfo);

        // now draw scene to the canvas projecting the depth texture into the scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0.5);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let textureMatrix = m4.identity();
        textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
        // use the inverse of this world matrix to make
        // a matrix that will transform other positions
        // to be relative this this world space.
        textureMatrix = m4.multiply(
            textureMatrix,
            m4.inverse(lightWorldMatrix));

        // Compute the projection matrix
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const projectionMatrix =
            m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

        // Compute the camera's matrix using look at.
        const cameraPosition = [settings.cameraX, settings.cameraY, 15];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        const cameraMatrix = m4.lookAt(cameraPosition, target, up);

        // Scene visualisation
        draw3DObjects(
            projectionMatrix,
            cameraMatrix,
            textureMatrix,
            lightWorldMatrix,
            textureProgramInfo);
    }

    function initTexture(url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([255, 255, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            width, height, border, srcFormat, srcType,
            pixel);

        const image = new Image();
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                srcFormat, srcType, image);
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                // Размер не соответствует степени 2.
                // Отключаем MIP'ы и устанавливаем натяжение по краям
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
        return texture;
    }

    function createChessBoardTexture() {
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,                // mip level
            gl.LUMINANCE,     // internal format
            8,                // width
            8,                // height
            0,                // border
            gl.LUMINANCE,     // format
            gl.UNSIGNED_BYTE, // type
            new Uint8Array([  // data
                0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00,
                0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF,
                0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00,
                0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF,
                0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00,
                0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF,
                0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00,
                0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF,
            ]));
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        return texture;
    }

    function createDepthTexture() {
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,      // target
            0,                  // mip level
            gl.DEPTH_COMPONENT, // internal format
            depthTextureSize,   // width
            depthTextureSize,   // height
            0,                  // border
            gl.DEPTH_COMPONENT, // format
            gl.UNSIGNED_INT,    // type
            null);              // data
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        return texture;
    }

    render();

    setTimeout(() => {
        render();
    }, 100);
}
