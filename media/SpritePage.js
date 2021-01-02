import { html, defineElement, useState, useEffect, useRef, useStyle, useProperty } from "https://unpkg.com/fuco?module";
import { colorHexs, colors } from './Colors.js';
import style from './sprite-styles.js';

(function() {

    const SpritePage = () => {

        let pixelData = useProperty('pixel-data');
        let vscode = useProperty('vs-code');

        if(vscode) console.log('got vscode api');

        let [state, setState] = useState({
            activeColor: 'black',
            activeSprite: 0,
            currentPage: 0,
            oldMessage: undefined
        })
    
        let spriteCtx = useRef(null);
        let previewCtx = useRef(null);
        let root = useRef(null);

        if(pixelData === undefined) return html``;

        useStyle( () => style);

        useEffect( () => {

            updatePreview();
            updateCanvas(); 

        })
    
        // EVENTS
        const handleColor = (e) => {
            let newState = {...state};
            if( e.buttons == 1 || e.type === 'click' ){
                const color = e.target.getAttribute('color');
                if(color !== null) {
                    newState.activeColor = color;
                    setState(newState);
                }
            }   
        }
    
        const handleSprite = (e) => {
            let newState = {...state};
            if( e.buttons == 1 || e.type === 'click'){
                const sprite = e.target.getAttribute('sprite');

                if(sprite !== null){
                    const newSprite = Number(sprite) + (64 * state.currentPage);
                    if(state.activeSprite === newSprite) return;
                    newState.activeSprite = newSprite
                    setState(newState);
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
            let newState = {...state};
            let canvas = spriteCtx.current
            if( e.buttons == 1 || e.type === 'click'){
                const stringSize = getComputedStyle(e.target)['width']
                let size = parseFloat(stringSize.substring(0,stringSize.length - 2)) / 8;

                const topOffset = canvas.offsetTop + canvas.parentElement.offsetTop
                const leftOffset = canvas.offsetLeft + canvas.parentElement.offsetLeft

                let x = Math.floor((e.clientX - leftOffset) / size);
                let y = Math.floor((e.clientY - topOffset) / size);
                const newMessage = { 
                    type: 'draw', 
                    pos: {x, y},
                    sprite: state.activeSprite,
                    color: colors.indexOf(state.activeColor).toString(16)
                };
                if(x >= 0 && x < 16 && y >= 0 && y < 16 && !isSameMessage(state.oldMessage, newMessage)) {
                    try{
                        vscode.postMessage(newMessage);
                        newState.oldMessage = newMessage;
                        setState(newState);
                    } catch {}
                }
            }
        }
    
        const isSelected = (a, b) => a === b ? 'selected' : '';
    
        const convertSpriteNum = (n) => {
            const s = n.toString();
            if(s.length === 3) return s;
            else if(s.length === 2) return `0${s}`;
            return `00${s}`;
        }
    
        const changePage = (e) => {
            let newState = {...state};
            const tabNumber = e.target.getAttribute('tab');
            newState.currentPage = Number(tabNumber);
            setState(newState);
        }
    
        // CANVAS
    
        const updateCanvas = () => {
        
            // draw the sprite from the data
            let x = (state.activeSprite % 16) * 8;
            let y = Math.floor((state.activeSprite / 16)) * 8;
            let pixels = [];
            for(let i = 0; i < 8; i++){
                pixels.push(pixelData[y + i].substring(x, x + 8));
            }
            let ctx = spriteCtx.current.getContext('2d');

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
            let ctx = previewCtx.current.getContext('2d');

            ctx.canvas.width = ctx.canvas.scrollWidth;
            ctx.canvas.height = ctx.canvas.scrollHeight;
    
            let example = root.current.querySelector('.sprite');
            const stringSize = getComputedStyle(example)['width']
            const width = parseFloat(stringSize.substring(0, stringSize.length - 2)) / 8;
            const height = parseFloat(stringSize.substring(0, stringSize.length - 2)) / 8;
    
            const currentPage = (state.currentPage * 8 * 4)
            let ry = 0;
            for(let y = currentPage; y < (currentPage + (8*4)); y++){
                let row = pixelData[y]
                try {
                    row.split('').forEach((cell,x) => {
                        let color = parseInt(cell, 16);
                        ctx.fillStyle = colorHexs[color];
                        ctx.strokeStyle = colorHexs[color];
                        ctx.fillRect(Math.floor(x * width), Math.floor(ry * height), Math.ceil(width), Math.ceil(height));
                    })
                    ry += 1;
                } catch(e) { }
            }
        }
    
        return html`
            <div ref=${root} class="center-full">
                <div class="topbar"></div>
                <div class="viewContainer" @mousemove=${handleDraw} @click=${handleDraw}>
                    <canvas ref=${spriteCtx} class="spriteView"></canvas>
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
                    <canvas ref=${previewCtx} class="spriteContainer"></canvas>
                    <div class="spriteContainer highlighter" @mousemove=${handleSprite} @click=${handleSprite}>
                        ${ (new Array(64).fill(0).map( (_,i) => html`<div sprite="${i}" class="sprite ${isSelected(state.activeSprite - (state.currentPage * 64), i)}"></div>`) )}
                    </div>
                </div>
                <div class="topbar"></div>
            </div>
        `
    }
    
    defineElement('sprite-page', SpritePage);

})()
