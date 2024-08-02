import "./styles123.css";

function About() {
  return (
    <>
      <div className="dark:bg-black text-3xl text-center py-4">
      "There's a fine line between fishing and standing on the shore like an idiot. "~ Steven Wright
      </div>
    <div className="dark:bg-black center-content min-h-screen">
      <div className="wrapper">
        <div className="marquee-text rotate-left fadeout-horizontal">
          <div className="marquee-text-track">
            <p>JavaScript</p>
            <p>TypeScript</p>
            <p>CSS</p>
            <p>TailwindCSS</p>
            <p>Accessibility</p>
            <p>React</p>
            <p>Angular</p>
            <p aria-hidden="true">JavaScript</p>
            <p aria-hidden="true">TypeScript</p>
            <p aria-hidden="true">CSS</p>
            <p aria-hidden="true">TailwindCSS</p>
            <p aria-hidden="true">Accessibility</p>
            <p aria-hidden="true">React</p>
            <p aria-hidden="true">Angular</p>
          </div>
        </div>
        <div className="marquee-text rotate-right fadeout-horizontal">
          <div
            style={{
              "--direction": "reverse",
              "--speed": "25s" /* Adjusted speed */
            }}
            className="marquee-text-track"
            >
            <p>JavaScript</p>
            <p>TypeScript</p>
            <p>CSS</p>
            <p>TailwindCSS</p>
            <p>Accessibility</p>
            <p>React</p>
            <p>Angular</p>
            <p aria-hidden="true">JavaScript</p>
            <p aria-hidden="true">TypeScript</p>
            <p aria-hidden="true">CSS</p>
            <p aria-hidden="true">TailwindCSS</p>
            <p aria-hidden="true">Accessibility</p>
            <p aria-hidden="true">React</p>
            <p aria-hidden="true">Angular</p>
          </div>
        </div>
      </div>
    </div>
            </>
  );
}

export default About;
