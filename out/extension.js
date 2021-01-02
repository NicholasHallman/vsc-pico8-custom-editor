"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.Pico8SpriteEditor = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
class Pico8SpriteEditor {
    constructor(context) {
        this.context = context;
    }
    static register(context) {
        const provider = new Pico8SpriteEditor(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(Pico8SpriteEditor.viewType, provider);
        return providerRegistration;
    }
    resolveCustomTextEditor(document, webviewPanel, token) {
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText(),
            });
        }
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });
        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });
        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case 'start-sprite':
                    console.log('sending data');
                    webviewPanel.webview.postMessage({
                        type: 'update',
                        text: document.getText(),
                    });
                    break;
                case 'draw':
                    this.updateDocument(document, e);
                    break;
                default:
                    break;
            }
        });
        updateWebview();
    }
    getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'base.js')));
        const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'style.css')));
        const media = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media')));
        return `
			<!DOCTYPE html>
			<html lang="en" style="padding: 0; margin: 0; background-color: var(--dark-grey);">
				<head>
					<link href="${styleUri}" rel="stylesheet" />
				</head>
				<body style="margin: 0; padding: 0;">
					<pico8-router path=${media}></pico8-router>
				</body>
				<script type="module" src="${scriptUri}"></script>
			</html>
		`;
    }
    updateDocument(document, change) {
        let text = document.getText();
        // get the line ending to fix off by one errors
        const CRLF = '\r\n';
        const LF = '\n';
        const lineEnding = text.indexOf('\r') !== -1 ? CRLF : LF;
        const headerLength = 7 + lineEnding.length;
        // a p8 file may not have a graphics section yet, so we create it if it's not there.
        if (text.indexOf('__gfx__') === -1) {
            text += `${lineEnding}__gfx__${lineEnding}`;
            text += (new Array(64).fill(new Array(128).fill(0).join(''))).join(lineEnding);
        }
        let graphicsAndRest = text.substr(text.indexOf('__gfx__') + headerLength);
        const row = ((change.sprite % 16) * 8) + change.pos.x;
        const column = (Math.floor((change.sprite / 16)) * 8) + change.pos.y;
        // out of bounds? exit
        if (row < 0 || column < 0)
            return;
        const arrayGraphics = graphicsAndRest.split(lineEnding).map(row => row.split(''));
        const results = this.selectTool(arrayGraphics, change, { column, row });
        if (!results.changes)
            return;
        // turn the array back into a string, replace the old graphics section with
        // the new one and save it to the virual doc.
        // TODO only replace the graphics section. not the whole doc.
        graphicsAndRest = arrayGraphics.map(row => row.join('')).join(lineEnding);
        const replacement = text.substr(0, text.indexOf('__gfx__') + 8) + graphicsAndRest;
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), replacement);
        return vscode.workspace.applyEdit(edit);
    }
    selectTool(arrayGraphics, change, pos) {
        switch (change.tool) {
            case 'pencil':
                return this.pencil(arrayGraphics, change, pos);
            case 'bucket':
                return this.bucket(arrayGraphics, change, pos);
        }
        return { changes: false };
    }
    pencil(arrayGraphics, change, pos) {
        if (arrayGraphics[pos.column][pos.row] === change.color)
            return { changes: false, arrayGraphics };
        arrayGraphics[pos.column][pos.row] = change.color;
        return { changes: true, arrayGraphics };
    }
    bucket(arrayGraphics, change, pos) {
        console.log("Bucket");
        let colorToChange = arrayGraphics[pos.column][pos.row];
        if (colorToChange === change.color)
            return { changes: false };
        arrayGraphics = this.changeColorAndRecurse(arrayGraphics, change, pos, pos, colorToChange);
        return { changes: true, arrayGraphics };
    }
    changeColorAndRecurse(arrayGraphics, change, pos, origin, colorToChange) {
        // figure out the left and top boundary
        let firstRow = Math.floor(origin.row / 8) * 8;
        let firstColm = Math.floor(origin.column / 8) * 8;
        // make sure we don't go under them
        if (pos.row < firstRow || pos.column < firstColm)
            return arrayGraphics;
        // find the bottom and right boundary, but exclude the top and left boundary
        if (pos.row % 8 === 0 && pos.row !== firstRow)
            return arrayGraphics;
        if (pos.column % 8 === 0 && pos.column !== firstColm)
            return arrayGraphics;
        let currentColor = arrayGraphics[pos.column][pos.row];
        if (colorToChange !== currentColor)
            return arrayGraphics;
        arrayGraphics[pos.column][pos.row] = change.color;
        arrayGraphics = this.changeColorAndRecurse(arrayGraphics, change, { column: pos.column - 1, row: pos.row }, origin, colorToChange);
        arrayGraphics = this.changeColorAndRecurse(arrayGraphics, change, { column: pos.column + 1, row: pos.row }, origin, colorToChange);
        arrayGraphics = this.changeColorAndRecurse(arrayGraphics, change, { column: pos.column, row: pos.row - 1 }, origin, colorToChange);
        arrayGraphics = this.changeColorAndRecurse(arrayGraphics, change, { column: pos.column, row: pos.row + 1 }, origin, colorToChange);
        return arrayGraphics;
    }
}
exports.Pico8SpriteEditor = Pico8SpriteEditor;
Pico8SpriteEditor.viewType = 'advanderar.customeditor8';
function activate(context) {
    // Register our custom editor providers
    context.subscriptions.push(Pico8SpriteEditor.register(context));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map