# Minimal Pyodide testing code

This code can be used for experimentation and for prototyping DDP parsing development.
You can use this code to experiment with loading Pyodide packages: check `worker.js` 

It works as follows:

```mermaid
sequenceDiagram
    participant J as Javascript
    participant P as Pyodide
    Note left of J: FileReader API with readAsArrayBuffer()
    J->>P: Send files in an Array containing ArrayBuffers 
    Note right of P: ArrayBuffers to io.BytesIO()
    loop Process io.BytesIO objects
       P->>P: process io.BytesIO() accordingly
    end
    P->>J: Send data back in a tbd format
```

### Usage

All code is in `index.html` for convenience except the pyodide API and the worker.

Host with:

```
python3 -m http.server 8000 --bind localhost
```
