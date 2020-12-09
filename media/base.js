import {html, render} from 'https://unpkg.com/lit-html?module';

(function() {
    const container = `
        background-color: blue;
        width: 100vw;
        height: 100vh;
    `;

    const template = html`
    <div style="${container}">
        <h1>Hello World</h1>
    </div>
    `;

    render(template, document.body);

})();