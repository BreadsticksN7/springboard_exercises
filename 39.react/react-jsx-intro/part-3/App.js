const App = () => (
    <div>
      <Person
        username="Bob"
        age={21}
        hobbies={['Nothing', 'Pizza Eating', 'Judging others']}
      />
      <Person
        username="Erin"
        age={16}
        hobbies={['Reading', 'Cooking', 'Vehicular Homicide']}
      />
      <Person
        username="John"
        age={78}
        hobbies={['Sleeping', 'Sleeping', 'Napping']}
      />
    </div>
  )
  
  ReactDOM.render(<App />, document.getElementById("root"))