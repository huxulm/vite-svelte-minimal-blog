import { mount } from 'svelte'
import '@fontsource-variable/manrope'
import '@fontsource-variable/source-serif-4'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
