import { TCanvas } from '../home/TCanvas'

class App {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parentNode = document.querySelector('body')!
    new TCanvas(parentNode)
  }
}

new App()
