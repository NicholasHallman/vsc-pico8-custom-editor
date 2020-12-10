import {html, render} from 'https://unpkg.com/lit-html?module';

(function() {

    const colors = ['black', 'darkblue', 'purple', 'darkgreen', 'brown',
                    'darkgrey', 'grey', 'white', 'red', 'orange', 'yellow',
                    'green', 'blue', 'indigo', 'pink', 'peach'];

    const state = {
        activeColor: 'black'
    }

    const isSelected = (color) => state.activeColor === color ? 'selected' : '';

    const update = () => html`
        <div class="topbar"></div>
        <div class="viewContainer">
            <div class="spriteView"></div>
            <div class="colorView" @click=${handleColor}>
                ${ colors.map(color => html`<div class="color ${color} ${isSelected(color)}" color="${color}"></div>`) }
            </div>
        </div>
        <div class="spriteContainer">
            ${ (new Array(64).fill(0).map( () => html`<div class="sprite"></div>`) )}
        </div>
        <div class="topbar"></div>
    `

    // EVENTS

    const handleColor = (e) => {
        console.log(e.target.getAttribute('color'));
        state.activeColor = e.target.getAttribute('color');
        render(update(), document.body);
    }

    render(update(), document.body);

})();