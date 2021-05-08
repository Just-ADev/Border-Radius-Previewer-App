//--------------------
// MODEL
//--------------------
const state = {
  mode: "simple",
  edge: "topLeft",
  shape: {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
  },
};

const adjustBorderRadius = (dimension, value) => {
  if (state.shape[state.edge][dimension] >= 100 && value === 1) return;
  if (state.shape[state.edge][dimension] <= 0 && value === -1) return;

  if (state.mode === "simple") {
    state.shape[state.edge].x += value;
    state.shape[state.edge].y += value;
  } else {
    state.shape[state.edge][dimension] += value;
  }
};

const changeShapeEdge = (edge) => (state.edge = edge);
const changeApplicationMode = (mode) => (state.mode = mode);

const resetBorderRadius = () => {
  state.shape = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
  };
};

const drawRandomNumber = () => Math.floor(Math.random() * 101);

const drawRandomBorderRadius = () => {
  state.shape.topLeft.x = drawRandomNumber();
  state.shape.topLeft.y = drawRandomNumber();
  state.shape.topRight.x = drawRandomNumber();
  state.shape.topRight.y = drawRandomNumber();
  state.shape.bottomRight.x = drawRandomNumber();
  state.shape.bottomRight.y = drawRandomNumber();
  state.shape.bottomLeft.x = drawRandomNumber();
  state.shape.bottomLeft.y = drawRandomNumber();
};

//--------------------
// VIEW
//--------------------

const nodes = {
  shape: document.querySelector(".generator__shape"),
  controlButtons: document.querySelectorAll(".generator__button"),
  buttonUp: document.querySelector(".generator__button--up"),
  buttonDown: document.querySelector(".generator__button--down"),
  buttonRandom: document.querySelector(".generator__button--random"),
  buttonLeft: document.querySelector(".generator__button--left"),
  buttonRight: document.querySelector(".generator__button--right"),
  edges: document.querySelectorAll(".generator__edge"),
  codeOutput: document.querySelector(".panel__code"),
  applicationMode: document.querySelector(".panel__mode"),
  copyCode: document.querySelector(".panel__copy"),
};

const generateShapePreview = (shape) => {
  const { topLeft, topRight, bottomLeft, bottomRight } = shape;
  nodes.shape.style.borderRadius = `${topLeft.x}% ${topRight.x}% ${bottomRight.x}% ${bottomLeft.x}% / ${topLeft.y}% ${topRight.y}% ${bottomRight.y}% ${bottomLeft.y}%`;
  nodes.codeOutput.innerHTML = `${topLeft.x}% ${topRight.x}% ${bottomRight.x}% ${bottomLeft.x}% / ${topLeft.y}% ${topRight.y}% ${bottomRight.y}% ${bottomLeft.y}%`;
};

const activateShapeEdge = (edge) => {
  nodes.edges.forEach((edge) => edge.classList.remove("active"));
  edge.classList.add("active");
};

const activateControlButton = (button) => {
  nodes.controlButtons.forEach((button) => button.classList.remove("active"));
  nodes[button].classList.add("active");
};

const changeApplicationModeName = () => {
  if (nodes.applicationMode.innerText === "SIMPLE") {
    nodes.applicationMode.innerText = "ADVANCED";
  } else {
    nodes.applicationMode.innerText = "SIMPLE";
  }
};

const copyCodeToClipboard = () => {
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = `border-radius: ${nodes.codeOutput.innerText};`;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

//--------------------
// CONTROLLER
//--------------------

nodes.buttonUp.addEventListener("click", () => {
  adjustBorderRadius("x", 1);
  activateControlButton("buttonUp");
  generateShapePreview(state.shape);
});

nodes.buttonDown.addEventListener("click", () => {
  adjustBorderRadius("x", -1);
  activateControlButton("buttonDown");
  generateShapePreview(state.shape);
});

nodes.buttonRandom.addEventListener("click", () => {
  drawRandomBorderRadius();
  generateShapePreview(state.shape);
});

nodes.buttonLeft.addEventListener("click", () => {
  adjustBorderRadius("y", -1);
  activateControlButton("buttonLeft");
  generateShapePreview(state.shape);
});

nodes.buttonRight.addEventListener("click", () => {
  adjustBorderRadius("y", 1);
  activateControlButton("buttonRight");
  generateShapePreview(state.shape);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    adjustBorderRadius("x", 1);
  } else if (e.key === "ArrowDown") {
    adjustBorderRadius("x", -1);
  } else if (e.key === "ArrowLeft") {
    adjustBorderRadius("y", -1);
  } else if (e.key === "ArrowRight") {
    adjustBorderRadius("y", 1);
  }

  activateControlButton(e.key.replace("Arrow", "button"));
  generateShapePreview(state.shape);
});

nodes.edges.forEach((edge) =>
  edge.addEventListener("click", (e) => {
    changeShapeEdge(e.target.dataset.edge);
    activateShapeEdge(e.target);
  })
);

nodes.applicationMode.addEventListener("click", () => {
  changeApplicationModeName();
  changeApplicationMode(nodes.applicationMode.innerText.toLowerCase());
  resetBorderRadius();
  generateShapePreview(state.shape);
});

nodes.copyCode.addEventListener("click", () => {
  copyCodeToClipboard();
});
