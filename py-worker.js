const pyodideWorker = new Worker("./worker.js");


// Example adapted from Pyodide website
const asyncRun = (() => {
    return (script, context) => {
        return new Promise((resolve) => {
                pyodideWorker.postMessage({
                ...context,
                python: script
            })

            pyodideWorker.onmessage = (event) => {
                const { ...data } = event.data
                resolve(data)
            }
        })
    }
})()


export { asyncRun };
