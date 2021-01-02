import { html, defineElement, useEffect, useState} from "https://unpkg.com/fuco?module";

import './SpritePage.js';

(function() {

    let vscode;
    try{
        vscode = acquireVsCodeApi();
    } catch {
        console.log('could not get vscode api')
    }
    
    defineElement('pico8-router', () => {

        let [pixelData, setPixelData] = useState(undefined)

        useEffect(() => {
            window.addEventListener('message', event => {

                console.log('Getting document data')
                const documentText = event.data.text;
        
                const CRLF = '\r\n';
                const LF = '\n';
                const lineEnding = documentText.indexOf('\r') !== -1 ? CRLF : LF;
                
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
                    console.log('no gfx found')
                    let tempData = new Array(64).fill(new Array(128).fill(0).join(''))
                    event.data.text += `${lineEnding}__gfx__${lineEnding}`;
                    tempData.forEach( row => event.data.text += row + lineEnding);
                    setPixelData(tempData);
                    // fill in the gfx section
                } else {
                    setPixelData(gfxLines);
                    console.log('gfx found', gfxLines);
                }
            });
        }, []);

        return html`
            <sprite-page .vs-code=${vscode} .pixel-data=${pixelData}></sprite-page>
        `
    });

})();