import {html, render} from 'https://unpkg.com/lit-html?module';

(function() {

    const state = {
        activeColor: 'black',
        activeSprite: 0,
        ctx: undefined,
        pixelData: undefined,
    }

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
        state.pixelData = gfxLines;
    });

    const colors = ['black', 'darkblue', 'purple', 'darkgreen', 'brown',
                    'darkgrey', 'grey', 'white', 'red', 'orange', 'yellow',
                    'green', 'blue', 'indigo', 'pink', 'peach'];

    

    const isSelected = (a, b) => a === b ? 'selected' : '';

    const update = () => html`
        <div class="center-full">
            <div class="topbar"></div>
            <div class="viewContainer" @mousemove=${handleDraw} @click=${handleDraw}>
                <canvas class="spriteView"></canvas>
                <div class="colorView" @mousemove=${handleColor} @click=${handleColor}>
                    ${ colors.map(color => html`<div class="color ${color} ${isSelected(color, state.activeColor)}" color="${color}"></div>`) }
                </div>
            </div>
            <canvas class="spriteContainer"></canvas>
            <div class="spriteContainer highlighter" @mousemove=${handleSprite} @click=${handleSprite}>
                ${ (new Array(64).fill(0).map( (_,i) => html`<div sprite="${i}" class="sprite ${isSelected(state.activeSprite, i)}"></div>`) )}
            </div>
            <div class="topbar"></div>
        </div>
    `

    // CANVAS



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
                render(update(), document.body);
            }
        }
    }

    const handleDraw = (e) => {
        if( e.buttons == 1 ){
            state.ctx.rect();
        }
    }

    render(update(), document.body);

    state.ctx = document.querySelector('canvas').getContext("2d");
    state.canvas = {
        width: document.querySelector('canvas').width,
        height: document.querySelector('canvas').height
    };

})();