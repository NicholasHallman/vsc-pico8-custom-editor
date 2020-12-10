// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

export class Pico8SpriteEditor implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new Pico8SpriteEditor(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(Pico8SpriteEditor.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'advanderar.customeditor8';

	constructor(
		private readonly context: vscode.ExtensionContext
	) { 
		console.log('Constructor!');
	}

	resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): void | Thenable<void> {
		
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

	getHtmlForWebview(webview: vscode.Webview) : string {

		const scriptUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'base.js')
		));

		const styleUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'style.css')
		));

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

export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(Pico8SpriteEditor.register(context));
}