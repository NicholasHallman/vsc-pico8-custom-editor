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
        console.log('Constructor!');
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
        // const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
        // 	if (e.document.uri.toString() === document.uri.toString()) {
        // 		updateWebview();
        // 	}
        // });
        // // Make sure we get rid of the listener when our editor is closed.
        // webviewPanel.onDidDispose(() => {
        // 	changeDocumentSubscription.dispose();
        // });
        // // Receive message from the webview.
        // webviewPanel.webview.onDidReceiveMessage(e => {
        // 	console.log(e.type);
        // });
        updateWebview();
    }
    getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'base.js')));
        const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'style.css')));
        // console.log(scriptUri);
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
}
exports.Pico8SpriteEditor = Pico8SpriteEditor;
Pico8SpriteEditor.viewType = 'advanderar.customeditor8';
function activate(context) {
    // Register our custom editor providers
    context.subscriptions.push(Pico8SpriteEditor.register(context));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map