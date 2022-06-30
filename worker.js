// webworker.js

// Example copied from Pyodide documentation


// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:
importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage(["pandas"]);
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  // make sure loading is done
  await pyodideReadyPromise;

  // Don't bother yet with this line, suppose our API is built in such a way:
  const { id, python, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);

    // Niek: Object conversion from python to javascript
    // In case results is easily converted it is done so.
    // If not memory, is allocated in the WASM heap, and a view into that memory is returned
    // That view can be converted to a javascript object
    //results = results.toJs({dict_converter : Object.fromEntries})
    self.postMessage({ results, id });

    // object needs to be destroyed
    // memory allocated on the wasm-heap will need to be destroyd
    // to prevent memory leaks
	results.destroy();
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};

