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
        return `
			<!DOCTYPE html>
			<html lang="en" style="padding: 0; margin: 0; background-color: var(--dark-grey);">
				<head>
					<link href="${styleUri}" rel="stylesheet" />
				</head>
				<body style="margin: 0; padding: 0;"></body>
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
        // color already there? exit
        if (arrayGraphics[column][row] === change.color)
            return;
        // turn the array back into a string, replace the old graphics section with
        // the new one and save it to the virual doc.
        // TODO only replace the graphics section. not the whole doc.
        arrayGraphics[column][row] = change.color;
        graphicsAndRest = arrayGraphics.map(row => row.join('')).join(lineEnding);
        const replacement = text.substr(0, text.indexOf('__gfx__') + 8) + graphicsAndRest;
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), replacement);
        return vscode.workspace.applyEdit(edit);
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