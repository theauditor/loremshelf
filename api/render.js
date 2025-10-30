import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Cache for serverless cold starts
let cachedTemplate = null
let cachedManifest = null
let cachedRender = null

async function loadAssets() {
  if (!cachedTemplate) {
    try {
      const cwd = process.cwd()
      console.log('[VERCEL] CWD:', cwd)
      console.log('[VERCEL] __dirname:', __dirname)
      
      // Try multiple possible locations
      const possibleClientPaths = [
        path.join(cwd, 'dist/client'),
        path.join(__dirname, '../dist/client'),
        path.join(cwd, '../dist/client')
      ]
      
      let clientPath = null
      for (const testPath of possibleClientPaths) {
        if (fs.existsSync(testPath)) {
          clientPath = testPath
          console.log('[VERCEL] Found client path:', clientPath)
          break
        }
      }
      
      if (!clientPath) {
        console.error('[VERCEL] Could not find dist/client directory')
        console.error('[VERCEL] Tried paths:', possibleClientPaths)
        throw new Error('dist/client directory not found')
      }
      
      cachedTemplate = fs.readFileSync(path.join(clientPath, 'index.html'), 'utf-8')
      cachedManifest = fs.readFileSync(path.join(clientPath, '.vite/ssr-manifest.json'), 'utf-8')
      
      // Try to find server entry
      const possibleServerPaths = [
        path.join(cwd, 'dist/server/entry-server.js'),
        path.join(__dirname, '../dist/server/entry-server.js'),
        path.join(cwd, '../dist/server/entry-server.js')
      ]
      
      let serverPath = null
      for (const testPath of possibleServerPaths) {
        if (fs.existsSync(testPath)) {
          serverPath = testPath
          console.log('[VERCEL] Found server path:', serverPath)
          break
        }
      }
      
      if (!serverPath) {
        console.error('[VERCEL] Could not find entry-server.js')
        console.error('[VERCEL] Tried paths:', possibleServerPaths)
        throw new Error('entry-server.js not found')
      }
      
      const serverModule = await import(pathToFileURL(serverPath).href)
      cachedRender = serverModule.render
      
      console.log('[VERCEL] Assets loaded successfully')
    } catch (error) {
      console.error('[VERCEL] Error loading assets:', error)
      throw error
    }
  }
  
  return { template: cachedTemplate, manifest: cachedManifest, render: cachedRender }
}

export default async function handler(req, res) {
  const startTime = Date.now()
  
  try {
    const { template, manifest, render } = await loadAssets()
    const url = req.url || '/'
    
    console.log(`[VERCEL SSR] Rendering: ${url}`)
    
    // Perform SSR with data fetching
    const rendered = await render(url, manifest)
    
    // Inject initial data
    const initialDataScript = rendered.initialData 
      ? `<script>window.__INITIAL_DATA__ = ${JSON.stringify(rendered.initialData).replace(/</g, '\\u003c')}</script>`
      : ''
    
    const html = template
      .replace(`<!--app-head-->`, `${rendered.head ?? ''}${initialDataScript}`)
      .replace(`<!--app-html-->`, rendered.html ?? '')
    
    const renderTime = Date.now() - startTime
    console.log(`[VERCEL SSR] Rendered ${url} in ${renderTime}ms`)
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    res.status(200).send(html)
  } catch (error) {
    console.error('[VERCEL SSR] Error:', error)
    
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>500 - Server Error</title>
          <style>
            body { font-family: system-ui; padding: 2rem; max-width: 800px; margin: 0 auto; }
            h1 { color: #dc2626; }
            pre { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>500 - Server Error</h1>
          <p>An error occurred while rendering this page.</p>
          <pre>${error.stack || error.message}</pre>
        </body>
      </html>
    `)
  }
}

