import {html, render} from 'https://unpkg.com/lit-html?module';

(function() {

    let vscode;
    try{
        vscode = acquireVsCodeApi();
    } catch {}


const testData = [
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '111111112222222233333333444444445555555566666666777777778888888899999999aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff00000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000004444000044440000444400000000000000000000444400000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000443f00004444000043f30000000000000000000043f300000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000ffff0000ffff0000ffff00000000000000000000ffff00000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000001111000011110000111100000000000000000000111100000000000000000000000000000000000000000000000000000000000000000000000000',
    '000000000f5555f00f5555f00f5555f000000000000000000f5555f0000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000d00d0000d00d0000d00d00000000000000000000d00d00000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000004000044000000004400000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000004444000044440000444400000000000000000000444400000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000443f00004444000043f30000000000000000000043f300000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000ffff0000ffff0000ffff00000000000000000000ffff00000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000001111000f1111000f111100000000000000000000111100000000000000000000000000000000000000000000000000000000000000000000000000',
    '0000000000f55500005555000055550000000000000000000f5555f0000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000dd000005000f0005000f0000000000000000000d00d00000000000000000000000000000000000000000000000000000000000000000000000000',
    '000000000000000000d0000000d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '22222222222222222222222220002021120200020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '22000000000000000000002202000202202000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20200002000000002000020200200021120002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020200002002000020200200020202202020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20002002200000022002000220002202202200020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020220020220200220200202022220122220200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000222202002022220000220200222222002020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20202022121221212202020212122121120221210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20002021111111111202000212122021121221210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000202111111112020000220200222222002020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020021111111111200200202022221022220200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000202111111112020000220002202202200020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000202111111112020000200020202202020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020021111111111200200200200021120002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000202111111112020000202000202202000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20002021111111111202000220002021120200020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20202022121221212202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20000222202002022220000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020220020220200220200200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20002002200000022002000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20020200002002000020200200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '20200002000000002000020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '22000000000000000000002200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    '22222222222222222222222200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000']

    const state = {
        activeColor: 'black',
        activeSprite: 0,
        spriteCtx: undefined,
        currentPage: 0,
        previewCtx: undefined,
        pixelData: testData,
        page: 0,
        oldMessage: undefined
    }

    const colorHexs = [
        "#000000",
        "#1D2B53",
        "#7E2553",
        "#008751",
        "#AB5236",
        "#5F574F",
        "#C2C3C7",
        "#FFF1E8",
        "#FF004D",
        "#FFA300",
        "#FFEC27",
        "#00E436",
        "#29ADFF",
        "#83769C",
        "#FF77A8",
        "#FFCCAA",
    ]

    window.addEventListener('message', event => {
        const documentText = event.data.text;
        const lines = documentText.split('\n');
        let found = false;
        let gfxLines = [];
        lines.forEach(line => {
            if(found){
                if(line.length < 128) {
                    found = false;
                } else {
                    gfxLines.push(line);
                }
            } 
            if(line.includes('__gfx__')) {
                found = true
            }

        });
        if(gfxLines.length === 0){
            state.pixelData = new Array(64).fill(new Array(128).fill(0).join(''))
            event.data.text += '__gfx__\n'
            state.pixelData.forEach( row => event.data.text += row + '\n');
            // fill in the gfx section
        } else {
            state.pixelData = gfxLines;

        }
        updatePreview();
        updateCanvas();
    });

    const colors = ['black', 'darkblue', 'purple', 'darkgreen', 'brown',
                    'darkgrey', 'grey', 'white', 'red', 'orange', 'yellow',
                    'green', 'blue', 'indigo', 'pink', 'peach'];

    

    const isSelected = (a, b) => a === b ? 'selected' : '';

    const convertSpriteNum = (n) => {
        const s = n.toString();
        if(s.length === 3) return s;
        else if(s.length === 2) return `0${s}`;
        return `00${s}`;
    }

    const changePage = (e) => {
        console.log(e.target)
        const tabNumber = e.target.getAttribute('tab');
        state.currentPage = Number(tabNumber);
        updatePreview();
        render(update(), document.body);
    }

    const update = () => html`
        <div class="center-full">
            <div class="topbar"></div>
            <div class="viewContainer" @mousemove=${handleDraw} @click=${handleDraw}>
                <canvas class="spriteView"></canvas>
                <div class="colorView" @mousemove=${handleColor} @click=${handleColor}>
                    ${ colors.map(color => html`<div class="color ${color} ${isSelected(color, state.activeColor)}" color="${color}"></div>`) }
                </div>
                <div class="page-tab">
                    <div class="sprite-number">${convertSpriteNum(state.activeSprite)}</div>
                    <div tab="0" @click=${changePage} class="tab ${state.currentPage === 0 ? 'selected' : ''}">0</div>
                    <div tab="1" @click=${changePage} class="tab ${state.currentPage === 1 ? 'selected' : ''}">1</div>
                    <div tab="2" @click=${changePage} class="tab ${state.currentPage === 2 ? 'selected' : ''}">2</div>
                    <div tab="3" @click=${changePage} class="tab ${state.currentPage === 3 ? 'selected' : ''}">3</div>
                </div>
            </div>
            <div class="sprites">
                <canvas class="spriteContainer"></canvas>
                <div class="spriteContainer highlighter" @mousemove=${handleSprite} @click=${handleSprite}>
                    ${ (new Array(64).fill(0).map( (_,i) => html`<div sprite="${i}" class="sprite ${isSelected(state.activeSprite, i)}"></div>`) )}
                </div>
            </div>
            <div class="topbar"></div>
        </div>
    `

    // CANVAS

    const updateCanvas = () => {
    
        // draw the sprite from the data
        let x = (state.activeSprite % 16) * 8;
        let y = Math.floor((state.activeSprite / 16)) * 8;
        let pixels = [];
        for(let i = 0; i < 8; i++){
            pixels.push(state.pixelData[y + i].substring(x, x + 8));
        }

        let ctx = state.spriteCtx;
        ctx.canvas.width = ctx.canvas.scrollWidth;
        ctx.canvas.height = ctx.canvas.scrollHeight;

        ctx.fillStyle = colorHexs[0];
        ctx.fillRect(0,0, ctx.canvas.scrollWidth, ctx.canvas.scrollHeight);

        let width = Math.round(ctx.canvas.scrollWidth / 8);
        let height = Math.round(ctx.canvas.scrollHeight / 8);
        pixels.forEach((row, y) => row.split('').forEach( (cell, x) => {
            let color = parseInt(cell, 16);
            ctx.fillStyle = colorHexs[color];
            ctx.strokeStyle = colorHexs[color];
            ctx.fillRect(x * width, y * height, width, height);
        }))
    }

    const updatePreview = () => {
        const ctx = state.previewCtx;
        //ctx.fillStyle = colorHexs[0];
        ctx.canvas.width = ctx.canvas.scrollWidth;
        ctx.canvas.height = ctx.canvas.scrollHeight;

        let example = document.querySelector('.sprite');
        const stringSize = getComputedStyle(example)['width']
        const width = parseFloat(stringSize.substring(0, stringSize.length - 2)) / 8;
        const height = parseFloat(stringSize.substring(0, stringSize.length - 2)) / 8;

        // for (let y = 0; y < 4; y++){
        //     for (let x = 0; x < 16; x++){
        //         ctx.beginPath();
        //         ctx.strokeStyle = '#ff0000';
        //         ctx.lineWidth = 3;
        //         ctx.rect(x * width, y * height, width, height)
        //         ctx.stroke()
        //     }
        // }

        const currentPage = (state.page * 4)
        for(let y = currentPage; y < (currentPage + (8*4)); y++){
            let row = state.pixelData[y]
            row.split('').forEach((cell,x) => {
                let color = parseInt(cell, 16);
                ctx.fillStyle = colorHexs[color];
                ctx.strokeStyle = colorHexs[color];
                ctx.fillRect(Math.floor(x * width), Math.floor(y * height), Math.ceil(width), Math.ceil(height));
            })
        }
    }

    // EVENTS

    const handleColor = (e) => {
        if( e.buttons == 1 || e.type === 'click' ){
            const color = e.target.getAttribute('color');
            if(color !== null) {
                state.activeColor = color;
                render(update(), document.body);
            }
        }   
    }

    const handleSprite = (e) => {
        if( e.buttons == 1 || e.type === 'click'){
            const sprite = e.target.getAttribute('sprite');
            if(sprite !== null){
                state.activeSprite = Number(sprite);
                updateCanvas();
                render(update(), document.body);
            }
        }
    }

    const isSameMessage = (a, b) => 
            a !== undefined &&
            b !== undefined &&
            a.type === b.type && 
            a.pos.x === b.pos.x &&
            a.pos.y === b.pos.y &&
            a.sprite === b.sprite &&
            a.color === b.color;

    const handleDraw = (e) => {
        if( e.buttons == 1 || e.type === 'click'){
            const stringSize = getComputedStyle(e.target)['width']
            let size = parseFloat(stringSize.substring(0,stringSize.length - 2)) / 8;
            let x = Math.floor((e.clientX - state.spriteCtx.canvas.offsetLeft) / size);
            let y = Math.floor((e.clientY - state.spriteCtx.canvas.offsetTop) / size);
            const newMessage = { 
                type: 'draw', 
                pos: {x, y},
                sprite: state.activeSprite,
                color: colors.indexOf(state.activeColor).toString(16)
            };
            if(x >= 0 && x < 16 && y >= 0 && y < 16 && !isSameMessage(state.oldMessage, newMessage)) {
                try{
                    vscode.postMessage(newMessage);
                    state.oldMessage = newMessage;
                } catch {}
            }
        }
    }

    render(update(), document.body);

    state.spriteCtx = document.querySelector('.spriteView').getContext("2d");

    state.previewCtx = document.querySelector('.spriteContainer').getContext("2d");

    updateCanvas();
    updatePreview();

})();