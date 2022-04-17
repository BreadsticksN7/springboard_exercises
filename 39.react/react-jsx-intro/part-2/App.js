const App = () => (
    <div>
      <Tweet 
        username="Samurai Pizza Cat"
        time={new Date().toDateString()}
        message="Roll out!"
      />
      <Tweet 
        username="Optimus Prime"
        time={new Date().toDateString()}
        message="Hey!  That's my line!"
      />
      <Tweet 
        username="Lost Maid"
        time={new Date().toDateString()}
        message="Where am I?"
      />
    </div>
  )
  
  ReactDOM.render(<App />, document.getElementById("root"))