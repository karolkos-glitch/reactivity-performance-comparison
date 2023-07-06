import rainbowGradient from "rainbow-gradient";
import { createSignal, onMount, For } from "solid-js";

const rainbowColors = rainbowGradient(360).map(
  ([r, g, b]) => `rgb(${r},${g},${b})`
);

function App() {
  const [colors, setColors] = createSignal(
    new Array(360 * 4)
      .fill(0)
      .map((_, i) => rainbowColors[i % rainbowColors.length])
  );
  onMount(() => {
    const update = () => {
        setColors((colors) => {
          const newColors = [...colors];
          newColors.push(newColors.shift() as string);
          return newColors;
        });
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update)
  });
  const colorsValues = colors();
  const minWidth = `${100.0 / colorsValues.length}vw`;
  return (
    <div
      style="display: flex; flex-direction: row;"
    >
      {colors().map((color) => (
      <div style={`min-height: 100vh; min-width: ${minWidth}; background-color: ${color};`}></div>
        ))}
        {/* <For each={colors()}>
          {(color) =>  <div style={`min-height: 100vh; min-width: ${minWidth}; background-color: ${color};`}></div>}
        </For> */}
    </div>
  );
}


export default App;