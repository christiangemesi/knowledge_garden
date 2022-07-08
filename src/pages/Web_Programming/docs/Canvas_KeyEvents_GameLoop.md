**Canvas**:

```html
<canvas id="canvas"></canvas>
```

```javascript
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = colorString;
context.fillRect(posX, posY, width, height);
```

\
**KeyEvents**:

```javascript
const spaceBar = 32;
const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;
window.onkeydown = (evt) => {
    /* code with keys */
};
```

\
**GameLoop**:

```javascript
setInterval(() => {
    /* repeated code */
}, 1000 / 5);
```
