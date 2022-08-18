import { TCanvas } from '../home/TCanvas'

class App {
	constructor() {
		const parentNode = document.querySelector('body')!
		new TCanvas(parentNode)
	}
}

new App()
