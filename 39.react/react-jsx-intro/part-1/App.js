const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent name="Samurai Pizza Cat"/>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))